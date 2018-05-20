<template lang="pug">
  .unionpay
    .user-operation
      el-form(:model="unionpay", :rules="unionpayRules", ref="unionpay", label-width="140" label-position='left')
        el-form-item(:label="renderData.tradeAccount", prop="account")
          b-select.input-long-type1(:placeholder="renderData.pleaseSelect", :model.sync="unionpay.account", @change="editdisable")
            el-option(v-for="item in items.data", :key="item.accountId", :label="item.accountId", :value="item.accountId")
              .option(@click="getCurrency(item.currency,item.aid)")
                span.left(:title="item.accountId") {{item.accountId}}
                span.middle(:title="item.tradeSystem") {{item.tradeSystem}}
                span.right(:title="item.tradeCategory") {{item.tradeCategory}}
        el-form-item(:label="renderData.currency")
          .currency(v-text="unionpay.currency")
        el-form-item(:label="renderData.withdrawalAmount", prop="amount")
          el-input.input-long-type2(:placeholder="renderData.pleaseEnter", v-model="unionpay.amount", :disabled="unionpay.account === ''")
            i(slot="prefix" class="el-input__icon margin-left-5") {{unionpay.currencySymbol}}
        el-form-item(:label="renderData.selectCard", prop="selectCard" style="margin-bottom: 0 !important;")
          b-select.input-long-type1(:placeholder="renderData.pleaseSelect", :model.sync="selectCard")
            el-option(v-for="item in items1", :key="item.cardNo", :label="item.cardNo", :value="item.cardNo")
              .option2(@click="getBankList(item)")
                span {{item.cardNo}}
        .manageCard.input-long-type1
          span.theme-color-A.theme-color-darkenA10-hover(@click="changAdd") {{renderData.manageCard}}
        el-form-item(:label="renderData.cardNo", prop="bank.cardNo", :rules="unionpayRules.cardNo")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="unionpay.bank.cardNo")
        el-form-item(prop="bank.name", :rules="unionpayRules.name")
          template(slot="label")
            span(v-text="renderData.name")
            el-tooltip(class="item" effect="dark", :content="renderData.nameInfo" placement="top")
              b-icon.theme-color-lightenD10.theme-color-A-hover.margin-left-10(iconName='info')
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="unionpay.bank.name")
        el-form-item(:label="renderData.bankName", prop="bank.bankName", :rules="unionpayRules.bankName")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="unionpay.bank.bankName")
        el-form-item(:label="renderData.bankBranch", prop="bank.bankBranch", :rules="unionpayRules.bankBranch")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="unionpay.bank.bankBranch")
        el-form-item(:label="renderData.bankProvince", prop="bank.bankProvince", :rules="unionpayRules.bankProvince")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="unionpay.bank.bankProvince")
        el-form-item(:label="renderData.bankCity", prop="bank.bankCity", :rules="unionpayRules.bankCity")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="unionpay.bank.bankCity")
        el-form-item
          b-checkbox(:model.sync="unionpay.checked") {{renderData.saveCard}}
        el-form-item(:prop="'others.' + item.key", :rules="getRules(item)" v-for="(item, idx) in formItemList", :key="idx")
          span(slot="label") {{item.type=='clause'?'':item.label}}
          b-form-item.input-long-type1(:model.sync="unionpay.others[item.key]", :item="item", @change="itemChange", :disabled="disabled", :renderData="renderData")
        el-form-item
          b-button(type="primary", @click="submit") {{renderData.submit}}

    legal-description(:description="description")
</template>

<script>
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BCheckbox from 'components/BCheckbox'
  import BFormItem from 'components/BFormItem'
  import legalDescription from './legalDescription'
  import service from '../service'
  import utils from 'common/js/Utils'
  import currencySymbol from 'common/js/currency'

  export default {
    name: 'unionpay',
    data () {
      var _this = this
      var str = _this.renderData.amountError
      return {
        description: {
          attention: _this.renderData.withdrawalUnionpayAttention,
          text: _this.renderData.withdrawalUnionpayText
        },
        messageMap: {
          number: _this.renderData.numberMessage,
          longText: _this.renderData.longTextMessage,
          required: _this.renderData.requiredMessage
        },
        disable: true,
        disabled: false,
        formItemList: {},
        thisAid: '',
        thisId: '',
        selectCard: '',
        minValue: '',
        maxValue: '',
        fundHistoryUrl: '',
        unionpay: {
          account: '',
          currency: '-',
          currencySymbol: '-',
          amount: '',
          checked: false,
          bank: {
            cardNo: '',
            name: '',
            bankName: '',
            bankBranch: '',
            bankProvince: '',
            bankCity: ''
          },
          others: {}
        },
        unionpayRules: {
          account: [{required: true, message: _this.renderData.pleaseSelect, trigger: 'change'}],
          amount: [{required: true, message: _this.renderData.pleaseEnter, trigger: 'blur'},
            {
              validator: function (rule, value, callback) {
                var params = {
                  currency: _this.unionpay.currency,
                  type: 'withdraw',
                  method: 'unionPay',
                  value: value
                }
                return utils.checkCurrencyValue(params).then(data => {
                  _this.maxValue = data.valuemax
                  _this.minValue = data.valuemin
                  var string = str.replace('{a}', _this.minValue).replace('{b}', _this.maxValue)
                  if (data.re === 0) {
                    callback(new Error(string))
                  }
                })
              },
              trigger: 'blur'
            },
            {
              regex: utils.constants.floatNumberRule,
              message: _this.renderData.floatNumberError,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          cardNo: [{required: true, message: _this.renderData.pleaseEnterRightCardNo, trigger: 'blur'},
            {
              regex: utils.constants.onlyNumber,
              message: _this.renderData.pleaseEnterRightCardNo,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          name: [{required: true, message: _this.renderData.pleaseEnterName, trigger: 'blur'},
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.length128Limit,
              message: _this.renderData.textLength128,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          bankName: [{required: true, message: _this.renderData.pleaseEnterBankName, trigger: 'blur'},
            {
              regex: utils.constants.text0To10000Limit,
              message: _this.renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          bankBranch: [{required: true, message: _this.renderData.pleaseEnterBankBranch, trigger: 'blur'},
            {
              regex: utils.constants.text0To10000Limit,
              message: _this.renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          bankProvince: [{required: true, message: _this.renderData.pleaseEnterBankProvince, trigger: 'blur'},
            {
              regex: utils.constants.text0To10000Limit,
              message: _this.renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          bankCity: [{required: true, message: _this.renderData.pleaseEnterBankCity, trigger: 'blur'},
            {
              regex: utils.constants.text0To10000Limit,
              message: _this.renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            }
          ]
        },
        items: [],
        items1: []
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      unionpayObj: {
        type: Object,
        required: true
      },
      list: {
        required: true
      }
    },
    async mounted () {
      var _this = this
      this.items = _this.list
      _this.unionpay = _this.unionpayObj
      this.getFundSetting()
      service.get_bankcard_unionpay_select({}).then(data => {
        console.log(data)
        this.items1 = data
      })
    },
    methods: {
      editdisable () {
        this.disable = false
      },
      itemChange (item, val) {
        console.log('itemChange item, val', item, val)
        var beDependentItems = []
        beDependentItems.forEach(elm => {
          this.unionpay.others[elm.key] = ''
          this.itemChange(elm, '')
          if (!elm.params) {
            this.$set(elm, 'params', {[item.key]: this.unionpay.others[item.key]})
          } else {
            elm.params[item.key] = this.unionpay.others[item.key]
          }
        })
      },
      getRules (item) {
        var rules = (item.rules || []).map(rule => {
          var res = utils.constants.ruleMap[rule]
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
                var params = {key: val}
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
        console.log('rules', rules)
        return rules
      },
      getFundSetting () {
        var params = {}
        return service.getFundSetting(params).then(data => {
          this.formItemList = data.withdrawal[0].data.customField
          this.formItemList.forEach(formItem => {
            formItem.value = this.unionpay.others[formItem.key]
          })
          console.log(this.formItemList)
        })
      },
      getCurrency (Currency, aid) {
        this.unionpay.currency = Currency
        this.thisAid = aid
        for (let i = 0; i < currencySymbol.length; i++) {
          if (currencySymbol[i].key === Currency) {
            this.unionpay.currencySymbol = currencySymbol[i].label
            break
          }
        }
      },
      changAdd () {
        this.unionpayObj = this.unionpay
        this.$emit('unionpayObj', this.unionpayObj)
        this.$emit('changeShow1')
      },
      getBankList (item) {
        this.unionpay.bank.cardNo = item.cardNo
        this.unionpay.bank.name = item.name
        this.unionpay.bank.bankName = item.bankName
        this.unionpay.bank.bankBranch = item.bankBranch
        this.unionpay.bank.bankProvince = item.bankProvince
        this.unionpay.bank.bankCity = item.bankCity
        this.thisId = item.bankcard_id
        console.log(this.unionpay.bank.cardNo, this.unionpay.bank.name)
      },
      getComponentUrl () {
        let params = {
          component_name: 'fund_history'
        }
        return service.getComponentUrl(params).then(data => {
          if (data.page_url) {
            this.fundHistoryUrl = data.page_url
            location.pathname = this.fundHistoryUrl
            console.log(this.fundHistoryUrl)
          }
        })
      },
      submit () {
        this.unionpay.aid = this.thisAid
        this.unionpay.bankcard_id = this.thisId
        var params = this.unionpay
        this.$refs['unionpay'].validate((valid) => {
          if (valid) {
            service.submit_unionpay(params).then(data => {
              console.log(data)
//              this.getComponentUrl()
            })
          } else {
            return false
          }
        })
      }
    },
    components: {
      legalDescription,
      BInput,
      BIcon,
      BButton,
      BSelect,
      BCheckbox,
      BFormItem,
      service
    }
  }
</script>

<style lang="less">
</style>
