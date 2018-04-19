<template lang="pug">
  #make-fund
    h1.theme-color-darkenC15 {{renderData.applyTradeAccount}}
    .split-line.theme-bg-D
    .apply-mt4 {{renderData.applyMt4}}
    el-form(label-width="140px", label-position="left", ref="accountForm", :model="form", :rules="accountRules",).form
      el-form-item(prop="account_type")
        span.inline-label(slot="label", v-ellipsis-title="") {{renderData.accountType}}
        b-select(:placeholder="renderData.pleaseSelect", :model.sync="form.account_type", @change="accountTypeChange()")
          el-option(v-for="accountTypeItem in accountTypeList", :key="accountTypeItem.key", :label="accountTypeItem.label", :value="accountTypeItem.key")
      el-form-item(prop="currency")
        span.inline-label(slot="label", v-ellipsis-title="") {{renderData.currency}}
        b-select(:placeholder="renderData.pleaseSelect", :model.sync="form.currency", :disabled="!form.account_type")
          el-option(v-for="currencyItem in currencyList", :key="currencyItem", :lable="currencyItem", :value="currencyItem")
      el-form-item(prop="leverage")
        span.inline-label(slot="label", v-ellipsis-title="") {{renderData.leverage}}
        b-select(:placeholder="renderData.pleaseSelect", :model.sync="form.leverage", :disabled="!form.account_type")
          el-option(v-for="leverageItem in leverageList", :key="leverageItem", :lable="leverageItem", :value="leverageItem")
      el-form-item(prop="vcode").vcode-input-box
        span.inline-label.theme-color-C(slot="label", v-ellipsis-title="") {{renderData.vCode}}
        b-input(:model.sync="form.vcode", :placeholder="renderData.pleaseEnter", @keyup.enter.native="signUp").vcode-input
        img.vcode-img(v-loading='vcodeLoading', :src="vcodeSrc", @click="changeVcode")
      .change-vcode-box.clear-float
        .right-vcode-box.pointer(@click="changeVcode")
          span.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer {{renderData.changeVCode}}
    .button-box
      b-button(@click="toTwo").pre-btn {{renderData.back}}
      b-button(type="primary", @click="signUp").next-btn {{renderData.submit}}


</template>
<script>
  let renderData = window.renderData.components.signup.signup_auth
  import BSelect from 'components/BSelect'
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import vcodeMixin from 'common/js/vcodeMixin'
  import utils from 'common/js/Utils'
  import service from '../service'

  export default {
    name: 'make-fund',
    mixins: [vcodeMixin],
    data () {
      var _this = this
      return {
        renderData: renderData,
        accountTypeSelect: [],
        accountTypeList: [],
        currencyList: [],
        leverageList: [],
        onceSingUp: false,
        accountRules: {
          account_type: [{
            required: true,
            message: renderData.required,
            trigger: 'submit'
          }],
          currency: [{
            required: true,
            message: renderData.required,
            trigger: 'submit'
          }],
          leverage: [{
            required: true,
            message: renderData.required,
            trigger: 'submit'
          }],
          vcode: [
            {
              required: true,
              message: renderData.required,
              trigger: 'blur'
            },
            {
              test: function (val) {
                var params = {
                  vcode: val,
                  vcode_key: _this.vcode_key
                }
                return service.vcodeValidate(params).then(({re}) => {
                  if (re === '200') {
                    return true
                  } else if (re === '402') {
                    return false
                  } else {
                    return true
                  }
                })
              },
              validator: utils.validator.validate,
              message: renderData.vCodeError,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    props: {
      stepOne: {
        required: true,
        type: Object
      },
      stepTwo: {
        required: true,
        type: Object
      },
      form: {
        required: true,
        type: Object
      },
      visible: {
        required: true,
        type: Object
      },
      forThree: {
        required: true,
        type: Object
      }
    },
    components: {
      BSelect,
      BInput,
      BButton
    },
    methods: {
      signUp () {
        this.$refs['accountForm'].validate(valid => {
          if (valid) {
            this.onceSingUp = true
            var userDetails = {}
            this.forThree.originKeys.forEach(key => {
              userDetails[key] = {}
            })
            this.forThree.userTypeInfo.forEach(info => {
              userDetails[info.originKey][info.key] = this.stepTwo[info.key]
            })
            this.forThree.clauseFiles.forEach(clause => {
              userDetails[clause.originKey][clause.key] = true
            })
            console.log('user details', userDetails)
            var params = {
              vcode: this.form.vcode,
              vcode_key: this.vcode_key,
              account_info: {
                account_type: {
                  key: this.form.account_type,
                  label: this.form.account_label
                },
                aid: this.form.aid,
                cid: this.form.cid,
                currency: this.form.currency,
                leverage: this.form.leverage
              }
            }
            params.user_info = this.stepOne
            params.user_detail = userDetails
            console.log('signup params', params)
            service.signUp(params).then(res => {
              console.log('res', res)
            })
          }
        })
      },
      toTwo () {
        if (this.onceSingUp) {
          document.location.reload()
        } else {
          this.visible.page = 'improve_info'
        }
      },
      accountTypeChange () {
        var idx = 0
        this.form.currency = ''
        this.form.leverage = ''
        this.accountTypeList.forEach(accountType => {
          if (accountType.key === this.form.accountType) {
            idx = accountType.index
          }
        })
        this.form.aid = this.accountTypeSelect[idx].aid
        this.form.cid = this.accountTypeSelect[idx].cid
        this.form.account_label = this.accountTypeList[idx].label
        this.currencyList = this.accountTypeSelect[idx].currency
        this.leverageList = this.accountTypeSelect[idx].leverage
      },
      getTradeAccountSelect () {
        service.getTradeAccountSelect({}).then(res => {
          this.accountTypeSelect = res
          if (res.length) {
            var idx = 0
            res.forEach(accountType => {
              var tmp = {
                index: idx
              }
              tmp = Object.assign(tmp, accountType.type_name)
              this.accountTypeList.push(tmp)
            })
          }
        })
      }
    },
    async mounted () {
      await this.getTradeAccountSelect()
    }
  }
</script>
<style lang="less" scoped>
  #make-fund {
    max-height: 70%;
    h1 {
      text-align: center;
      font-size: 36px;
    }
    .split-line {
      height: 1px;
      width: 100%;
      margin-top: 30px;
    }
    .apply-mt4 {
      margin-top: 20px;
      font-size: 16px;
      line-height: 19px;
    }
    .form {
      margin-top: 20px;
      max-height: 65%;
      min-height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
      .el-form-item {
        margin-bottom: 15px;
      }
      .vcode-input-box {
        .vcode-input {
          width: 72%;
        }
        .vcode-img {
          margin-left: 3%;
          width: 25%;
          height: 40px;
          vertical-align: top;
          border-radius: 4px;
        }
      }
      .change-vcode-box {
        margin-bottom: 10px;
        span {
          float: right;
        }
      }
    }
    .button-box {
      padding-top: 30px;
      padding-left: 140px;
    }
  }
</style>
