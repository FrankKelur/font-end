<template lang="pug">
  b-dialog.bank-transfer-dialog.height-70(:show='true', :title="renderData.editBankChannel", width="30%", :show-close="true", :before-close="beforeClose")
    el-form(label-width="140px" label-position='left' ref="form", :rules="rules", :model="itemData.data")
      el-form-item(prop="channelName.label", :rules="rules.channelName")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.channelName", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.channelName.label", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="payeeBank", :rules="rules.payeeBank")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.payeeBank", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.payeeBank", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="payeeBankAddress", :rules="rules.payeeBankAddress")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.payeeBankAddress", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.payeeBankAddress", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="accountNo", :rules="rules.accountNo")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.accountNo", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.accountNo", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="payeeName", :rules="rules.payeeName")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.payeeName", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.payeeName", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="payeeAddress", :rules="rules.payeeAddress")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.payeeAddress", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.payeeAddress", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="swiftCode", :rules="rules.swiftCode")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.swiftCode", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.swiftCode", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="routeNo", :rules="rules.routeNo")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.routeNo", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.routeNo", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="referenceNo", :rules="rules.referenceNo")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.referenceNo", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.referenceNo", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="importantInfo", :rules="rules.importantInfo")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.importantInfo", v-ellipsis-title="")
        b-input(type="textarea", :placeholder="renderData.pleaseEnter", :model.sync="itemData.data.importantInfo")
    template(slot="footer")
      b-button(@click="cancelForm") {{renderData.cancel}}
      b-button(@click="submitForm" type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import utils from 'common/js/Utils'
  import service from './../service'

  export default {
    name: 'bank-transfer-dialog',
    data () {
      var vm = this
      return {
        rules: {
          channelName: [
            { required: true, message: vm.renderData.pleaseEnterChannelName, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          payeeBank: [
            { required: true, message: vm.renderData.pleaseEnterPayeeBank, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          payeeBankAddress: [
            { required: true, message: vm.renderData.pleaseEnterPayeeBankAddress, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          accountNo: [
            { required: true, message: vm.renderData.pleaseEnterAccountNo, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          payeeName: [
            { required: true, message: vm.renderData.pleaseEnterPayeeName, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          payeeAddress: [
            { required: true, message: vm.renderData.pleaseEnterPayeeAddress, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          swiftCode: [
            { required: true, message: vm.renderData.pleaseEnterSwiftCode, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          routeNo: [
            { required: true, message: vm.renderData.pleaseEnterRouteNo, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          referenceNo: [
            { required: true, message: vm.renderData.pleaseEnterReferenceNo, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          importantInfo: [
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      itemData: {
        type: Object,
        required: true
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      cancelForm () {
        this.visible.dialog = null
      },
      submitForm () {
        let vm = this
        vm.$refs['form'].validate((valid) => {
          if (valid) {
            service.editBankChannel(vm.itemData).then(data => {
              if (data.re === '200') {
                this.visible.dialog = null
                vm.$message({
                  message: this.renderData.saveSucceed,
                  type: 'success'
                })
                this.$emit('refreshList')
              } else {
                this.visible.dialog = null
                vm.$message({
                  message: this.renderData.netErrorSaveFail,
                  type: 'error'
                })
                this.$emit('refreshList')
              }
            })
          } else {
            return false
          }
        })
      }
    },
    mounted () {
      this.getAllCurrency()
    },
    components: {
      BDialog,
      BInput,
      BButton,
      BSelect
    }
  }
</script>

<style lang="less">
  .bank-transfer-dialog{
    .el-dialog .el-dialog__body {
      max-height: 50%!important;
      overflow-y: auto!important;
    }
    .el-form-item:last-child{
      margin-bottom: 0 !important;
    }
  }
</style>
