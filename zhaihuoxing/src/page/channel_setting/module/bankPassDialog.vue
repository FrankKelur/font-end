<template lang="pug">
  b-dialog.bank-pass-dialog(:show='true', :title="renderData.editBankChannel", :show-close="true", :before-close="beforeClose")
    el-form(label-width="140px" label-position='left' ref="form", :rules="rules", :model="itemData.data")
      el-form-item(prop="channelName.label", :rules="rules.channelName")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.channelName", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.channelName.label", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="unionType", :rules="rules.unionPayType")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.unionPayType", v-ellipsis-title="")
        b-select(:model.sync="itemData.data.unionType", :placeholder="renderData.pleaseSelect")
          el-option(v-for="(item, idx) in typeList", :key="idx", :label="item.label", :value="item.key")
      div(v-if="itemData.data.unionType==='Dinpay'||itemData.data.unionType==='paymentAsia'")
        el-form-item(prop="merchantId", :rules="rules.merchantId")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.merchantId", v-ellipsis-title="")
          b-input(:model.sync="itemData.data.merchantId", :placeholder="renderData.pleaseEnter")
        el-form-item(prop="successReturn.key", :rules="rules.successReturn")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.successReturn", v-ellipsis-title="")
          b-select(:model.sync="itemData.data.successReturn.key", :placeholder="renderData.pleaseSelect")
            el-option(v-for="(item, idx1) in pageList", :key="idx1", :label="item.label", :value="item.key")
        el-form-item(prop="failureReturn.key", :rules="rules.failureReturn")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.failureReturn", v-ellipsis-title="")
          b-select(:model.sync="itemData.data.failureReturn.key", :placeholder="renderData.pleaseSelect")
            el-option(v-for="(item, idx2) in pageList ", :key="idx2", :label="item.label", :value="item.key")
        el-form-item(prop="securityCode", :rules="rules.securityCode")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.securityCode", v-ellipsis-title="")
          b-input(:model.sync="itemData.data.securityCode", :placeholder="renderData.pleaseEnter")
        el-form-item(prop="productName.label", :rules="rules.productName")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.productName")
          b-input(:model.sync="itemData.data.productName.label", :placeholder="renderData.pleaseEnter")
        el-form-item(prop="usedBank", :rules="rules.usedBank")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.usedBank", v-ellipsis-title="")
          b-select(:model.sync="itemData.data.usedBank", :placeholder="renderData.pleaseSelect" multiple :valueKey="valueKey")
            el-option(v-for="(itembank, idx3) in bankList ", :key="idx3", :label="itembank.label", :value="itembank")

    template(slot="footer")
      b-button(@click="cancelForm") {{renderData.cancel}}
      b-button(@click="submitForm" type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import BIcon from 'components/BIcon'
  import utils from 'common/js/Utils'
  import service from './../service'

  export default {
    name: 'bank-pass-dialog',
    data () {
      var vm = this
      return {
        typeList: [],
        pageList: [],
        bankList: [],
        valueKey: 'key',
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
            },
            {
              regex: utils.constants.length32Limit,
              message: vm.renderData.textLength32,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          unionPayType: [
            { required: true, message: vm.renderData.pleaseSelectUnionPayType, trigger: 'change' }
          ],
          successReturn: [
            { required: true, message: vm.renderData.pleaseSelectSuccessReturn, trigger: 'change' }
          ],
          failureReturn: [
            { required: true, message: vm.renderData.pleaseSelectFailureReturn, trigger: 'change' }
          ],
          merchantId: [
            { required: true, message: vm.renderData.pleaseEnterMerchantId, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            },
            {
              message: vm.renderData.errorNameExist,
              validator: utils.validator.validate,
              test: function (value) {
                var params = {
                  status: 1,
                  cid: vm.itemData.cid,
                  value: value
                }
                console.log(params)
                return service.checkUnique(params)
              },
              trigger: 'blur'
            }
          ],
          securityCode: [
            { required: true, message: vm.renderData.pleaseEnterSecurityCode, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          productName: [
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          usedBank: [
            { required: true, message: vm.renderData.pleaseSelect, trigger: 'change' }
          ]
        }
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      useingbank: {
        type: Array,
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
        for (var i = 0; i < vm.pageList.length; i++) {
          if (vm.pageList[i].key === vm.itemData.data.successReturn.key) {
            vm.itemData.data.successReturn.label = vm.pageList[i].label
          }
          if (vm.pageList[i].key === vm.itemData.data.failureReturn.key) {
            vm.itemData.data.failureReturn.label = vm.pageList[i].label
          }
        }
        vm.$refs['form'].validate((valid) => {
          if (valid) {
            if (vm.itemData.cid === '') {
              service.addbankChannel(vm.itemData).then(data => {
                if (data.re === '200') {
                  vm.visible.dialog = null
                  vm.$message({
                    message: vm.renderData.saveSucceed,
                    type: 'success'
                  })
                  vm.$emit('refreshList')
                } else {
                  vm.visible.dialog = null
                  vm.$message({
                    message: vm.renderData.netErrorSaveFail,
                    type: 'error'
                  })
                  vm.$emit('refreshList')
                }
              })
            } else {
              service.editbankChannel(vm.itemData).then(data => {
                if (data.re === '200') {
                  vm.$emit('refreshList')
                  vm.visible.dialog = null
                  vm.$message({
                    message: vm.renderData.saveSucceed,
                    type: 'success'
                  })
                } else {
                  vm.visible.dialog = null
                  vm.$message({
                    message: vm.renderData.netErrorSaveFail,
                    type: 'error'
                  })
                  vm.$emit('refreshList')
                }
              })
            }
          } else {
            return false
          }
        })
      },
      getPageList () {
        return service.getPageList({}).then(({data}) => {
          this.pageList = data
        })
      },
      getBankmanageList () {
        let vm = this
        return service.getBankmanageList({}).then(data => {
          vm.bankList = data
          vm.bankList = vm.bankList.filter(item => !vm.useingbank.includes(item.key))
        })
      },
      getUnionPayTypeSelect () {
        let vm = this
        service.getUnionPayTypeSelect({}).then(data => {
          vm.typeList = data
        })
      }
    },
    mounted () {
      this.getPageList()
      this.getBankmanageList()
      this.getUnionPayTypeSelect()
      this.getAllCurrency()
    },
    components: {
      BIcon,
      BDialog,
      BInput,
      BButton,
      BSelect
    }
  }
</script>

<style lang="less">
  .bank-pass-dialog{
    .el-dialog .el-dialog__body {
      max-height: 50%!important;
      overflow-y: auto!important;
    }
    .el-form{
      margin-top: 25px;
    }
    .el-form-item:last-child{
      margin-bottom: 0 !important;
    }
    .el-select__tags-text{
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 90%;
      display: inline-block;
    }
    .el-select .el-tag__close.el-icon-close{
      top: -6px!important;
    }
    .el-select .el-tag{
      max-width: 50%!important;
    }
    .tooltip-icon{
      display: inline-block;
      margin-left: 3px!important;
    }
  }
</style>
