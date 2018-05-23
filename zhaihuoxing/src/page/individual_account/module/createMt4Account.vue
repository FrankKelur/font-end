<template lang="pug">
  .create-mt4-account
    b-title(:title="renderData.label")
    h1 {{renderData.individualAccountNewAccountNotes}}
    el-tabs(v-model="whichTab", type="card")
      el-tab-pane(:label="renderData.mt4", :name="renderData.mt4")
        h1 {{renderData.mt4Notes}}
        el-form(label-width="140px" label-position='left' ref="form", :model="form", :rules="rules")
          el-form-item(prop="accountType")
            template(slot="label")
              span.theme-color-C.inline-label(v-text="renderData.AccountType", v-ellipsis-title="")
            b-select(:placeholder="accountTypeSelect", :model.sync="form.accountType" filterable @change="accountTypeChange(form.accountType)", @focus="selectFocus('accountType')", @blur="selectBlur('accountType')")
              el-option(v-for="accountTypeItem in searchData", :key="accountTypeItem.type_name.key", :label="accountTypeItem.type_name.label", :value="accountTypeItem.type_name.key")

          el-form-item(prop="leverage")
            template(slot="label")
              span.theme-color-C.inline-label(v-text="renderData.Leverage", v-ellipsis-title="")
            b-select(:placeholder="leverageSelect", :model.sync="form.leverage" filterable, @focus="selectFocus('leverage')", @blur="selectBlur('leverage')")
              el-option(v-for="leverageItem in leverageList", :key="leverageItem", :label="leverageItem", :value="leverageItem")

          el-form-item(prop="currency")
            template(slot="label")
              span.theme-color-C.inline-label(v-text="renderData.currency", v-ellipsis-title="")
            b-select(:placeholder="currencySelect", :model.sync="form.currency" filterable, @focus="selectFocus('currency')", @blur="selectBlur('currency')")
              el-option(v-for="currencyItem in currencyList", :key="currencyItem", :label="currencyItem", :value="currencyItem")
        .add-form
          b-button(@click="back") {{renderData.cancel}}
          b-button(type="primary", @click="subForm") {{renderData.submit}}
</template>

<script>
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import service from '../service'

  export default {
    data () {
      var renderData = Object.assign({}, window.renderData.components.individual_account.individual_account_card_individual.individualAccountNewAccount)
      console.log('renderData')
      console.log(renderData)
      return {
        renderData: renderData,
        whichTab: renderData.mt4,
        accountTypeSelect: renderData.pleaseSelect,
        leverageSelect: renderData.pleaseSelect,
        currencySelect: renderData.pleaseSelect,
        form: {
          accountType: '',
          leverage: '',
          currency: ''
        },
        leverageList: [],
        currencyList: [],
        searchData: [],
        rules: {
          accountType: [
            { required: true, message: renderData.pleaseSelect, trigger: 'change' }
          ],
          leverage: [
            { required: true, message: renderData.pleaseSelect, trigger: 'change' }
          ],
          currency: [
            { required: true, message: renderData.pleaseSelect, trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      accountTypeChange (data) {
        let vm = this
        vm.form.leverage = ''
        vm.form.currency = ''
        vm.searchData.forEach(function (val) {
          if (data === val.type_name.key) {
            vm.leverageList = val.leverage
            vm.currencyList = val.currency
          }
        })
      },
      subForm () {
        let vm = this
        vm.$refs['form'].validate(function (valid) {
          if (valid) {
            var data = {
              aid: '',
              cid: '',
              account_type: {
                key: '',
                label: ''
              },
              leverage: vm.form.leverage,
              currency: vm.form.currency,
              tradeSystem: vm.whichTab
            }
            for (let i = 0; i < vm.searchData.length; i++) {
              if (vm.searchData[i].type_name.key === vm.form.accountType) {
                data.aid = vm.searchData[i].aid
                data.cid = vm.searchData[i].cid
                data.account_type.label = vm.searchData[i].type_name.label
                data.account_type.key = vm.searchData[i].type_name.key
                break
              }
            }
            service.createTradeAccount({data}).then(data => {
              if (data.re === '200') {
                vm.$message({
                  message: vm.renderData.createSucceed,
                  type: 'success'
                })
                vm.$emit('changePage', 'tradeAccount')
              }
            })
          }
        })
      },
      back () {
        this.$emit('changePage', 'tradeAccount')
      },
      selectFocus (item) {
        switch (item) {
          case 'accountType':
            this.accountTypeSelect = this.renderData.enterToSearch
            break
          case 'leverage':
            this.leverageSelect = this.renderData.enterToSearch
            break
          case 'currency':
            this.currencySelect = this.renderData.enterToSearch
            break
        }
      },
      selectBlur (item) {
        switch (item) {
          case 'accountType':
            this.accountTypeSelect = this.renderData.pleaseSelect
            break
          case 'leverage':
            this.leverageSelect = this.renderData.pleaseSelect
            break
          case 'currency':
            this.currencySelect = this.renderData.pleaseSelect
            break
        }
      },
      init () {
        service.getTradeAccountSelect({}).then(data => {
          this.searchData = data
        })
      }
    },
    mounted () {
      this.init()
    },
    components: {
      BTitle,
      BButton,
      BSelect
    }
  }
</script>

<style lang="less">
  .create-mt4-account{
    h1{
      padding-left: 1.2%;
      margin-bottom: 15px;
      font-size: 14px;
    }
    .el-form{
      margin-left: 1.2%;
      width: 48.8%;
      .el-form-item:last-child{
        margin-bottom: 35px;
      }
    }
    .add-form{
      margin-left: 1.2%;
    }
  }
</style>
