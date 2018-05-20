<template lang="pug">
  .fund-setting
    el-collapse(v-model="activeName")
      el-collapse-item(:title="renderData.unionPay", name="unionPay" v-if="hasMethod('unionPay')")
        el-form(labelWidth="140px", labelPosition='left', :model="data", ref="unionPayForm", :rules="unionPayRules")
          el-row(v-for="(currency, idx) in setting.currency", :key="idx")
            el-form-item.InputMin(:prop='type + "_unionPay_" + currency + "_min_amount"')
              template(slot="label")
                span.theme-color-C.inline-label(v-text="currency.toUpperCase()", v-ellipsis-title="")
              b-input(:placeholder="renderData.minAmount", :model.sync="data[type + '_unionPay_' + currency + '_min_amount']")
            el-form-item.InputMax(label="", :prop='type + "_unionPay_" + currency + "_max_amount"')
              b-input(:placeholder="renderData.maxAmount", :model.sync="data[type + '_unionPay_' + currency + '_max_amount']")
      el-collapse-item(:title="renderData.wiredTransfer", name="wiredTransfer" v-if="hasMethod('wiredTransfer')")
        el-form(labelWidth="140px", labelPosition='left', :model="data", ref="wiredTransferForm", :rules="unionPayRules")
          el-row(v-for="(currency, idx) in setting.currency", :key="idx")
            el-form-item.InputMin(:prop='type + "_wiredTransfer_" + currency + "_min_amount"')
              template(slot="label")
                span.theme-color-C.inline-label(v-text="currency.toUpperCase()", v-ellipsis-title="")
              b-input(:placeholder="renderData.minAmount", :model.sync="data[type + '_wiredTransfer_' + currency + '_min_amount']")
            el-form-item.InputMax(label="", :prop='type + "_wiredTransfer_" + currency + "_max_amount"')
              b-input(:placeholder="renderData.maxAmount", :model.sync="data[type + '_wiredTransfer_' + currency + '_max_amount']")

      el-collapse-item(:title="renderData.epayments", name="epayments" v-if="hasMethod('epayments')")
        el-form(labelWidth="140px", labelPosition='left', :model="data", ref="epaymentsForm", :rules="unionPayRules")
          el-row(v-for="(currency, idx) in setting.currency", :key="idx")
            el-form-item.InputMin(:prop='type + "_epayments_" + currency + "_min_amount"')
              template(slot="label")
                span.theme-color-C.inline-label(v-text="currency.toUpperCase()", v-ellipsis-title="")
              b-input(:placeholder="renderData.minAmount", :model.sync="data[type + '_epayments_' + currency + '_min_amount']")
            el-form-item.InputMax(label="", :prop='type + "_epayments_" + currency + "_max_amount"')
              b-input(:placeholder="renderData.maxAmount", :model.sync="data[type + '_epayments_' + currency + '_max_amount']")

      el-collapse-item(:title="renderData.neteller", name="neteller" v-if="hasMethod('neteller')")
        el-form(labelWidth="140px", labelPosition='left', :model="data", ref="netellerForm", :rules="unionPayRules")
          el-row(v-for="(currency, idx) in setting.currency", :key="idx")
            el-form-item.InputMin(:prop='type + "_neteller_" + currency + "_min_amount"')
              template(slot="label")
                span.theme-color-C.inline-label(v-text="currency.toUpperCase()", v-ellipsis-title="")
              b-input(:placeholder="renderData.minAmount", :model.sync="data[type + '_neteller_' + currency + '_min_amount']")
            el-form-item.InputMax(label="", :prop='type + "_neteller_" + currency + "_max_amount"')
              b-input(:placeholder="renderData.maxAmount", :model.sync="data[type + '_neteller_' + currency + '_max_amount']")

      el-collapse-item(:title="renderData.skrill", name="skrill" v-if="hasMethod('skrill')")
        el-form(labelWidth="140px", labelPosition='left', :model="data", ref="skrillForm", :rules="unionPayRules")
          el-row(v-for="(currency, idx) in setting.currency", :key="idx")
            el-form-item.InputMin(:prop='type + "_skrill_" + currency + "_min_amount"')
              template(slot="label")
                span.theme-color-C.inline-label(v-text="currency.toUpperCase()", v-ellipsis-title="")
              b-input(:placeholder="renderData.minAmount", :model.sync="data[type + '_skrill_' + currency + '_min_amount']")
            el-form-item.InputMax(label="", :prop='type + "_skrill_" + currency + "_max_amount"')
              b-input(:placeholder="renderData.maxAmount", :model.sync="data[type + '_skrill_' + currency + '_max_amount']")

      el-collapse-item(:title="renderData.wechat", name="wechat" v-if="hasMethod('wechat')")
        el-form(labelWidth="140px", labelPosition='left' ref="wechatForm", :rules="wechatRules", :inline="false", :model="weChatForm")
          //el-row(v-for="(currency, idx) in setting.currency", :key="idx")
          template(v-for="(currency, idx) in setting.currency")
            el-form-item
              template(slot="label")
                span.theme-color-C.inline-label(v-text="currency.toUpperCase()", v-ellipsis-title="")
              b-tag(@close="deleteAmount(idx, data[type+'_wechat_'+currency])", v-for="(amount, idx) in data[type+'_wechat_'+currency]",  :key="idx", size="medium")
                span.tag-group-txt(v-ellipsis-title="", slot="content") {{amount}}
              b-button(type="primary", @click="editItem(currency)", v-if="editingItem!=currency") {{renderData.add}}
            el-form-item.input-container(v-if="editingItem==currency" prop="newAmount")
              b-input(:placeholder="renderData.pleaseEnter", :model.sync="weChatForm.newAmount")
              b-icon.theme-color-C.theme-color-G-hover.delete(iconName='message_failure', @click.native="cancelEditing")
              b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addAmount(data[type+'_wechat_'+currency])")

</template>

<script>
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BTag from 'components/BTag'
  import { constants, validator } from 'common/js/Utils'

  export default {
    name: 'fund-setting',
    data () {
      var _this = this
      return {
        activeName: 'unionPay',
        editingItem: null,
        weChatForm: {
          newAmount: ''
        },
        wechatRules: {
          newAmount: [
            {
              validator: validator.validate,
              regex: constants.floatNumberRule,
              message: _this.renderData.onlyFloatNumber,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    computed: {
      unionPayRules () {
        var res = {}
        var _this = this
        this.setting[this.type].forEach(methodKey => {
          this.setting.currency.forEach(currencyKey => {
            var key = this.type + '_' + methodKey + '_' + currencyKey
            res[key + '_min_amount'] = [
              {
                regex: constants.floatNumberRule,
                validator: validator.validate,
                message: this.renderData.onlyFloatNumber,
                trigger: 'blur'
              },
              {
                validator: validator.validate,
                message: this.renderData.minCannotBiggerThanMax,
                test (val) {
                  // 验证成功之后，reset一下
                  var targetKey = _this.type + '_' + methodKey + '_' + currencyKey + '_max_amount'
                  if (val === '' && _this.data[targetKey] === '') {
                    return true
                  }
                  var valid = parseFloat(val || 0) <= parseFloat(_this.data[targetKey] || Infinity)
//                  if (valid) { _this.$refs['unionPayForm'].validateField(targetKey) } // z todo 相互调用验证会stack overflow
                  return valid
                },
                trigger: 'blur'
              }
            ]
            res[key + '_max_amount'] = [
              {
                regex: constants.floatNumberRule,
                validator: validator.validate,
                message: this.renderData.onlyFloatNumber,
                trigger: 'blur'
              },
              {
                validator: validator.validate,
                message: this.renderData.maxCannotSmallerThanMin,
                test (val) {
                  var targetKey = _this.type + '_' + methodKey + '_' + currencyKey + '_min_amount'
                  if (val === '' && _this.data[targetKey] === '') {
                    return true
                  }
                  var valid = parseFloat(val || 0) >= parseFloat(_this.data[targetKey] || Infinity)
//                  if (valid) { _this.$refs['unionPayForm'].validateField(targetKey) }
                  return valid
                },
                trigger: 'blur'
              }
            ]
          })
        })
        return res
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      data: {
        type: Object,
        required: true
      },
      setting: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    methods: {
      getRules (ruleObj, currency, key) {
        var rules = []
        try {
          rules = ruleObj[currency][key]
        } catch (ex) { console.log(ex) }
        return rules
      },
      cancelEditing () {
        this.editingItem = null
      },
      hasMethod (method) {
        return this.setting[this.type].includes(method)
      },
      hasCurrency (currency) {
        return this.setting.currency && this.setting.currency.includes(currency)
      },
      editItem (item) {
        this.weChatForm.newAmount = ''
        this.editingItem = item
      },
      deleteAmount (idx, list) {
        list.splice(idx, 1)
      },
      addAmount (list) {
        this.$refs['wechatForm'].validate(valid => {
          if (valid) {
            list.push(this.weChatForm.newAmount)
            this.weChatForm.newAmount = ''
            this.editingItem = null
          }
        })
      },
      clearValidate () {
        this.$refs['unionPayForm'] && this.$refs['unionPayForm'].clearValidate()
        this.$refs['wiredTransferForm'] && this.$refs['wiredTransferForm'].clearValidate()
        this.$refs['wechatForm'] && this.$refs['wechatForm'].clearValidate()
        this.$refs['epaymentsForm'] && this.$refs['epaymentsForm'].clearValidate()
        this.$refs['netellerForm'] && this.$refs['netellerForm'].clearValidate()
        this.$refs['skrillForm'] && this.$refs['skrillForm'].clearValidate()
      },
      validate (cb) {
        var res = true
        this.$refs['unionPayForm'] && this.$refs['unionPayForm'].validate(valid => { res = res & valid })
        this.$refs['wiredTransferForm'] && this.$refs['wiredTransferForm'].validate(valid => { res = res & valid })
        this.$refs['wechatForm'] && this.$refs['wechatForm'].validate(valid => { res = res & valid })
        this.$refs['epaymentsForm'] && this.$refs['epaymentsForm'].validate(valid => { res = res & valid })
        this.$refs['netellerForm'] && this.$refs['netellerForm'].validate(valid => { res = res & valid })
        this.$refs['skrillForm'] && this.$refs['skrillForm'].validate(valid => { res = res & valid })
        cb(res)
      }
    },
    components: {
      BTag,
      BInput,
      BIcon,
      BButton
    },
    mounted () {
      console.log('this.data')
      console.log(this.data)
    }
  }
</script>

<style lang="less">
  .fund-setting {
    .el-collapse-item__content {
      padding: 15px 1.2% !important;
    }
    .input-container {
      .b-input {
        width: 30%;
      }
      .b-icon {
        margin-left: 10px;
      }
    }
    .InputMin {
      display: inline-block !important;
      width: 40%;
      vertical-align: top;
    }
    .InputMax {
      display: inline-block !important;
      width: 40%;
      margin-left: -130px;
      vertical-align: top;
    }
  }
</style>
