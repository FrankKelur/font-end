<template lang="pug">
  #deposit-setting
    el-form.statusForm(ref="statusForm", :model="statusForm", label-width="140px", label-position="left")
      el-form-item.theme-color-C.status
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.depositStatusSetting", v-ellipsis-title="")
        b-button.deposit_setting_component_tag(v-for="(item, $idx) in statusForm.status", :key="$idx" size="small")
          | {{item.label}}
          b-icon.delete-icon(@click.native="deleteStatus(item, $idx)" v-if="!item.system" iconName='delete' size="12px")
        b-button.add-btn(@click="addStatusMod" v-if="!StatusModShow", size="small" type="primary") {{renderData.add}}
        el-form-item.new-status(v-if="StatusModShow", prop="newStatus", :rules="statusRules.newStatus")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="statusForm.newStatus")
          b-icon.theme-color-C.theme-color-G-hover(iconName='message_failure', @click.native="closeInput")
          b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addstatus")
    el-collapse.settingForm(v-model="activeName")
      el-collapse-item.theme-color-C(v-for="(item, parIndex) in dataList", :key="parIndex", :title="renderData[item.name]", :name="item.name")
        el-form(:ref="item.name", :model="item", label-width="140px", label-position="left")
          el-form-item.default_comment(prop="data.order_prefix", :rules="depositRules.orderPrefix")
            template(slot="label")
              span.theme-color-C(v-text="renderData.orderPrefix")
            b-input.input(:placeholder="renderData.pleaseEnterOrderPrefix", :model.sync="item.data.order_prefix")
          el-form-item.default_comment(prop="data.comment.defaultComment.label", :rules="depositRules.defaultComment")
            template(slot="label")
              span.theme-color-C(v-text="renderData.defaultComment")
            b-input.input(:placeholder="renderData.pleaseEnter", :model.sync="item.data.comment.defaultComment.label")
          el-form-item(v-if="item.data.comment.otherComment", prop="otherComment")
            template(slot="label")
              span.theme-color-C.other-item-label(v-text="renderData.otherComment")
            .other-item(v-for="(item1, idx) in item.data.comment.otherComment", :key="item1.key")
              el-form(ref="otherform", :model="item1")
                el-form-item(prop="label", :rules="depositRules.otherComment")
                  b-input.other-input(:placeholder="renderData.pleaseEnter", :model.sync="item1.label")
                  b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active.delete(iconName="delete1", @click.native="deleteother(item,idx)")
            .other-item
              b-button(@click="addComment(item)") {{renderData.addComment}}
          el-form-item(prop="customField")
            template(slot="label")
              span.theme-color-C.inline-label(v-text="renderData.customField")
            .custom-item(v-for="(item2, idx) in item.data.customField", :key="item2.key")
              span.theme-color-C(v-ellipsis-title="") {{item2.label}}
              b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click.native="editCustom(item,idx,parIndex)")
              b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click.native="deteletCustom(item,idx)")
            .custom-item(:class="{'has-custom':item.data.customField.length}")
              b-button(@click="addCustomField(item,parIndex)") {{renderData.addCustomField}}
        .footer
          b-button(type="primary", @click="saveform(item,parIndex)") {{renderData.save}}
    component(:is="visible.dialog", :render-data="renderData", :visible="visible", :prop="copydata", :idx="parIndex", :idx1="idx", @sendData="sendData", @sendEditData="EditData")
</template>

<script>
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BIcon from 'components/BIcon'
  import AddCustom from '../module/AddCustom.vue'
  import EditCustom from '../module/EditCustom.vue'
  import service from '../service'
  import { constants, validator } from 'common/js/Utils'

  export default {
    name: 'deposit-setting',
    data () {
      var fundSetting = window.renderData.components.fund_management_setting
      var renderData = Object.assign({}, fundSetting, fundSetting.fund_management_setting_deposit)
      return {
        renderData: renderData,
        activeName: [],
        visible: {
          dialog: null
        },
        newStatus: '',
        depositRules: {
          defaultComment: [
            {
              required: true,
              message: renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              regex: constants.length30Limit,
              message: renderData.textLength30And15,
              validator: validator.validate,
              trigger: 'blur'
            }
          ],
          orderPrefix: [
            {
              required: true,
              message: renderData.pleaseEnterOrderPrefix,
              trigger: 'blur'
            },
            {
              test (val) {
                return val.trim() === val
              },
              message: renderData.qianhouNoSpace,
              validator: validator.validate,
              trigger: 'blur'
            },
            {
              regex: constants.length14Limit,
              message: renderData.textLength14,
              validator: validator.validate,
              trigger: 'blur'
            }
          ],
          otherComment: [
            {
              regex: constants.length30Limit,
              message: renderData.textLength30And15,
              validator: validator.validate,
              trigger: 'blur'
            }
          ]
        },
        dataList: [],
        StatusModShow: false,
        statusForm: {
          status: {},
          create_user_status: '',
          register_user_status: '',
          newStatus: ''
        },
        statusRules: {
          newStatus: [
            {
              required: true,
              message: renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              regex: constants.length30Limit,
              message: renderData.textLength30,
              validator: validator.validate,
              trigger: 'blur'
            },
            {
              message: renderData.qianhouNoSpace,
              test (val) {
                return val.trim() === val
              },
              validator: validator.validate,
              trigger: 'blur, change'
            }
          ]
        },
        copydata: null,
        parIndex: 0,
        idx: 0
      }
    },
    props: {
      Data: {
        type: Object,
        required: true
      },
      StatusData: {
        type: Object,
        required: true
      }
    },
    methods: {
      addStatusMod () {
        this.StatusModShow = true
      },
      addstatus () {
        let _this = this
        this.$refs['statusForm'].validateField('newStatus', (error) => {
          if (!error) {
            var params = {
              bid: '',
              self_uid: '',
              category: 1,
              data: {
                key: '',
                system: false,
                label: _this.statusForm.newStatus
              }
            }
            service.addStatus(params).then(({re, data}) => {
              _this.statusForm.newStatus = ''
              _this.closeInput()
              let params = {}
              return service.getFundStatus(params).then(data => {
                this.statusForm.status = data.depositStatus
              })
            })
          }
        })
      },
      deleteStatus (item, idx) {
        var params = {
          category: 1,
          key: this.statusForm.status[idx].key
        }
        service.deleteStatus(params).then(({re}) => {
          let params = {}
          return service.getFundStatus(params).then(data => {
            this.statusForm.status = data.depositStatus
          })
        })
      },
      getFundStatus () {
        this.statusForm.status = this.StatusData.depositStatus
      },
      closeInput () {
        this.statusForm.newStatus = ''
        this.StatusModShow = false
      },
      addComment (item) {
        item.data.comment.otherComment.push(
          {
            label: ''
          }
        )
      },
      editCustom (item, idx, parIndex) {
        this.idx = idx
        this.copydata = item
        this.parIndex = parIndex
        this.visible.dialog = 'edit_custom'
      },
      deleteother (item, idx) {
        item.data.comment.otherComment.splice(idx, 1)
      },
      deteletCustom (item, idx) {
        item.data.customField.splice(idx, 1)
      },
      getFundSetting () {
        this.dataList = this.Data.deposit
        this.activeName.push(this.Data.deposit[0].name)
      },
      sendData (somedata, idx) {
        this.dataList[idx].data.customField.push(somedata)
      },
      EditData (data, idx, index) {
        this.dataList[idx].data.customField[index] = data
      },
      saveform (item) {
        this.$refs[item.name][0].validate(valid => {
          if (valid) {
            var params = item
            return service.saveform(params)
          }
        })
      },
      async addCustomField (item, parIndex) {
        this.copydata = item
        this.parIndex = parIndex
        this.visible.dialog = 'add_custom'
      }
    },
    async mounted () {
      await this.getFundStatus()
      await this.getFundSetting()
    },
    watch: {
      newStatus () {
        this.$set(this.statusForm, 'newStatus', this.newStatus)
      }
    },
    components: {
      BButton,
      BInput,
      BIcon,
      'add_custom': AddCustom,
      'edit_custom': EditCustom
    }
  }
</script>

<style lang="less">
</style>
