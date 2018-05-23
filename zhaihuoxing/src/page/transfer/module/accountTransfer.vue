<template lang="pug">
  .account-transfer
    .user-operation
      el-form(:model="form", :rules="formRules", ref="form", label-width="140px", label-position="left")
        el-form-item(prop="from_account")
          template(slot="label")
            span.inline-label(v-text="renderData.fromAccount", v-ellipsis-title="")
          b-select.input-long-type1(:placeholder="renderData.pleaseSelect", :model.sync="form.from_account", @change="fromAccountChange")
            el-option(v-for="item in fromAccount", :key="item.accountId", :label="item.accountId", :value="item.accountId")
              .option(@click="getCurrency(item.currency, item)")
                span.left(:title="item.accountId") {{item.accountId}}
                span.middle(:title="item.tradeSystem") {{item.tradeSystem}}
                span.right(:title="item.balance") {{getCurrencySymbol(item.currency)}} {{item.balance}}
        el-form-item
          template(slot="label")
            span.inline-label(v-text="renderData.currency", v-ellipsis-title="")
          .currency(v-text="form.currency")
        el-form-item(prop="to_account")
          template(slot="label")
            span.inline-label(v-text="renderData.toAccount", v-ellipsis-title="")
          b-select.input-long-type1(:placeholder="renderData.pleaseSelect", :model.sync="form.to_account", :disabled="form.fromAccount===''")
            el-option(v-for="item in toAccount", :key="item.accountId", :label="item.accountId", :value="item.accountId")
              .option(@click="selectToAccount(item)")
                span.left(:title="item.accountId") {{item.accountId}}
                span.middle(:title="item.tradeSystem") {{item.tradeSystem}}
                span.right(:title="item.balance") {{getCurrencySymbol(item.currency)}} {{item.balance}}
        el-form-item(prop="amount")
          template(slot="label")
            span.inline-label(v-text="renderData.amount", v-ellipsis-title="")
          el-input.input-long-type2(:placeholder="renderData.pleaseEnter", v-model="form.amount", :disabled="form.from_account==='' || form.to_account===''")
            i(slot="prefix" class="el-input__icon margin-left-5") {{currencySymbol}}

        el-form-item(v-for="(item, idx) in formItemList", :key="idx", :prop="'others.' + item.key", :rules="getRules(item)")
          span(slot="label") {{item.type=='clause'?'':item.label}}
          b-form-item.input-long-type1(:model.sync="form.others[item.key]", :item="item", @change="itemChange", :disabled="disabled", :renderData="renderData")

        el-form-item
          b-button(type="primary", @click="submitForm") {{renderData.submit}}

    legal-description(:description="description")

</template>

<script>
  import componentMixin from 'common/js/componentMixin'
  import currencySymbol from 'common/js/currency'
  import BSelect from 'components/BSelect'
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import BFormItem from 'components/BFormItem'
  import legalDescription from './legalDescription'
  import utils from 'common/js/Utils'
  import service from '../service'

  export default {
    mixins: [componentMixin],
    name: 'accountTransfer',
    data () {
      let [vm, renderData] = [this, window.renderData.components.transfer.transfer_default]
      return {
        currencySymbol: '-',
        description: {
          attention: renderData.attention,
          text: renderData.attentionText
        },
        renderData: renderData,
        messageMap: {
          number: renderData.numberMessage,
          longText: renderData.longTextMessage,
          required: renderData.requiredMessage
        },
        disabled: false,
        formItemList: {},
        fromAccount: [],
        toAccount: [],
        form: {
          from_account: '',
          from_aid: '',
          from_balance: '',
          currency: '-',
          to_account: '',
          to_aid: '',
          amount: '',
          tradeSystem: '',
          others: {}
        },
        formRules: {
          from_account: [{required: true, message: renderData.pleaseSelect, trigger: 'change'}],
          to_account: [{required: true, message: renderData.pleaseSelect, trigger: 'change'}],
          amount: [
            {
              required: true,
              message: renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              regex: /^[0-9]\d*(\.\d+)?$/,        // 大于0 数字（包含小数）
              validator: utils.validator.validate,
              message: renderData.pleaseEnterNumberBiggerThanZero,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              message: renderData.insufficientBalance,
              test (val) {
                return (parseInt(vm.form.from_balance) - val) > 0
              },
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      getCurrency (currency, item) {
        this.form.currency = '-' + currency
        this.form.from_aid = item.aid
        this.form.from_balance = item.balance
        this.toAccount = JSON.parse(JSON.stringify(item.toAccount))
        for (let i = 0; i < currencySymbol.length; i++) {
          if (currencySymbol[i].key === currency) {
            this.currencySymbol = currencySymbol[i].label
            break
          }
        }
      },
      fromAccountChange () {
        this.form.toAccount = ''
      },
      selectToAccount (item) {
        this.form.to_aid = item.aid
        this.form.tradeSystem = item.tradeSystem
      },
      submitForm () {
        let vm = this
        vm.$refs['form'].validate(valid => {
          if (valid) {
            let params = {
              from_account: vm.form.from_account,
              from_aid: vm.form.from_aid,
              to_account: vm.form.to_account,
              to_aid: vm.form.to_aid,
              currency: vm.form.currency.slice(1),
              amount: vm.form.amount,
              from_balance: vm.form.from_balance,
              tradeSystem: vm.form.tradeSystem
            }
            service.accountTransferSelf(params).then(data => {
              if (data.re === '200') {
                vm.$message({
                  message: vm.renderData.submitSucceed,
                  type: 'success'
                })
              }
              if (data.re === '403') {
                vm.$message({
                  message: vm.renderData.submitFail,
                  type: 'error'
                })
              }
//              vm.$alert(vm.renderData.transferFailReason, vm.renderData.transferFail, {
//                confirmButtonText: vm.renderData.confirm,
//                type: 'error'
//              })
            })
          }
        })
      },
      getCurrencySymbol (key) {
        for (let i = 0; i < currencySymbol.length; i++) {
          if (currencySymbol[i].key === key) {
            return currencySymbol[i].label
          }
        }
      },
      getFromAccountSelect () {
        return service.getFromAccountSelect({}).then(data => {
          this.fromAccount = data.data
        })
      },
      getRules (item) {
        var rules = (item.rules || []).map(rule => {
          let res = utils.constants.ruleMap[rule]
          if (rule === 'required' && item.type === 'multiple-select') {
            res = {
              name: 'required',
              validator: utils.validator.validate,
              test (val) {
                if (val.length === 0) {
                  return false
                } else {
                  return true
                }
              },
              trigger: 'blur,change'
            }
          }
          if (rule === 'required' && item.type === 'clause') {
            res = {
              name: 'required',
              validator: utils.validator.validate,
              test (val) {
                return !!val // 要求checkbox 必须为true
              },
              trigger: 'blur,change'
            }
          }
          if (rule.includes('api') && !res) {
            res = {
              name: rule,
              trigger: 'blur,change',
              test (val) {
                let params = {key: val}
                Object.assign(params, item.params)
                return fetch(rule, params)
              },
              validator: utils.validator.validate
            }
            return res
          }
          res.message = this.messageMap[res.name]
          return res
        })
        return rules
      },
      getFundSetting () {
        return service.getFundSetting({}).then(data => {
          this.formItemList = data.transfer[0].data.customField
          this.formItemList.forEach(formItem => {
            formItem.value = this.form.others[formItem.key]
          })
        })
      },
      itemChange (item) {
        let beDependentItems = []
        beDependentItems.forEach(elm => {
          this.form.others[elm.key] = ''
          this.itemChange(elm, '')
          if (!elm.params) {
            this.$set(elm, 'params', {[item.key]: this.form.others[item.key]})
          } else {
            elm.params[item.key] = this.form.others[item.key]
          }
        })
      }
    },
    mounted () {
      this.getFromAccountSelect()
      this.getFundSetting()
    },
    components: {
      BSelect,
      BInput,
      BButton,
      BFormItem,
      legalDescription,
      service
    }
  }
</script>

<style lang="less">
</style>
