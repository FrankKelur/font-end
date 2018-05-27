<template lang="pug">
  .account_type_setting.theme-border-lightenD12.component#account_type_setting
    .kongdiv1
      b-title.amt-more-left-in(:title="renderData.accountTypeSetting")
        template(slot="icon")
          el-tooltip(class="item" effect="dark", :content="renderData.accountTypeSettingInfo" placement="top")
            b-icon.theme-color-A-hover.theme-color-lightenD10.margin-left-10(iconName='info')

    .content(v-if="comAuth.account_type_setting_default")
      .left
        .option-box(v-for="(item, parIndex) in searchData")
          .title {{item.channel_name}}
          .list.theme-bg-lightenD18-hover(v-for="(child, childIndex) in item.account_type" v-bind:class="{'theme-bg-I':activeKey===child.type_name.key}", @click="selectData(parIndex, childIndex, item, child)")
            span.width-100(v-ellipsis-title="") {{child.type_name.label}}
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active.delete1-icon(iconName="delete1", @click="deleteAccountType(item, child, parIndex, childIndex)")
          .list.width-100(v-if="item.addInput" v-bind:class="{'theme-bg-I':item.addInput}" v-ellipsis-title="" v-text="form.accountTypeName")
          .list(v-if="!item.addInput")
            b-button(type="primary", @click="addAccountType(item, parIndex)") {{renderData.newAccountType}}
      .right.theme-bg-I
        p.theme-color-lightenC32(style="position: absolute; width: 100%; margin-top: 58px; font-size: 14px; text-align: center;" v-if="thisLeverage.length === 0 || thisCurrency.length === 0") {{renderData.pleaseSetAccountFirst}}
        .body
          el-form(label-width="140px" label-position="left" ref="form", :model="form", :rules="rules" v-show="thisLeverage.length !== 0 && thisCurrency.length !== 0")
            el-form-item(prop="accountTypeName")
              template(slot="label")
                span.theme-color-C.inline-label(v-text="renderData.typeName", v-ellipsis-title="")
              b-input(:model.sync="form.accountTypeName", :placeholder="renderData.pleaseEnter")

            el-form-item(prop="thisLeverageVal" v-bind:class="{'form-err-less-top': thisLeverage.length<=3}")
              template(slot="label")
                span.theme-color-C.inline-label(v-text="renderData.leverage", v-ellipsis-title="")
              el-checkbox-group(v-model="form.thisLeverageVal")
                .checkbox-box(v-for="(leverage, index) in thisLeverage", :key="index")
                  b-checkbox.theme-color-darkenC15(:label="leverage")

            el-form-item(prop="thisCurrencyVal" v-bind:class="{'form-err-less-top': thisCurrency.length<=3}")
              template(slot="label")
                span.theme-color-C.inline-label(v-text="renderData.currency", v-ellipsis-title="")
              el-checkbox-group(v-model="form.thisCurrencyVal")
                .checkbox-box(v-for="(currency, index) in thisCurrency", :key="index")
                  b-checkbox.theme-color-darkenC15(:label="currency")

        .footer.theme-bg-I(v-show="thisLeverage.length !== 0 && thisCurrency.length !== 0")
          //b-button(type="primary", @click="saveAccountType", :disabled="form.thisLeverageVal.length === 0 || form.thisCurrencyVal.length === 0 || form.accountTypeName === ''") {{renderData.save}}
          b-button(type="primary", @click="saveAccountType") {{renderData.save}}
</template>

<script>
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BCheckbox from 'components/BCheckbox'
  import BInput from 'components/BInput'
  import BIcon from 'components/BIcon'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import utils from 'common/js/Utils'

  export default {
    name: 'account_type_setting',
    mixins: [componentMixin],
    data () {
      var comAuth = window.renderData.components.account_type_setting
      var renderData = Object.assign({}, comAuth.account_type_setting_auth, comAuth.account_type_setting_default)
      return {
        comAuth: comAuth,
        renderData: renderData,
        searchData: [],
        thisLeverage: [],
        thisCurrency: [],
        form: {
          accountTypeName: '',
          thisLeverageVal: [],
          thisCurrencyVal: [],
          uuid: '',
          aid: '',
          optType: ''
        },
        rules: {
          accountTypeName: [
            {
              required: true,
              message: renderData.pleaseEnterTypeName,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.noSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.length30Limit,
              message: renderData.textLength30,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          thisLeverageVal: [
            { type: 'array', required: true, message: renderData.pleaseSelectLeverage, trigger: 'change' }
          ],
          thisCurrencyVal: [
            { type: 'array', required: true, message: renderData.pleaseSelectCurrency, trigger: 'change' }
          ]
        },
        activeKey: '',
        parIndex: 0,
        childIndex: 0
      }
    },
    methods: {
      saveAccountType () {
        let vm = this
        if (vm.thisLeverage.length === 0 || vm.thisCurrency.length === 0) {
          vm.$message({
            type: 'info',
            message: vm.renderData.pleaseSetAccountFirst
          })
          return
        }
        vm.$refs['form'].validate(valid => {
          if (valid) {
            if (vm.form.optType === 'add') {
              let params = {
                'uuid': vm.form.uuid,
                'tran_type': 18,
                'data': {
                  'type_name': {
                    'key': 'accountType' + new Date().getTime(),
                    'label': vm.form.accountTypeName
                  },
                  'leverage': vm.form.thisLeverageVal,
                  'currency': vm.form.thisCurrencyVal
                }
              }
              service.addAccountType(params).then(data => {
                if (data.re === '200') {
                  vm.initData(vm.parIndex, vm.childIndex)
                  vm.$message({
                    type: 'success',
                    message: vm.renderData.saveSucceed
                  })
                }
              })
            }
            if (vm.form.optType === 'edit') {
              let params = {
                'aid': vm.form.aid,
                'uuid': vm.form.uuid,
                'tran_type': 18,
                'data': {
                  'type_name': {
                    'key': 'accountType' + new Date().getTime(),
                    'label': vm.form.accountTypeName
                  },
                  'leverage': vm.form.thisLeverageVal,
                  'currency': vm.form.thisCurrencyVal
                }
              }
              service.editAccountType(params).then(data => {
                if (data.re === '200') {
                  vm.initData(vm.parIndex, vm.childIndex)
                  vm.$message({
                    type: 'success',
                    message: vm.renderData.saveSucceed
                  })
                }
              })
            }
          }
        })
      },
      addAccountType (item, parIndex) {
        let vm = this
        vm.parIndex = parIndex
        vm.childIndex = item.account_type.length
        vm.searchData.forEach(function (val) {
          val.addInput = false
        })
        item.addInput = true
        vm.activeKey = ''
        vm.form = {
          accountTypeName: '',
          thisLeverageVal: [],
          thisCurrencyVal: [],
          uuid: item.uuid,
          aid: '',
          optType: 'add'
        }
        vm.thisLeverage = item.leverage
        vm.thisCurrency = item.currency
      },
      selectData (parIndex, childIndex, item, child) {
        let vm = this
        vm.$refs['form'].clearValidate()
        vm.parIndex = parIndex
        vm.childIndex = childIndex
        vm.searchData.forEach(function (val) {
          val.addInput = false
        })
        vm.thisLeverage = vm.searchData[parIndex].leverage
        vm.thisCurrency = vm.searchData[parIndex].currency
        vm.form.aid = child.aid
        vm.form.uuid = item.uuid
        vm.form.optType = 'edit'
        vm.form.thisLeverageVal = vm.searchData[parIndex].account_type[childIndex].leverage
        vm.form.thisCurrencyVal = vm.searchData[parIndex].account_type[childIndex].currency
        vm.activeKey = vm.searchData[parIndex].account_type[childIndex].type_name.key
        vm.form.accountTypeName = vm.searchData[parIndex].account_type[childIndex].type_name.label
      },
      deleteAccountType (item, child, parIndex, childIndex) {
        let vm = this
        vm.$confirm(vm.renderData.deleteTypeText, vm.renderData.toolTip, {
          confirmButtonText: vm.renderData.confirm,
          cancelButtonText: vm.renderData.cancel,
          type: 'warning'
        }).then(() => {
          let params = {
            'uuid': item.uuid,
            'aid': child.aid
          }
          service.deleteAccountType(params).then(function (data) {
            if (data.re === '200') {
              vm.initData(parIndex, childIndex)
              vm.$message({
                type: 'success',
                message: vm.renderData.deleteSucceed
              })
            }
          })
        }).catch(() => {
//          vm.$message({
//            type: 'info',
//            message: vm.renderData.cancel
//          })
        })
      },
      initData (parIndex, childIndex) {
        let vm = this
        service.getAccountSettingList({}).then(function (channelSetting) {
          service.getAccountTypeList({}).then(data => {
            for (let i = 0; i < channelSetting.length; i++) {
              for (let j = 0; j < data.length; j++) {
                data[j].addInput = false
                if (channelSetting[i].channel_name === data[j].channel_name) {
                  data[j].uuid = channelSetting[i].uuid
                  data[j].leverage = channelSetting[i].leverage
                  data[j].currency = channelSetting[i].currency
                }
              }
            }
            vm.searchData = data
            console.log('vm.searchData')
            console.log(vm.searchData)
            if (vm.searchData[parIndex].account_type.length !== 0) {
              if (childIndex === vm.searchData[parIndex].account_type.length) {
                childIndex--
              }
              vm.thisLeverage = vm.searchData[parIndex].leverage
              vm.thisCurrency = vm.searchData[parIndex].currency
              vm.form.optType = 'edit'
              vm.form.uuid = vm.searchData[parIndex].uuid
              vm.form.aid = vm.searchData[parIndex].account_type[childIndex].aid
              vm.form.thisLeverageVal = vm.searchData[parIndex].account_type[childIndex].leverage
              vm.form.thisCurrencyVal = vm.searchData[parIndex].account_type[childIndex].currency
              vm.activeKey = vm.searchData[parIndex].account_type[childIndex].type_name.key
              vm.form.accountTypeName = vm.searchData[parIndex].account_type[childIndex].type_name.label
            }
            if (vm.searchData[parIndex].account_type.length === 0) {
              vm.form.optType = 'add'
              vm.form.accountTypeName = ''
              vm.form.thisLeverageVal = []
              vm.form.thisCurrencyVal = []
              if (vm.searchData[parIndex].currency.length !== 0) {
                vm.thisCurrency = vm.searchData[parIndex].currency
              } else {
                vm.thisLeverage = []          // 删除最后一个时候置空复选框的值
              }
              if (vm.searchData[parIndex].leverage.length !== 0) {
                vm.thisLeverage = vm.searchData[parIndex].leverage
              } else {
                vm.thisCurrency = []
              }
              if (vm.searchData[parIndex].leverage.length !== 0 && vm.searchData[parIndex].leverage.length !== 0) {
                vm.searchData[parIndex].addInput = true
                vm.form.uuid = vm.searchData[parIndex].uuid
              }
            }
          })
        })
      }
    },
    mounted () {
      let vm = this
      if (vm.comAuth.account_type_setting_default) {
        vm.initData(0, 0)
        setTimeout(function () {
          var dom = document.getElementsByClassName('right')
          if (dom[0].scrollHeight > dom[0].clientHeight) {
            document.getElementsByClassName('footer')[0].style.position = 'relative'
          } else {
            document.getElementsByClassName('footer')[0].style.position = 'absolute'
          }
        }, 500)
      }
    },
    components: {
      BTitle,
      BButton,
      BCheckbox,
      BInput,
      BIcon
    }
  }
</script>

<style lang="less">
  .account_type_setting {
    .content{
      display: flex;
      height: 100%;
      .left{
        width: 32%;
        overflow: auto;
        .title{
          padding: 12px 3.75%;
          font-size: 16px;
          font-weight: bold;
        }
        .list{
          position: relative;
          padding: 0 6% 0 12%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          cursor: pointer;
          .delete1-icon{
            position: absolute;
            right: 6%;
            margin-top: 13px;
          }
        }
        .list:last-child{
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .width-100{
          width: 100%;
        }
      }
      .right{
        position: relative;
        width: 68%;
        overflow-y: auto;
        .body{
          padding: 58px 24% 0 4%;
          .el-form-item{
            margin-bottom: 10px;
            .checkbox-box{
              display: inline-block;
              width: 33%;
              margin-top: 10px;
            }
          }
        }
        .footer{
          z-index: 2;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 40px 4%;
        }
      }
    }
    .form-err-less-top{
      .el-form-item__error{
        top: 30px !important;
      }
    }
  }
</style>
