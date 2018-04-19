<template lang="pug">
  .wechat
    .user-operation
      el-form(:model="wechat", :rules="wechatRules", ref="form", label-width="140px", label-position="left")
        el-form-item(prop="tradeAccount")
          template(slot="label")
            span.inline-label(v-text="renderData.tradeAccount", v-ellipsis-title="")
          b-select.input-long-type1(:placeholder="renderData.pleaseSelect", :model.sync="wechat.tradeAccount")
            el-option(v-for="item in items.data", :key="item.accountId", :label="item.accountId", :value="item.accountId")
              .option(@click="getCurrency(item.currency, item)")
                span.left(:title="item.accountId") {{item.accountId}}
                span.middle(:title="item.tradeSystem") {{item.tradeSystem}}
                span.right(:title="item.tradeCategory") {{item.tradeCategory}}
        el-form-item
          template(slot="label")
            span.inline-label(v-text="renderData.currency", v-ellipsis-title="")
          .currency(v-text="wechat.currency")
        el-form-item(prop="depositAmount")
          template(slot="label")
            span.inline-label(v-text="renderData.depositAmount", v-ellipsis-title="")
          el-input.input-long-type2(:placeholder="renderData.pleaseEnter", v-model="wechat.depositAmount", :disabled="wechat.tradeAccount===''")
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
    name: 'wechat',
    data () {
      let [_this, renderData] = [this, window.renderData.components.deposit.deposit_wechat]
      return {
        currencySymbol: '-',
        description: {
          attention: renderData.depositWechatAttention,
          text: renderData.depositWechatText
        },
        renderData: renderData,
        items: _this.list,
        wechat: {
          tradeAccount: '',
          aid: '',
          currency: '-',
          depositAmount: '',
          others: {}
        },
        wechatRules: {
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
                  uid: _this.wechat.aid,
                  currency: _this.wechat.currency,
                  type: 'deposit',
                  method: 'wechat'
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
        vm.$refs['bFormItemValue'].validate((valid, data) => {
          if (valid && JSON.stringify(data.others) !== '{}') {
            vm.wechat.others = {}
            Object.keys(data.others).forEach(function (key) {
              vm.wechat.others[key] = data.others[key]
            })
          }
          res = res && Boolean(valid)
        })
        vm.$refs['form'].validate(valid => {
          res = res && Boolean(valid)
        })
        if (res) {
          let params = {
            account: vm.wechat.tradeAccount,
            aid: vm.wechat.aid,
            amount: vm.wechat.depositAmount,
            currency: vm.wechat.currency,
            others: JSON.parse(JSON.stringify(vm.wechat.others))
          }
          service.depositWeixin(params).then(resp => {
            if (resp.re === '200') {
              document.write(resp.data.data)
              document.forms['payment'].submit()
            }
          })
        }
      },
      getCurrency (currency, item) {
        this.wechat.aid = item.aid
        this.wechat.currency = currency
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
