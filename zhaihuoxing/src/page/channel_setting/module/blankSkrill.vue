<template lang="pug">
  .com-warp
    .box-warp.theme-bg-H.theme-box-shadow-D(v-for="(item, index) in data", :key="index")
      .box-header.theme-border-bottom-lightenD12
        span.theme-color-C(v-text='item.channelName.label' v-ellipsis-title="")
        .switch
          b-switch(:width="45", @change="changeSwitch(item)", :model="item.switch==0 ? false : true")
          span.theme-color-C(v-if="item.switch===1") {{renderData.able}}
          span.theme-color-C(v-if="item.switch===0") {{renderData.disable}}
      .box-content
        el-form(label-width="140px" label-position='left')
          .form-detail
            el-form-item(:label="renderData.payeeEmail", class="is-required")
              p.theme-color-C(v-text='item.payeeEmail' v-ellipsis-title="")
            el-form-item(:label="renderData.merchantId", class="is-required")
              p.theme-color-C(v-text='item.merchantId' v-ellipsis-title="")
            el-form-item(:label="renderData.returnUrl", class="is-required")
              p.theme-color-C(v-text='item.returnUrl.label' v-ellipsis-title="")
            el-form-item(:label="renderData.cancelReturn", class="is-required")
              p.theme-color-C(v-text='item.cancelReturn.label' v-ellipsis-title="")

      .box-footer
        b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click="deleteChannel(item)")
        b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click="editChannel(item)")
    .add-form
      b-button(@click="addChannel") {{renderData.addChannel}}

    el-dialog(:visible="formDialogModel", :title="renderData.skrillEdit" width="30%", :before-close="beforeClose")
      el-form(label-width="140px" label-position='left' ref="form", :model="formEdit", :rules="rules")
        el-form-item(:label="renderData.channelName" prop="channelName")
          el-input(v-model="formEdit.channelName", :placeholder="renderData.pleaseEnter")

        el-form-item(:label="renderData.payeeEmail" prop="payeeEmail")
          el-input(v-model="formEdit.payeeEmail", :placeholder="renderData.pleaseEnter")

        el-form-item(:label="renderData.merchantId" prop="merchantId")
          el-input(v-model="formEdit.merchantId", :placeholder="renderData.pleaseEnter")

        el-form-item(:label="renderData.returnUrl" prop="returnUrl")
          el-select(v-model="formEdit.returnUrl", :placeholder="renderData.pleaseSelect")
            el-option(v-for="item in urlData", :key="item.key", :label="item.label", :value="item.key")

        el-form-item(:label="renderData.cancelReturn" prop="cancelReturn")
          el-select(v-model="formEdit.cancelReturn", :placeholder="renderData.pleaseSelect")
            el-option(v-for="item in urlData", :key="item.key", :label="item.label", :value="item.key")

      div(slot="footer" class="dialog-footer")
        b-button(@click="cancelSubForm") {{renderData.cancel}}
        b-button(type="primary", @click="sureSubForm") {{renderData.confirm}}

</template>

<script>
  import BSwitch from 'components/BSwitch'
  import BSelect from 'components/BSelect'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import utils from 'common/js/Utils'
  import service from './../service'
  import componentService from './../blankSkrillService'

  export default {
    data () {
      var renderData = window.renderData.components.channel_setting.channel_setting_bank
      var vm = this
      return {
        renderData: renderData,
        formDialogModel: false,
        urlData: null,
        itemData: {
          cid: ''
        },
        formEdit: {
          cid: '',
          channelName: '',
          payeeEmail: '',
          merchantId: '',
          returnUrl: '',
          cancelReturn: ''
        },
        rules: {
          channelName: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.noSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.length32Limit,
              message: renderData.textLength32,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          payeeEmail: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              regex: utils.constants.emailReg,
              message: renderData.payeeEmailFormatError,
              trigger: 'blur'
            }
          ],
          merchantId: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.noSpace,
              trigger: 'blur'
            },
            {
              message: renderData.errorNameExist,
              validator: utils.validator.validate,
              test: function (value) {
                var params = {
                  status: 1,
                  cid: vm.itemData.cid,
                  value: value
                }
                return service.checkUnique(params)
              },
              trigger: 'blur'
            }
          ],
          returnUrl: [
            { required: true, message: renderData.pleaseSelect, trigger: 'change' }
          ],
          cancelReturn: [
            { required: true, message: renderData.pleaseSelect, trigger: 'change' }
          ]
        }
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    methods: {
      changeSwitch (item) {
        let params = {
          cid: item.cid,
          status: ''
        }
        if (item.switch === 0) {
          params.status = 'able'
        } else {
          params.status = 'disable'
        }
        service.switchControl(params).then(data => {
          this.$emit('refreshList')
        })
      },
      deleteChannel (item) {
        let vm = this
        vm.$confirm(vm.renderData.deleteChannelText, vm.renderData.deleteChannel, {
          confirmButtonText: vm.renderData.confirm,
          cancleButtonText: vm.renderData.cancel,
          type: 'warning'
        }).then(() => {
          var params = {
            cid: item.cid
          }
          service.deletebankChannel(params).then(data => {
            if (data.re === '200') {
              vm.$emit('refreshList')
              vm.$message({
                type: 'success',
                message: vm.renderData.deleteSucceed
              })
            }
          })
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: vm.renderData.cancelTool
          })
        })
      },
      addChannel () {
        if (this.urlData === null) {
          this.getPageList()
        }
        this.formEdit = {
          cid: '',
          channelName: '',
          payeeEmail: '',
          merchantId: '',
          returnUrl: '',
          cancelReturn: ''
        }
        this.formDialogModel = true
      },
      editChannel (item) {
        this.itemData.cid = item.cid
        if (this.urlData === null) {
          this.getPageList()
        }
        this.formEdit = {
          cid: item.cid,
          channelName: item.channelName.label,
          payeeEmail: item.payeeEmail,
          merchantId: item.merchantId,
          returnUrl: item.returnUrl.key,
          cancelReturn: item.cancelReturn.key
        }
        this.formDialogModel = true
      },
      sureSubForm () {
        let vm = this
        vm.$refs['form'].validate((valid) => {
          if (valid) {
            var params = {
              cid: this.formEdit.cid,
              data: {
                channelName: {
                  key: '',
                  label: this.formEdit.channelName
                },
                merchantId: this.formEdit.merchantId,
                returnUrl: {
                  key: this.formEdit.returnUrl,
                  label: ''
                },
                cancelReturn: {
                  key: this.formEdit.cancelReturn,
                  label: ''
                },
                payeeEmail: this.formEdit.payeeEmail
              }
            }
            for (let i = 0; i < vm.urlData.length; i++) {
              if (vm.urlData[i].key === params.data.returnUrl.key) {
                params.data.returnUrl.label = vm.urlData[i].label
              }
              if (vm.urlData[i].key === params.data.cancelReturn.key) {
                params.data.cancelReturn.label = vm.urlData[i].label
              }
            }
            componentService.editSkrillChannel(params).then(data => {
              if (data.re === '200') {
                vm.$emit('refreshList')
                vm.formDialogModel = false
                vm.$message({
                  type: 'success',
                  message: vm.renderData.saveSucceed
                })
              } else {
                vm.formDialogModel = false
                vm.$message({
                  type: 'error',
                  message: vm.renderData.netErrorSaveFail
                })
              }
            })
          }
        })
      },
      cancelSubForm () {
        this.formDialogModel = false
        this.$refs['form'].clearValidate()
      },
      beforeClose (done) {
        this.formDialogModel = false
        this.$refs['form'].clearValidate()
        done()
      },
      getPageList () {
        return service.getPageList({}).then(data => {
          this.urlData = data.data
        })
      }
    },
    mounted () {
    },
    components: {
      BSwitch,
      BSelect,
      BButton,
      BIcon
    }
  }
</script>

<style lang="less">
</style>
