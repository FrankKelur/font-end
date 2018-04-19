<template lang="pug">
  .account_setting.theme-border-lightenD12.component#account_setting
    .kongdiv1
      b-title.amt-more-left-in(:title="renderData.accountSetting")
        template(slot="icon")
          el-tooltip(class="item" effect="dark", :content="renderData.accountSettingInfo" placement="top")
            b-icon.theme-color-A-hover.theme-color-lightenD10.margin-left-10(iconName='info')

    el-collapse.amt-more-left-in(v-model="activeName" v-if="comAuth.account_setting_default")
      el-collapse-item(v-for="(item, parIndex) in dataList", :key="parIndex", :title="item.channel_name", :name="item.channel_name")
        .box-content
          el-form(label-width="140px" label-position='left' ref="form")
            el-form-item(prop="data1", class="is-required")
              template(slot="label")
                span.theme-color-C.inline-label(v-text="renderData.leverage", v-ellipsis-title="")
              .list-item
                b-button.tag-group(size="small" v-for="(lever, index) in item.leverage", :key="index")
                  span.tag-group-txt(v-ellipsis-title="") {{lever}}
                  b-icon.theme-color-C.theme-color-G-hover(iconName="delete", size="12px", @click.native='deleteItem(lever, item, "lever")')
                b-button.add-btn(size="small" type="primary", @click.native='addLever(item)' v-if="!item.leverSelectFlag") {{renderData.add}}

                .select-area(v-if="item.leverSelectFlag")
                  b-select(:placeholder="leveragePlaceholder", :model.sync="item.leverSelectData" filterable @click.native="leverSelectClick")
                    el-option(v-for="leverItem in item.leverSelectArr", :key="leverItem", :label="leverItem", :value="leverItem")
                  b-icon.theme-color-C.theme-color-G-hover.margin-left-15(iconName='delete', @click.native='cancelAddLever(item)')
                  b-icon.theme-color-C.theme-color-E-hover.margin-left-15(iconName='message_success', @click.native='sureAddLever(item, parIndex)')

            el-form-item(prop="data2", class="is-required")
              template(slot="label")
                span.theme-color-C.inline-label(v-text="renderData.currency", v-ellipsis-title="")
              .list-item
                b-button.tag-group(size="small" v-for="(money, index) in item.currency", :key="index")
                  span.tag-group-txt(v-ellipsis-title="") {{money}}
                  b-icon.theme-color-C.theme-color-G-hover(iconName="delete", size="12px", @click.native='deleteItem(money, item, "money")')
                b-button.add-btn(size="small" type="primary", @click.native='addMoney(item)' v-if="!item.currencySelectFlag") {{renderData.add}}

                .select-area(v-if="item.currencySelectFlag")
                  b-select(:placeholder="currencyPlaceholder", :model.sync="item.currencySelectData" filterable @click.native="moneySelectClick")
                    el-option(v-for="currencyItem in item.currencySelectArr", :key="currencyItem", :label="currencyItem", :value="currencyItem")
                  b-icon.theme-color-C.theme-color-G-hover.margin-left-15(iconName='delete', @click.native='cancelAddMoney(item)')
                  b-icon.theme-color-C.theme-color-E-hover.margin-left-15(iconName='message_success', @click.native='sureAddMoney(item, parIndex)')

            el-form-item(:prop="data3", class="is-required")
              template(slot="label")
                span.theme-color-C.inline-label(v-text="renderData.accountCategory", v-ellipsis-title="")
              .list-item
                .list-item-left.theme-color-C {{renderData.accountTypeName}}
                .list-item-right.theme-color-C {{renderData.startNo}}
              .list-item.margin-bottom-10(v-for="accountItem in item.accountCategory")
                .list-item-left
                  b-checkbox.theme-color-darkenC15(:model.sync="accountItem.checked", @change="selectAccount(accountItem, item, parIndex)") {{accountItem.name.label}}
                  el-tooltip(class="item" effect="dark", :content="accountItem.iconTooltip" placement="top")
                    b-icon.theme-color-A-hover.theme-color-lightenD10.margin-left-10(iconName='info')
                .list-item-right
                  el-form(ref="formChild", :model="accountItem")
                    el-form-item(prop="start_No", :rules="childFormRule")
                      b-input(:model.sync="accountItem.start_No", :disabled="accountItem.checked===false", :placeholder="renderData.pleaseEnter")
                    //el-form-item(prop="start_No", v-if="!accountItem.checked")
                      b-input(:model.sync="accountItem.start_No", :disabled="accountItem.checked===false", :placeholder="renderData.pleaseEnter")

          b-button(type="primary", @click.native='saveData(item, parIndex)') {{renderData.save}}
</template>

<script>
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BCheckbox from 'components/BCheckbox'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import utils from 'common/js/Utils'

  export default {
    name: 'account_setting',
    mixins: [componentMixin],
    data () {
      var comAuth = window.renderData.components.account_setting
      var renderData = Object.assign({}, comAuth.account_setting_auth, comAuth.account_setting_default)
      return {
        activeName: [],
        dataList: [],
        leverageList: [],
        currencyList: [],
        comAuth: comAuth,
        renderData: renderData,
        childFormRule: [
          {
            required: true,
            message: renderData.pleaseEnter,
            trigger: 'blur'
          },
          {
            min: 1,
            max: 11,
            message: renderData.textLength11,
            trigger: 'blur'
          },
          {
            regex: utils.constants.mustNumber,
            message: renderData.numberOnlyNoSpace,
            validator: utils.validator.validate,
            trigger: 'blur'
          }
        ],
        leveragePlaceholder: renderData.pleaseAddLeverage,
        currencyPlaceholder: renderData.pleaseAddCurrency
      }
    },
    methods: {
      selectAccount (value, item, parIndex) {
        if (item.accountCategory.length !== 0) {
          var res = false
          item.accountCategory.forEach(function (val, index, arr) {
            if (val.checked === true) {
              res = true
            }
          })
          if (res === false) {
            this.$refs.form[parIndex].fields[2].validateState = 'error'
            this.$refs.form[parIndex].fields[2].validateMessage = this.renderData.mustAccount
          } else {
            this.$refs.form[parIndex].fields[2].validateState = ''
            this.$refs.form[parIndex].fields[2].validateMessage = ''
          }
        }
        var start = parIndex * 5
        var end = (parIndex + 1) * 5
        for (start; start < end; start++) {
          if (this.$refs.formChild[start].model.name.key === value.name.key && this.$refs.formChild[start].model.checked === false) {
            console.log(this.$refs.formChild[start])
            this.$refs.formChild[start].fields[0].validateState = ''
            this.$refs.formChild[start].fields[0].validateMessage = ''
            break
          }
          if (this.$refs.formChild[start].model.name.key === value.name.key && this.$refs.formChild[start].model.checked === true) {
            this.$refs.formChild[start].validateField('start_No', (error) => {
              console.log(error)
            })
            break
          }
        }
      },
      deleteItem (child, father, type) {
        if (type === 'lever') {
          for (let i = 0; i < father.leverage.length; i++) {
            if (child === father.leverage[i]) {
              father.leverage.splice(i, 1)
              father.leverSelectArr.push(child)
            }
          }
        }
        if (type === 'money') {
          for (let i = 0; i < father.currency.length; i++) {
            if (child === father.currency[i]) {
              father.currency.splice(i, 1)
              father.currencySelectArr.push(child)
            }
          }
        }
      },
      addLever (item) {
        item.leverSelectFlag = true
      },
      leverSelectClick () {
        this.leveragePlaceholder = this.renderData.enterToSearch
      },
      cancelAddLever (item) {
        this.leveragePlaceholder = this.renderData.pleaseAddLeverage
        item.leverSelectData = ''
        item.leverSelectFlag = false
      },
      sureAddLever (item, parIndex) {
        this.leveragePlaceholder = this.renderData.pleaseAddLeverage
        if (item.leverSelectData === '') {
          item.leverSelectFlag = false
        } else {
          item.leverage.push(item.leverSelectData)
          for (let i = 0; i < item.leverSelectArr.length; i++) {
            if (item.leverSelectData === item.leverSelectArr[i]) {
              item.leverSelectArr.splice(i, 1)
            }
          }
          item.leverSelectData = ''
          item.leverSelectFlag = false
        }
        if (item.leverage.length === 0) {
          this.$refs.form[parIndex].fields[0].validateState = 'error'
          this.$refs.form[parIndex].fields[0].validateMessage = this.renderData.mustLeverage
        } else {
          this.$refs.form[parIndex].fields[0].validateState = ''
          this.$refs.form[parIndex].fields[0].validateMessage = ''
        }
      },
      addMoney (item) {
        item.currencySelectFlag = true
      },
      moneySelectClick () {
        this.currencyPlaceholder = this.renderData.enterToSearch
      },
      cancelAddMoney (item) {
        this.currencyPlaceholder = this.renderData.pleaseAddCurrency
        item.currencySelectData = ''
        item.currencySelectFlag = false
      },
      sureAddMoney (item, parIndex) {
        this.currencyPlaceholder = this.renderData.pleaseAddCurrency
        if (item.currencySelectData === '') {
          item.currencySelectFlag = false
        } else {
          item.currency.push(item.currencySelectData)
          for (let i = 0; i < item.currencySelectArr.length; i++) {
            if (item.currencySelectData === item.currencySelectArr[i]) {
              item.currencySelectArr.splice(i, 1)
            }
          }
          item.currencySelectData = ''
          item.currencySelectFlag = false
        }
        if (item.currency.length === 0) {
          this.$refs.form[parIndex].fields[1].validateState = 'error'
          this.$refs.form[parIndex].fields[1].validateMessage = this.renderData.mustCurrency
        } else {
          this.$refs.form[parIndex].fields[1].validateState = ''
          this.$refs.form[parIndex].fields[1].validateMessage = ''
        }
      },
      saveData (item, index) {
        console.log(item)
        var canSubForm = true
        if (item.leverage.length === 0) {
          this.$refs.form[index].fields[0].validateState = 'error'
          this.$refs.form[index].fields[0].validateMessage = this.renderData.mustLeverage
          canSubForm = false
        } else {
          this.$refs.form[index].fields[0].validateState = ''
          this.$refs.form[index].fields[0].validateMessage = ''
        }
        if (item.currency.length === 0) {
          this.$refs.form[index].fields[1].validateState = 'error'
          this.$refs.form[index].fields[1].validateMessage = this.renderData.mustCurrency
          canSubForm = false
        } else {
          this.$refs.form[index].fields[1].validateState = ''
          this.$refs.form[index].fields[1].validateMessage = ''
        }
        if (item.accountCategory.length !== 0) {
          var res = false
          item.accountCategory.forEach(function (val, index, arr) {
            if (val.checked === true) {
              res = true
            }
          })
          if (res === false) {
            this.$refs.form[index].fields[2].validateState = 'error'
            this.$refs.form[index].fields[2].validateMessage = this.renderData.mustAccount
            canSubForm = false
          }
          var start = index * 5
          var end = (index + 1) * 5
          for (start; start < end; start++) {
            if (this.$refs.formChild[start].model.checked === true && this.$refs.formChild[start].fields[0].validateState === 'error') {
              console.log('有子表单项不通过')
              canSubForm = false
              break
            }
          }
        }
        if (canSubForm) {
          var subData = {
            uuid: item.uuid,
            tran_type: 17
          }
          var params = Object.assign({}, item)
          delete params.currencySelectArr
          delete params.currencySelectData
          delete params.currencySelectFlag
          delete params.leverSelectArr
          delete params.leverSelectData
          delete params.leverSelectFlag
          delete params.uuid
          subData.data = params
          console.log('subData', subData)
          service.editAccountSetting(subData).then(data => {
            if (data.re === '200') {
              this.$message({
                message: this.renderData.saveSucceed,
                type: 'success'
              })
            } else {
              this.$message({
                message: this.renderData.netErrorSaveFail,
                type: 'error'
              })
            }
          })
        }
      },
      getAllLeverage () {
        service.getAllLeverage({}).then(data => {
          this.leverageList = data
        })
      },
      getAllCurrency () {
        service.getAllCurrency({}).then(data => {
          this.currencyList = data
        })
      },
      getAccountSettingList () {
        let vm = this
        service.getAccountSettingList({}).then(data => {
          vm.dataList = data
          if (vm.dataList.length) {
            vm.activeName.push(data[0].channel_name)
          }
          vm.dataList.forEach(function (val, index, data) {
            vm.$set(val, 'leverSelectFlag', false) // 下拉框显示控制
            vm.$set(val, 'leverSelectData', '')    // 下拉框v-model
            vm.$set(val, 'leverSelectArr', [])      // 下拉框剩余可选数据，每组数据必须独立
            vm.$set(val, 'currencySelectFlag', false)
            vm.$set(val, 'currencySelectData', '')
            vm.$set(val, 'currencySelectArr', [])
            vm.leverageList.forEach(function (data) {
              val.leverSelectArr.push(data)
            })
            for (let i = 0; i < val.leverage.length; i++) {
              for (let j = 0; j < val.leverSelectArr.length; j++) {
                if (val.leverage[i] === val.leverSelectArr[j]) {
                  val.leverSelectArr.splice(j, 1)
                  break
                }
              }
            }
            vm.currencyList.forEach(function (data) {
              val.currencySelectArr.push(data)
            })
            for (let i = 0; i < val.currency.length; i++) {
              for (let j = 0; j < val.currencySelectArr.length; j++) {
                if (val.currency[i] === val.currencySelectArr[j]) {
                  val.currencySelectArr.splice(j, 1)
                  break
                }
              }
            }
            if (val.accountCategory.length === 0) {
              val.accountCategory.push(
                {
                  iconTooltip: vm.renderData.tradeAccountInfo,
                  checked: false,
                  name: {
                    key: 'tradeAccount',
                    label: vm.renderData.tradeAccount
                  },
                  start_No: ''
                },
                {
                  iconTooltip: vm.renderData.investAccountInfo,
                  checked: false,
                  name: {
                    key: 'investAccount',
                    label: vm.renderData.investAccount
                  },
                  start_No: ''
                },
                {
                  iconTooltip: vm.renderData.pammAccountInfo,
                  checked: false,
                  name: {
                    key: 'pammAccount',
                    label: vm.renderData.pammAccount
                  },
                  start_No: ''
                },
                {
                  iconTooltip: vm.renderData.rebateAccountInfo,
                  checked: false,
                  name: {
                    key: 'rebateAccount',
                    label: vm.renderData.rebateAccount
                  },
                  start_No: ''
                },
                {
                  iconTooltip: vm.renderData.escrowAccountInfo,
                  checked: false,
                  name: {
                    key: 'escrowAccount',
                    label: vm.renderData.escrowAccount
                  },
                  start_No: ''
                }
              )
            } else {
              val.accountCategory.forEach(function (data) {
                // 小图标icon文案
                if (data.name.key === 'tradeAccount') {
                  data.iconTooltip = vm.renderData.tradeAccountInfo
                }
                if (data.name.key === 'investAccount') {
                  data.iconTooltip = vm.renderData.investAccountInfo
                }
                if (data.name.key === 'pammAccount') {
                  data.iconTooltip = vm.renderData.pammAccountInfo
                }
                if (data.name.key === 'rebateAccount') {
                  data.iconTooltip = vm.renderData.rebateAccountInfo
                }
                if (data.name.key === 'escrowAccount') {
                  data.iconTooltip = vm.renderData.escrowAccountInfo
                }
              })
            }
          })
        })
      }
    },
    components: {
      BTitle,
      BButton,
      BIcon,
      BCheckbox,
      BSelect,
      BInput
    },
    async mounted () {
      let vm = this
      if (vm.comAuth.account_setting_default) {
        await this.getAllLeverage()
        await this.getAllCurrency()
        setTimeout(function () {
          vm.getAccountSettingList()
        }, 500)
      }
    }
  }
</script>

<style lang="less">
  .account_setting {
    position: relative;
    .b-title{
      margin-bottom: 5px !important;
    }
    .box-content{
      padding: 15px 1.2% 27px;
      .list-item{
        .list-item-left{
          display: inline-block;
          width: 180px;
          vertical-align: top;
          .el-checkbox{
            margin-top: 10px;
          }
        }
        .list-item-right{
          display: inline-block;
          width: 250px;
          .el-form-item__error{
            position: relative;
          }
        }
        .tag-group {
          margin: 0 8px 6px 0!important;
          .b-icon {
            margin-left: 14px;
            position: relative;
            bottom: 3px;
          }
          .tag-group-txt {
            max-width: 300px;
            display: inline-block;
            font-size: 14px!important;
          }
        }
        .el-button+.el-button {
          margin-left: 0;
        }
        .add-btn{
          position: relative;
          top: -2px;
          height: 36px;
        }
        .select-area{
          display: inline-block;
          .el-select{
            width: auto;
          }
        }
      }
      .margin-bottom-10{
        margin-bottom: 10px;
      }
      .margin-left-15{
        margin-left: 15px;
      }
      .margin-left-10{
        margin-left: 10px;
      }
      .is-error .el-input__inner{
        border-color: inherit;
      }
      .is-error .el-input__inner:focus{
        border-color: inherit;
      }
    }
  }
</style>
