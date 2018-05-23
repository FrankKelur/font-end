<template lang="pug">
  .neteller
    .user-operation
      el-form(:model="neteller", :rules="netellerRules", ref="form", label-width="140px", label-position="left")
        el-form-item(prop="tradeAccount")
          template(slot="label")
            span.inline-label(v-text="renderData.tradeAccount", v-ellipsis-title="")
          b-select.input-long-type1(:placeholder="renderData.pleaseSelect", :model.sync="neteller.tradeAccount")
            el-option(v-for="item in items.data", :key="item.accountId", :label="item.accountId", :value="item.accountId")
              .option(@click="getCurrency(item.currency, item)")
                span.left(:title="item.accountId") {{item.accountId}}
                span.middle(:title="item.tradeSystem") {{item.tradeSystem}}
                span.right(:title="item.tradeCategory") {{item.tradeCategory}}
        el-form-item
          template(slot="label")
            span.inline-label(v-text="renderData.currency", v-ellipsis-title="")
          .currency(v-text="neteller.currency")
        el-form-item
          template(slot="label")
            span.inline-label(v-text="renderData.netellerAccount", v-ellipsis-title="")
          .p(v-ellipsis-title="") {{neteller.userEmail}}
        el-form-item(prop="depositAmount")
          template(slot="label")
            span.inline-label(v-text="renderData.depositAmount", v-ellipsis-title="")
          el-input.input-long-type2(:placeholder="renderData.pleaseEnter", v-model="neteller.depositAmount", :disabled="neteller.tradeAccount===''")
            i(slot="prefix" class="el-input__icon margin-left-5") {{currencySymbol}}
        b-form-item-value(ref="bFormItemValue", :customField="customField")
        el-form-item.margin-top-15
          b-button(type="primary", @click="submitForm") {{renderData.submit}}

    legal-description(:description="description")

</template>

<script>
  import componentMixin from 'common/js/componentMixin'
  import BSelect from 'components/BSelect'
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import legalDescription from './legalDescription'
  import currencySymbol from 'common/js/currency'
  import bFormItemValue from './bFormItemValue'
  import utils from 'common/js/Utils'
  import service from '../service'

  export default {
    mixins: [componentMixin],
    name: 'neteller',
    data () {
      let [_this, renderData] = [this, window.renderData.components.deposit.deposit_neteller]
      return {
        currencySymbol: '-',
        description: {
          attention: renderData.depositNetellerAttention,
          text: renderData.depositNetellerText
        },
        renderData: renderData,
        items: _this.list,
        neteller: {
          tradeAccount: '',
          aid: '',
          currency: '-',
          userEmail: window.renderData.components.deposit.deposit_auth.USEREMAIL,
          depositAmount: ''
        },
        netellerRules: {
          tradeAccount: [{required: true, message: renderData.pleaseSelect, trigger: 'blur'}],
          depositAmount: [
            {
              required: true,
              message: renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              regex: /^[1-9]\d*$/,
              validator: utils.validator.validate,
              message: renderData.pleaseEnterNumber,
              trigger: 'blur'
            },
            {
              validator: function (rule, value, callback) {
                let params = {
                  uid: _this.neteller.aid,
                  currency: _this.neteller.currency,
                  type: 'deposit',
                  method: 'neteller',
                  value: value
                }
                return service.checkCurrencyValue(params).then(data => {
                  _this.maxValue = data.valuemax
                  _this.minValue = data.valuemin
                  var string = renderData.amountError.replace('{a}', _this.minValue).replace('{b}', _this.maxValue)
                  if (data.re === 0) {
                    callback(new Error(string))
                  }
                })
              },
              trigger: 'blur'
            }
          ]
        }
      }
    },
    props: {
      list: {
        required: true
      },
      customField: {
        required: true
      }
    },
    methods: {
      submitForm () {
        let [vm, res] = [this, true]
        vm.neteller.others = {
          netellerAccount: vm.neteller.userEmail
        }
        vm.$refs['bFormItemValue'].validate((valid, data) => {
          if (valid && JSON.stringify(data.others) !== '{}') {
            Object.keys(data.others).forEach(function (key) {
              vm.neteller.others[key] = data.others[key]
            })
          }
          res = res && Boolean(valid)
        })
        vm.$refs['form'].validate(valid => {
          res = res && Boolean(valid)
        })
        if (res) {
          let params = {
            account: vm.neteller.tradeAccount,
            aid: vm.neteller.aid,
            amount: vm.neteller.depositAmount,
            currency: vm.neteller.currency,
            others: JSON.parse(JSON.stringify(vm.neteller.others))
          }
          service.depositNeteller(params).then(resp => {
            console.log(resp)
          })
        }
      },
      getCurrency (currency, item) {
        this.neteller.aid = item.aid
        this.neteller.currency = currency
        for (let i = 0; i < currencySymbol.length; i++) {
          if (currencySymbol[i].key === currency) {
            this.currencySymbol = currencySymbol[i].label
            break
          }
        }
      }
    },
    mounted () {},
    components: {
      BSelect,
      BInput,
      BButton,
      legalDescription,
      bFormItemValue,
      service
    }
  }
</script>

<style lang="less">
</style>
