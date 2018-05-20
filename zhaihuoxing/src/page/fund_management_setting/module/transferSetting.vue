<template lang="pug">
  #transfer-setting
    el-form.statusForm(ref="statusForm", :rules="statusForm.statusRules", :model="statusForm", label-width="140px", label-positon="left")
      el-form-item.theme-color-C.status
        template(slot="label")
          span.theme-color-C(v-text="renderData.transferStatusSetting", v-ellipsis-title="" style="vertical-align: middle;")
          el-tooltip(class="item" effect="dark", :content="renderData.transferStatusSettingInfo" placement="top")
            b-icon.theme-color-lightenC32.theme-color-A-hover.margin-left-10(iconName='info')
        b-button.deposit_setting_component_tag(v-for="(item, $idx) in statusForm.status", :key="$idx" size="small")
          | {{item.label}}
          b-icon.delete-icon(@click.native="deleteStatus(item, $idx)" v-if="!item.system" iconName='delete' size="12px")
        b-button.add-btn(@click="addStatusMod" v-if="!StatusModShow", size="small" type="primary") {{renderData.add}}
        el-form-item.new-status(v-if="StatusModShow", prop="newStatus")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="statusForm.newStatus")
          b-icon.theme-color-C.theme-color-G-hover(iconName='message_failure', @click.native="closeInput")
          b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addstatus")

    .transfer-form
      el-form(ref="form", :model="form", label-width="140px", label-position="left")
        el-form-item.default_comment(prop="data.order_prefix", :rules="depositRules.orderPrefix")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.orderPrefix")
          b-input.input(:placeholder="renderData.pleaseEnterOrderPrefix", :model.sync="form.data.order_prefix")

        el-form-item.default_comment(prop="data.comment.defaultFromComment.label", :rules="depositRules.defaultFromComment")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.defaultFromComment")
          b-input.input(:placeholder="renderData.pleaseEnterFromComment", :model.sync="form.data.comment.defaultFromComment.label")

        el-form-item.default_comment(prop="data.comment.defaultToComment.label", :rules="depositRules.defaultToComment")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.defaultToComment")
          b-input.input(:placeholder="renderData.pleaseEnterToComment", :model.sync="form.data.comment.defaultToComment.label")

        el-form-item
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.customField")
          .custom-item(v-for="(item2, idx) in form.data.customField", :key="item2.key")
            span.theme-color-C(v-ellipsis-title="") {{item2.label}}
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click.native="editCustom(idx)")
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click.native="deteleCustom(idx)")
          .custom-item
            b-button(@click="addCustomField") {{renderData.addCustomField}}
      .footer
        b-button(type="primary", @click="saveform") {{renderData.save}}

    component(:is="visible.dialog", :render-data="renderData", :visible="visible", :prop="copydata", :idx="parIndex", :idx1="idx", @sendData="sendData", @sendEditData="EditData")
</template>

<script>
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BIcon from 'components/BIcon'
  import AddCustom from './AddCustom.vue'
  import EditCustom from './EditCustom.vue'
  import service from '../service'
  import { constants, validator } from 'common/js/Utils'
  import ElForm from '../../../../node_modules/element-ui/packages/form/src/form.vue'

  export default {
    name: 'transfer-setting',
    data () {
      var transferSetting = window.renderData.components.fund_management_setting
      var renderData = Object.assign({}, transferSetting, transferSetting.fund_management_setting_transfer)
      return {
        renderData: renderData,
        visible: {
          dialog: null
        },
        newStatus: '',
        depositRules: {
          defaultFromComment: [
            {
              required: true,
              message: renderData.pleaseEnterFromComment,
              trigger: 'blur'
            },
            {
              regex: constants.length30Limit,
              message: renderData.textLength30And15,
              validator: validator.validate,
              trigger: 'blur'
            }
          ],
          defaultToComment: [
            {
              required: true,
              message: renderData.pleaseEnterToComment,
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
              message: renderData.noSpace,
              validator: validator.validate,
              trigger: 'blur'
            },
            {
              regex: constants.length14Limit,
              message: renderData.textLength14,
              validator: validator.validate,
              trigger: 'blur'
            }
          ]
        },
        StatusModShow: false,
        statusForm: {
          status: {},
          create_user_status: '',
          register_user_status: '',
          newStatus: '',
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
                message: renderData.noSpace,
                test (val) {
                  return val.trim() === val
                },
                validator: validator.validate,
                trigger: 'blur, change'
              }
            ]
          }
        },
        copydata: null,
        parIndex: 0,
        idx: 0,
        form: {
          data: {
            comment: {
              defaultFromComment: {
                key: '',
                label: ''
              },
              defaultToComment: {
                key: '',
                label: ''
              }
            },
            order_prefix: '',
            customField: []
          }
        }
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
            let params = {
              bid: '',
              self_uid: '',
              category: 3,
              data: {
                key: '',
                system: false,
                label: _this.statusForm.newStatus
              }
            }
            service.addStatus(params).then(({re, data}) => {
              _this.statusForm.newStatus = ''
              _this.closeInput()
              return service.getFundStatus({}).then(data => {
                this.statusForm.status = data.transferStatus
              })
            })
          }
        })
      },
      deleteStatus (item, idx) {
        let params = {
          category: 3,
          key: this.statusForm.status[idx].key
        }
        service.deleteStatus(params).then(({re}) => {
          return service.getFundStatus({}).then(data => {
            this.statusForm.status = data.transferStatus
          })
        })
      },
      getFundWithdrawalStatus () {
        this.statusForm.status = this.StatusData.transferStatus
      },
      closeInput () {
        this.statusForm.newStatus = ''
        this.StatusModShow = false
      },
      editCustom (idx) {
        this.idx = idx
        this.copydata = this.form
        this.visible.dialog = 'edit_custom'
      },
      deteleCustom (idx) {
        this.form.data.customField.splice(idx, 1)
      },
      getFundSetting () {
        this.form = this.Data.transfer[0]
      },
      sendData (somedata) {
        this.form.data.customField.push(somedata)
      },
      EditData (data, index) {
        this.form.data.customField[index] = data
      },
      saveform () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            return service.editTransferSetting(this.form)
          }
        })
      },
      addCustomField () {
        this.copydata = this.form
        this.visible.dialog = 'add_custom'
      }
    },
    mounted () {
      this.getFundWithdrawalStatus()
      this.getFundSetting()
    },
    watch: {
      newStatus () {
        this.$set(this.statusForm, 'newStatus', this.newStatus)
      }
    },
    components: {
      ElForm,
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
