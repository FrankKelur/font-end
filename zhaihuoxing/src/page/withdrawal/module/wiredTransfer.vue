<template lang="pug">
  .wiredTransfer
    .user-operation
      el-form(:model="wiredTransfer", :rules="wiredTransferRules", ref="wiredTransfer", label-width="140px" label-position='left')
        el-form-item(prop="account")
          template(slot="label")
            span.inline-label(v-text="renderData.tradeAccount", v-ellipsis-title="")
          b-select.input-long-type1(:placeholder="renderData.pleaseSelect", :model.sync="wiredTransfer.account")
            el-option(v-for="item in items.data", :key="item.accountId", :label="item.accountId", :value="item.accountId")
              .option(@click="getCurrency(item.currency,item.aid)")
                span.left {{item.accountId}}
                span.middle {{item.tradeSystem}}
                span.right {{item.tradeCategory}}
        el-form-item
          template(slot="label")
            span.inline-label(v-text="renderData.currency", v-ellipsis-title="")
          .currency(v-text="wiredTransfer.currency")
        el-form-item(prop="amount")
          template(slot="label")
            span.inline-label(v-text="renderData.withdrawalAmount", v-ellipsis-title="")
          el-input.input-long-type2(:placeholder="renderData.pleaseEnter", v-model="wiredTransfer.amount", :disabled="wiredTransfer.account === ''")
            i(slot="prefix" class="el-input__icon margin-left-5") {{wiredTransfer.currencySymbol}}
        el-form-item(prop="selectCard" style="margin-bottom: 0 !important;")
          template(slot="label")
            span.inline-label(v-text="renderData.selectCard", v-ellipsis-title="")
          b-select.input-long-type1(:placeholder="renderData.pleaseSelect", :model.sync="wiredTransfer.selectCard")
            el-option(v-for="item in items1", :key="item.cardNo", :label="item.cardNo", :value="item.cardNo")
              .option2(@click="getBankList(item)")
                span {{item.cardNo}}
        .manageCard.input-long-type1
          span.theme-color-A.theme-color-darkenA10-hover(@click="changAdd") {{renderData.manageCard}}
        el-form-item(prop="bank.cardNo", :rules="wiredTransferRules.cardNo")
          template(slot="label")
            span.inline-label(v-text="renderData.internationalAccountNo", v-ellipsis-title="")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="wiredTransfer.bank.cardNo")
        el-form-item(prop="bank.name", :rules="wiredTransferRules.name")
          template(slot="label")
            span(v-text="renderData.name")
            el-tooltip(class="item" effect="dark", :content="renderData.nameInfo" placement="top")
              b-icon.theme-color-lightenD10.theme-color-A-hover.margin-left-10(iconName='info')
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="wiredTransfer.bank.name")
        el-form-item(prop="bank.bankName", :rules="wiredTransferRules.bankName")
          template(slot="label")
            span.inline-label(v-text="renderData.bankName", v-ellipsis-title="")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="wiredTransfer.bank.bankName")
        el-form-item(prop="bank.swiftcode", :rules="wiredTransferRules.bankCod")
          template(slot="label")
            span.inline-label(v-ellipsis-title="") Swift Code
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="wiredTransfer.bank.swiftcode")
        el-form-item(prop="bank.bankBranch", :rules="wiredTransferRules.bankBranch")
          template(slot="label")
            span.inline-label(v-text="renderData.bankBranch", v-ellipsis-title="")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="wiredTransfer.bank.bankBranch")
        el-form-item(prop="bank.bankAddress", :rules="wiredTransferRules.bankAddress")
          template(slot="label")
            span.inline-label(v-text="renderData.bankAddress", v-ellipsis-title="")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="wiredTransfer.bank.bankAddress")
        el-form-item(prop="bank.phoneNo", :rules="wiredTransferRules.phoneNo")
          template(slot="label")
            span(v-text="renderData.phoneNo")
            el-tooltip(class="item" effect="dark", :content="renderData.phoneNoInfo" placement="top")
              b-icon.theme-color-lightenD10.theme-color-A-hover.margin-left-10(iconName='info')
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="wiredTransfer.bank.phoneNo")
        el-form-item(prop="bank.email", :rules="wiredTransferRules.email")
          template(slot="label")
            span(v-text="renderData.email")
            el-tooltip(class="item" effect="dark", :content="renderData.emailInfo" placement="top")
              b-icon.theme-color-lightenD10.theme-color-A-hover.margin-left-10(iconName='info')
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="wiredTransfer.bank.email")
        el-form-item(prop="bank.address", :rules="wiredTransferRules.address")
          template(slot="label")
            span(v-text="renderData.address")
            el-tooltip(class="item" effect="dark", :content="renderData.AddressInfo" placement="top")
              b-icon.theme-color-lightenD10.theme-color-A-hover.margin-left-10(iconName='info')
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="wiredTransfer.bank.address")
        el-form-item(:label="renderData.message", prop="bank.message")
          template(slot="label")
            span(v-text="renderData.message", v-ellipsis-title="")
          b-input.input-long-type1(:placeholder="renderData.pleaseEnter", :model.sync="wiredTransfer.bank.message")
        el-form-item
          b-checkbox.theme-color-darkenC15(:model.sync="wiredTransfer.checked") {{renderData.saveCard}}
        el-form-item(:prop="'others.' + item.key", :rules="getRules(item)" v-for="(item, idx) in formItemList", :key="idx")
          span(slot="label") {{item.type=='clause'?'':item.label}}
          b-form-item.input-long-type1(:model.sync="wiredTransfer.others[item.key]", :item="item", @change="itemChange", :disabled="disabled", :renderData="renderData")
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
    name: 'wiredTransfer',
    data () {
      var _this = this
      var str = _this.renderData.amountError
      return {
        description: {
          attention: _this.renderData.withdrawalWiredTransferAttention,
          text: _this.renderData.withdrawalWiredTransferText
        },
        messageMap: {
          number: _this.renderData.numberMessage,
          longText: _this.renderData.longTextMessage,
          required: _this.renderData.requiredMessage
        },
        selectCard: '',
        disabled: false,
        formItemList: {},
        fundHistoryUrl: '',
        wiredTransfer: {
          account: '',
          currency: '-',
          currencySymbol: '-',
          amount: '',
          bank: {
            cardNo: '',
            name: '',
            bankName: '',
            swiftcode: '',
            bankBranch: '',
            bankAddress: '',
            phoneNo: '',
            email: '',
            message: '',
            address: ''
          },
          others: {},
          checked: false
        },
        wiredTransferRules: {
          account: [{required: true, message: _this.renderData.pleaseSelect, trigger: 'change'}],
          amount: [{required: true, message: _this.renderData.pleaseEnter, trigger: 'blur'},
            {
              validator: function (rule, value, callback) {
                var params = {
                  currency: _this.wiredTransfer.currency,
                  type: 'withdraw',
                  method: 'wiredTransfer',
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
          name: [{required: true, message: _this.renderData.nameInfo, trigger: 'blur'},
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
          bankCod: [{required: true, message: _this.renderData.pleaseEnter, trigger: 'blur'},
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
          bankAddress: [{required: true, message: _this.renderData.pleaseEnterBankAddress, trigger: 'blur'},
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
          phoneNo: [{required: true, message: _this.renderData.pleaseEnterPhoneNo, trigger: 'blur'},
            {
              regex: utils.constants.phoneReg,
              message: _this.renderData.textLength32,
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
          email: [{required: true, message: _this.renderData.pleaseEnterEmail, trigger: 'blur'},
            {
              regex: utils.constants.length48Limit,
              message: _this.renderData.textLength48,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              regex: utils.constants.emailReg,
              message: _this.renderData.emailInfo,
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
          address: [{required: true, message: _this.renderData.pleaseEnterAddress, trigger: 'blur'},
            {
              regex: utils.constants.length96Limit,
              message: _this.renderData.textLength96,
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
          message: [
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
        items1: [],
        thisAid: '',
        thisId: ''
      }
    },
    methods: {
      itemChange (item, val) {
        console.log('itemChange item, val', item, val)
        var beDependentItems = []
        beDependentItems.forEach(elm => {
          this.wiredTransfer.others[elm.key] = ''
          this.itemChange(elm, '')
          if (!elm.params) {
            this.$set(elm, 'params', {[item.key]: this.wiredTransfer.others[item.key]})
          } else {
            elm.params[item.key] = this.wiredTransfer.others[item.key]
          }
        })
      },
      getRules (item) {
        var rules = (item.rules || []).map(rule => {
          var res = utils.constants.ruleMap[rule]
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
          this.formItemList = data.withdrawal[1].data.customField
          this.formItemList.forEach(formItem => {
            formItem.value = this.wiredTransfer.others[formItem.key]
          })
          console.log(this.formItemList)
        })
      },
      getBankList (item) {
        this.wiredTransfer.bank.cardNo = item.cardNo
        this.wiredTransfer.bank.name = item.name
        this.wiredTransfer.bank.bankName = item.bankName
        this.wiredTransfer.bank.bankBranch = item.bankBranch
        this.wiredTransfer.bank.bankAddress = item.bankAddress
        this.wiredTransfer.bank.address = item.address
        this.wiredTransfer.bank.phoneNo = item.phoneNo
        this.wiredTransfer.bank.email = item.email
        this.wiredTransfer.bank.swiftcode = item.swiftcode
        this.thisId = item.bankcard_id
        console.log(this.wiredTransfer)
      },
      getCurrency (Currency, aid) {
        this.wiredTransfer.currency = Currency
        this.thisAid = aid
        for (let i = 0; i < currencySymbol.length; i++) {
          if (currencySymbol[i].key === Currency) {
            this.wiredTransfer.currencySymbol = currencySymbol[i].label
            break
          }
        }
      },
      changAdd () {
        this.$emit('stashData', this.wiredTransfer)
        this.$emit('changeShow2')
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
        this.wiredTransfer.aid = this.thisAid
        this.wiredTransfer.bankcard_id = this.thisId
        var params = this.wiredTransfer
        this.$refs['wiredTransfer'].validate((valid) => {
          if (valid) {
            service.submit_wiredTransfer(params).then(data => {
              console.log(data)
//              this.getComponentUrl()
            })
          } else {
            return false
          }
        })
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      list: {
        required: true
      },
      transObj: {
        required: true,
        type: Object
      }
    },
    async mounted () {
      var _this = this
      this.items = _this.list
      this.wiredTransfer = _this.transObj
      this.getFundSetting()
      service.get_bankcard_wiredTransfer_select({}).then(data => {
        console.log(data)
        this.items1 = data
      })
    },
    components: {
      legalDescription,
      BInput,
      BIcon,
      BButton,
      BSelect,
      BFormItem,
      BCheckbox
    }
  }
</script>

<style lang="less">
</style>
