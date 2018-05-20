<template lang="pug">
  .neteller
    .user-operation
      el-form(:model="neteller", :rules="netellerRules", ref="form", label-width="140px", label-position="left")
        el-form-item(prop="tradeAccount")
          template(slot="label")
            span.inline-label(v-text="renderData.tradeAccount", v-ellipsis-title="")
          b-select.input-long-type1(:placeholder="renderData.pleaseSelect", :model.sync="neteller.tradeAccount")
            el-option(v-for="item in items.data", :key="item.accountId", :label="item.accountId", :value="item.accountId")
              .option(@click="getCurrency(item.currency,item.aid)")
                span.left(:title="item.accountId") {{item.accountId}}
                span.middle(:title="item.tradeSystem") {{item.tradeSystem}}
                span.right(:title="item.tradeCategory") {{item.tradeCategory}}
        el-form-item
          template(slot="label")
            span.inline-label(v-text="renderData.currency", v-ellipsis-title="")
          .currency(v-text="neteller.currency")
        el-form-item(prop="name")
          template(slot="label")
            span.inline-label(v-text="renderData.name", v-ellipsis-title="")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="neteller.name")
        el-form-item
          template(slot="label")
            span.inline-label(v-text="renderData.netellerAccount", v-ellipsis-title="")
          .p(v-ellipsis-title="") {{neteller.userEmail}}
        el-form-item(prop="withdrawalAmount")
          template(slot="label")
            span.inline-label(v-text="renderData.withdrawalAmount", v-ellipsis-title="")
          el-input.input-long-type2(:placeholder="renderData.pleaseEnter", v-model="neteller.withdrawalAmount", :disabled="neteller.tradeAccount===''")
            i(slot="prefix" class="el-input__icon margin-left-5") {{currencySymbol}}
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
  import legalDescription from './legalDescription'
  import service from '../service'

  export default {
    mixins: [componentMixin],
    name: 'neteller',
    data () {
      let [_this, renderData] = [this, Object.assign({}, window.renderData.components.withdrawal.withdrawal_neteller, window.renderData.components.withdrawal.withdrawal_auth)]
      return {
        currencySymbol: '-',
        description: {
          attention: renderData.withdrawalNetellerAttention,
          text: renderData.withdrawalNetellerText
        },
        renderData: renderData,
        items: _this.list,
        neteller: {
          aid: '',
          tradeAccount: '',
          currency: '-',
          name: '',
          userEmail: renderData.USEREMAIL,
          withdrawalAmount: ''
        },
        netellerRules: {
          tradeAccount: [{required: true, message: renderData.pleaseSelect, trigger: 'change'}],
          name: [{required: true, message: renderData.pleaseEnter, trigger: 'blur'}],
          withdrawalAmount: [
            {
              required: true,
              message: renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              validator: function (rule, value, callback) {
                let params = {
                  uid: _this.neteller.aid,
                  currency: _this.neteller.currency,
                  type: 'withdraw',
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
      }
    },
    methods: {
      submitForm () {
        let vm = this
        vm.$refs['form'].validate(valid => {
          if (valid) {
            let params = {
              account: vm.neteller.tradeAccount,
              currency: vm.neteller.currency,
              amount: vm.neteller.withdrawalAmount,
              aid: vm.neteller.aid,
              others: {
                netellerAccount: vm.neteller.userEmail,
                name: vm.neteller.name
              }
            }
            service.withdrawalNeteller(params).then(data => {
              if (data.re === '200') {
//                vm.$message({
//                  message: vm.renderData.submitSucceed,
//                  type: 'success'
//                })
              } else {
//                vm.$message({
//                  message: vm.renderData.submitFail,
//                  type: 'error'
//                })
              }
            })
          }
        })
      },
      getCurrency (currency, aid) {
        this.neteller.aid = aid
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
      service
    }
  }
</script>

<style lang="less">
</style>
