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
            el-form-item(:label="renderData.secret", class="is-required")
              p.theme-color-C(v-text='item.secret' v-ellipsis-title="")
            el-form-item(:label="renderData.merchantId", class="is-required")
              p.theme-color-C(v-text='item.merchantId' v-ellipsis-title="")
            el-form-item(:label="renderData.returnUrl", class="is-required")
              p.theme-color-C(v-text='item.returnUrl.label' v-ellipsis-title="")
            el-form-item(:label="renderData.callbackUrl", class="is-required")
              p.theme-color-C(v-text='item.callbackUrl.label' v-ellipsis-title="")
            el-form-item(:label="renderData.productName", class="is-required")
              p.theme-color-C(v-text='item.productName.label' v-ellipsis-title="")
            el-form-item(:label="renderData.productDescription")
              p.theme-color-C(v-text='item.productDescription' v-ellipsis-title="")

      .box-footer
        b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click="deleteChannel(item)")
        b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click="editChannel(item)")
    .add-form
      b-button(@click="addChannel") {{renderData.addChannel}}

    el-dialog(:visible="formDialogModel", :title="renderData.netellerEdit" width="30%", :before-close="beforeClose")
      el-form(label-width="140px" label-position='left' ref="form", :model="formEdit")
        el-form-item(:label="renderData.channelName" prop="channelName.label", :rules="rules.channelNameRule")
          el-input(v-model="formEdit.channelName.label", :placeholder="renderData.pleaseEnter")

        el-form-item(:label="renderData.secret" prop="secret", :rules="rules.secretRule")
          el-input(v-model="formEdit.secret", :placeholder="renderData.pleaseEnter")

        el-form-item(:label="renderData.merchantId" prop="merchantId", :rules="rules.merchantIdRule")
          el-input(v-model="formEdit.merchantId", :placeholder="renderData.pleaseEnter")

        el-form-item(:label="renderData.returnUrl" prop="returnUrl.key", :rules="rules.returnUrlRule")
          el-select(v-model="formEdit.returnUrl.key", :placeholder="renderData.pleaseSelect")
            el-option(v-for="item in urlData", :key="item.key", :label="item.label", :value="item.key")

        el-form-item(:label="renderData.callbackUrl" prop="callbackUrl.key", :rules="rules.callbackUrlRule")
          el-row
            el-col(:span="22")
              el-select(v-model="formEdit.callbackUrl.key", :placeholder="renderData.pleaseSelect")
                el-option(v-for="item in urlData", :key="item.key", :label="item.label", :value="item.key")
            el-col(:span="2" style="margin-top: 10px;")
              el-tooltip(class="item" effect="dark", :content="renderData.callbackUrlInfo" placement="top")
                b-icon.theme-color-lightenC32.theme-color-A-hover.margin-left-10(iconName='info')

        el-form-item(:label="renderData.productName" prop="productName.label", :rules="rules.productNameRule")
          el-input(v-model="formEdit.productName.label", :placeholder="renderData.pleaseEnter")

        el-form-item(:label="renderData.productDescription" prop="productDescription", :rules="rules.productDescriptionRule")
          el-input(v-model="formEdit.productDescription", :placeholder="renderData.pleaseEnter")

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
  import componentService from './../blankNetellerService'

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
          channelName: {
            key: '',
            label: ''
          },
          merchantId: '',
          returnUrl: {
            key: '',
            label: ''
          },
          callbackUrl: {
            key: '',
            label: ''
          },
          secret: '',
          productName: {
            key: '',
            label: ''
          },
          productDescription: '',
          switch: 0
        },
        rules: {
          channelNameRule: [
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
          secretRule: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.noSpace,
              trigger: 'blur'
            }
          ],
          merchantIdRule: [
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
          returnUrlRule: [
            { required: true, message: renderData.pleaseSelect, trigger: 'change' }
          ],
          callbackUrlRule: [
            { required: true, message: renderData.pleaseSelect, trigger: 'change' }
          ],
          productNameRule: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.noSpace,
              trigger: 'blur'
            }
          ],
          productDescriptionRule: [
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.noSpace,
              trigger: 'blur'
            }
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
          channelName: {
            key: '',
            label: ''
          },
          merchantId: '',
          returnUrl: {
            key: '',
            label: ''
          },
          callbackUrl: {
            key: '',
            label: ''
          },
          secret: '',
          productName: {
            key: '',
            label: ''
          },
          productDescription: '',
          switch: 0
        }
        this.formDialogModel = true
      },
      editChannel (item) {
        this.itemData.cid = item.cid
        if (this.urlData === null) {
          this.getPageList()
        }
        this.formEdit = JSON.parse(JSON.stringify(item))
        this.formDialogModel = true
      },
      sureSubForm () {
        let vm = this
        vm.$refs['form'].validate((valid) => {
          if (valid) {
            var params = {
              cid: this.formEdit.cid,
              data: JSON.parse(JSON.stringify(this.formEdit))
            }
            delete params.data.cid
            delete params.data.switch
            for (let i = 0; i < vm.urlData.length; i++) {
              if (vm.urlData[i].key === params.data.returnUrl.key) {
                params.data.returnUrl.label = vm.urlData[i].label
              }
              if (vm.urlData[i].key === params.data.callbackUrl.key) {
                params.data.callbackUrl.label = vm.urlData[i].label
              }
            }
            componentService.editNetellerChannel(params).then(data => {
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
