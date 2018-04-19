<template lang="pug">
  .trade-account
    b-title.amt-more-left-in(:title="renderData.individualAccount")
    h1.amt-more-left-in {{renderData.individualAccountNotes}}
    el-collapse.amt-more-left-in(v-model="activeName" v-if="comAuth.individual_account_card_individual.headerCols.length!==0")
      el-collapse-item(:name="renderData.TradeAccount")
        template(slot="title")
          .head-left
            span {{renderData.TradeAccount}}
            span.balance {{renderData.TotalBalance}}:
          .head-right.theme-color-A
            div.currency-span(v-if="JSON.stringify(searchData.balance_total) === '{}'")
              | --
            div.currency-span(v-for="(currencyValue, currencyKey) in searchData.balance_total", :key="currencyKey" v-bind:class="{'theme-color-G': currencyValue==='--' || parseInt(currencyValue)<=0}")
              i.currencyIcon {{currencySymbol(currencyKey)}}
              i.currencyValue {{currencyValue}}
              i.currencyKey {{currencyKey}}
        .account-box.theme-box-shadow-D(v-for="(item, index) in searchData.data", :key="index")
          .box-header.theme-color-H(v-bind:class="{'theme-bg-D': item.accountStatus==='inactivate','theme-bg-A': item.accountStatus==='activate'}")
            .text-left
              el-tooltip(class="item" effect="dark", :content="renderData.inactiveNotes" placement="top" v-if="item.accountStatus==='inactivate'")
                span.sign.margin-right-10.theme-bg-G {{renderData.inactive}}
              span.sign.margin-right-10(v-bind:class="{'theme-bg-lightenC32': item.accountStatus==='inactivate','theme-bg-darkenA10': item.accountStatus==='activate'}") {{item.tradeSystem}}
              span {{item.accountId}}
            .text-right
              el-tooltip(class="item" effect="dark", :content="renderData.readOnlyNotes" placement="top" v-if="item.accountStatus==='activate' && item.readonly==='on'")
                i.el-icon-view.margin-right-10
              el-dropdown(v-if="comAuth.individual_account_card_individual.individualAccountSeeTradeHistory || comAuth.individual_account_card_individual.individualAccountChangePwd || comAuth.individual_account_card_individual.individualAccountDeposit")
                i.el-icon-more.theme-color-H
                el-dropdown-menu(slot="dropdown")
                  el-dropdown-item(@click.native="menuClick(item, 'tradeHistory')" v-if="comAuth.individual_account_card_individual.individualAccountSeeTradeHistory") {{renderData.individualAccountSeeTradeHistory}}
                  el-dropdown-item(@click.native="menuClick(item, 'modPwd')" v-if="comAuth.individual_account_card_individual.individualAccountChangePwd") {{renderData.individualAccountChangePwd.label}}
                  el-dropdown-item(@click.native="menuClick(item, 'deposit')" v-if="comAuth.individual_account_card_individual.individualAccountDeposit") {{renderData.individualAccountDeposit}}
          .box-content.theme-bg-H.theme-color-C
            p.margin-bottom-10(v-if="comAuth.individual_account_card_individual.individualAccountBalance")
              span {{renderData.individualAccountBalance}}:
              span.margin-left-10(v-bind:class="{'theme-color-A': parseInt(item.balance)>0, 'theme-color-G': item.balance==='--' || parseInt(item.balance)<=0}" style="font-size: 20px;") {{currencySymbol(item.currency)}}
              span(v-bind:class="{'theme-color-A': parseInt(item.balance)>0, 'theme-color-G': item.balance==='--' || parseInt(item.balance)<=0}" style="font-size: 20px;") {{item.balance}}
            p.margin-bottom-10(v-if="comAuth.individual_account_card_individual.individualAccountCredit")
              span {{renderData.individualAccountCredit}}:
              span.margin-left-10(v-bind:class="{'theme-color-A': parseInt(item.credit)>0, 'theme-color-G': item.credit==='--' || parseInt(item.credit)<=0}") {{currencySymbol(item.currency)}}
              span(v-bind:class="{'theme-color-A': parseInt(item.credit)>0, 'theme-color-G': item.credit==='--' || parseInt(item.credit)<=0}") {{item.credit}}
            p.margin-bottom-5(v-if="comAuth.individual_account_card_individual.individualAccountAccountType")
              span {{renderData.individualAccountAccountType}}:
              span {{item.type_name}}
            p.margin-bottom-5(v-if="comAuth.individual_account_card_individual.individualAccountCurrency")
              span {{renderData.individualAccountCurrency}}:
              span {{item.currency}}
            p.margin-bottom-5(v-if="comAuth.individual_account_card_individual.individualAccountLeverage")
              span {{renderData.individualAccountLeverage}}:
              span {{item.leverage}}
            // pug模板 p标签不允许内嵌div
            p.last-p(v-if="comAuth.individual_account_card_individual.individualAccountServer")
              span {{renderData.individualAccountServer}}:
              span {{item.server}}
            .commissionPip
              el-tooltip(class="item" effect="dark", :content="renderData.tagCommission" placement="top" v-if="item.commission!=='0'")
                span.sign.theme-bg-D.theme-color-H {{item.commission}}
              el-tooltip(class="item" effect="dark", :content="renderData.tagPip" placement="top" v-if="item.pipValue!=='0pips'")
                span.sign.theme-bg-D.theme-color-H {{item.pipValue}}
        .add-form(v-if="comAuth.individual_account_card_individual.individualAccountNewAccount")
          b-button(type="primary", @click="createAccount") {{renderData.individualAccountNewAccount.label}}

    el-dialog(:visible.sync="modPwdModel", :title="renderData.individualAccountChangePwd.label" width="30%" v-if="comAuth.individual_account_card_individual.individualAccountChangePwd", :before-close="dialogClose")
      el-form(label-width="140px" label-position='left' ref="form", :model="form", :rules="rules")
        el-form-item(label-width="0")
          el-radio(v-model="pwdType" label="0") {{renderData.individualAccountChangePwd.masterPwd}}
          el-radio(v-model="pwdType" label="1") {{renderData.individualAccountChangePwd.investorPwd}}
        el-form-item(prop="newPwd")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.individualAccountChangePwd.newPwd", v-ellipsis-title="")
          b-input(type='password', :model.sync="form.newPwd", :placeholder="renderData.individualAccountChangePwd.pleaseEnter")
        el-form-item(prop="surePwd")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.individualAccountChangePwd.confirmPwd", v-ellipsis-title="")
          b-input(type='password', :model.sync="form.surePwd", :placeholder="renderData.individualAccountChangePwd.pleaseEnter")
        el-form-item(prop="emailCode")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.individualAccountChangePwd.emailCode", v-ellipsis-title="")
          el-row
            el-col(:span="14")
              b-input(:model.sync="form.emailCode", :placeholder="renderData.individualAccountChangePwd.pleaseEnter")
            el-col(:span="1")
              | &nbsp;
            el-col(:span="9")
              b-button(type="primary" style="width:100%", @click="sendCode", :disabled="timeCountDown>0")
                span(v-if="timeCountDown>0") {{timeCountDown}}S {{renderData.emailCodeCanResetSend}}
                span(v-if="timeCountDown===0") {{renderData.sendEmailCode}}
      span(slot="footer" class="dialog-footer")
        b-button(@click="cancelModPwd") {{renderData.individualAccountChangePwd.cancel}}
        b-button(type="primary", @click="sureModPwd") {{renderData.individualAccountChangePwd.confirm}}
</template>

<script>
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BTitle from 'components/BTitle'
  import utils from 'common/js/Utils'
  import muguObj from 'common/js/muguObj'
  import currencySymbol from 'common/js/currency'
  import service from '../service'

  export default {
    data () {
      muguObj.handleHeaderColsAuth(window.renderData.components.individual_account.individual_account_card_individual)
      var _this = this
      var comAuth = window.renderData.components.individual_account
      var renderData = Object.assign({}, comAuth.individual_account_auth, comAuth.individual_account_card_individual)
      var pleaseEnter = ''
      var pwdRule = ''
      var twoPwdNotMatch = ''
      if (renderData.individualAccountChangePwd) {
        pleaseEnter = renderData.individualAccountChangePwd.pleaseEnter
        pwdRule = renderData.individualAccountChangePwd.pwdRule
        twoPwdNotMatch = renderData.individualAccountChangePwd.twoPwdNotMatch
      }
      return {
        comAuth: comAuth,
        renderData: renderData,
        activeName: [renderData.TradeAccount],
        searchData: {
          balance_total: {},
          data: []
        },
        tradeHistoryUrl: '',
        modPwdModel: false,
        accountId: '',
        pwdType: '0',
        timeCountDown: 0,
        form: {
          newPwd: '',
          surePwd: '',
          emailCode: ''
        },
        rules: {
          newPwd: [
            { required: true, message: pleaseEnter, trigger: 'blur, change' },
            { regex: utils.constants.mainInvestPwd, message: pwdRule, validator: utils.validator.validate, trigger: 'blur, change' }
          ],
          surePwd: [
            { required: true, message: pleaseEnter, trigger: 'blur, change' },
            { test: function (value) { return value === _this.form.newPwd }, validator: utils.validator.validate, message: twoPwdNotMatch, trigger: 'blur, change' }
          ],
          emailCode: [
            { required: true, message: pleaseEnter, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      currencySymbol (key) {
        for (let i = 0; i < currencySymbol.length; i++) {
          if (currencySymbol[i].key === key) {
            return currencySymbol[i].label
          }
        }
      },
      menuClick (data, item) {
        switch (item) {
          case 'tradeHistory':
            if (this.tradeHistoryUrl !== '') {
              sessionStorage.setItem('trade_history_id', data.accountId)
              location.pathname = this.tradeHistoryUrl
            } else {
              this.$message({
                message: this.renderData.cantFindTradeHistoryUrl,
                type: 'info'
              })
            }
            break
          case 'modPwd':
            if (data.accountStatus === 'inactivate') {
              this.$confirm(this.renderData.placeGoActivate, this.renderData.inactivateTool, {
                confirmButtonText: this.renderData.inactivateSure,
                cancelButtonText: this.renderData.inactivateCancle,
                type: 'warning'
              }).then(() => {
              }).catch(() => {
              })
              return
            }
            this.accountId = data.account_id
            this.pwdType = '0'
            this.form = {
              newPwd: '',
              surePwd: '',
              emailCode: ''
            }
            this.modPwdModel = true
            break
          case 'deposit':
            this.$message({
              message: '该功能暂未开通',
              type: 'info'
            })
            break
        }
      },
      sendCode () {
        if (this.timeCountDown > 0) {
          return
        }
        var params = {
          account_id: this.accountId,
          type: parseInt(this.pwdType)
        }
        service.accountForgetPasswdEmail(params).then(data => {
          if (data.re === '200') {
            this.$message({
              message: this.renderData.individualAccountChangePwd.successSendEmail,
              type: 'success'
            })
            this.timeCountDown = 20
            sessionStorage.setItem('emailCode', this.timeCountDown)
            this.emailResetSend()
          } else {
            this.$message({
              message: this.renderData.individualAccountChangePwd.netErrorSendEmail,
              type: 'error'
            })
          }
        })
      },
      emailResetSend () {
        var vm = this
        function timeCount () {
          setTimeout(function () {
            vm.timeCountDown--
            if (vm.timeCountDown === 0) {
              sessionStorage.setItem('emailCode', vm.timeCountDown)
              return
            }
            timeCount()
          }, 1000)
        }
        timeCount()
      },
      sureModPwd () {
        let vm = this
        vm.$refs['form'].validate(function (valid) {
          if (valid) {
            var params = {
              account_id: vm.accountId,
              type: parseInt(vm.pwdType),
              pwd_new: vm.form.newPwd,
              pwd_confirm: vm.form.surePwd,
              email_code: vm.form.emailCode
            }
            service.modifyTradeAccountPassword(params).then(data => {
              if (data.re === '200') {
                vm.modPwdModel = false
                vm.pwdType = '0'
                vm.form = {
                  newPwd: '',
                  surePwd: '',
                  emailCode: ''
                }
                vm.$message({
                  message: vm.renderData.individualAccountChangePwd.changeSucceed,
                  type: 'success'
                })
              } else {
                vm.$message({
                  message: vm.renderData.individualAccountChangePwd.netErrorChangeFail,
                  type: 'error'
                })
              }
            })
          }
        })
      },
      cancelModPwd () {
        this.$refs['form'].clearValidate()
        this.modPwdModel = false
      },
      dialogClose () {
        this.$refs['form'].clearValidate()
        this.modPwdModel = false
      },
      createAccount () {
        this.$emit('changePage', 'createAccount')
      },
      init () {
        let vm = this
        service.getTradeAccountList({}).then(data => {
          vm.searchData.balance_total = data.balance_total
          vm.searchData.data = data.data
        })
      },
      getOnePage () {
        var parmas = {
          component_name: 'trade_history'
        }
        service.getComponentUrl(parmas).then(data => {
          if (data.page_url) {
            this.tradeHistoryUrl = data.page_url
          }
        })
      }
    },
    created () {
      if (sessionStorage.getItem('emailCode')) {
        this.timeCountDown = parseInt(sessionStorage.getItem('emailCode'))
        if (this.timeCountDown === 0) {
          return
        }
        this.emailResetSend()
      }
    },
    mounted () {
      this.init()
      this.getOnePage()
      let vm = this
      window.onbeforeunload = function () {
        sessionStorage.setItem('emailCode', vm.timeCountDown)
      }
    },
    destroyed () {
      // 页面切换
      sessionStorage.setItem('emailCode', this.timeCountDown)
    },
    components: {
      BInput,
      BButton,
      BTitle
    }
  }
</script>

<style lang="less">
  .trade-account{
    .el-collapse-item__header{
      height: auto !important;
      &:after{
        display: block;
        content: " ";
        clear: both;
      }
      .head-left{
        float: left;
      }
      .head-right{
        float: left;
        width: 70%;
        margin-left: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
      }
    }
    .balance{
      margin-left: 40px;
      font-size: 12px;
    }
    .currency-span {
      float: left;
      line-height: 25px;
    }
    .currency-span:not(:last-child){
      margin-right: 20px;
    }
    .currencyIcon{
      font-size: 14px;
    }
    .currencyValue{
      margin-left: 5px;
      font-size: 14px;
    }
    .currencyKey{
      margin-left: 5px;
      font-size: 12px;
    }
    .account-box{
      float: left;
      width: 31.6%;
      margin-left: 1.3%;
      margin-bottom: 10px;
      .box-header{
        padding: 6px 16px;
        font-size: 14px;
        .text-left{
          display: inline-block;
          width: 77%;
          vertical-align: middle;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .text-right{
          display: inline-block;
          width: 22%;
          vertical-align: middle;
          i{
            cursor: pointer;
          }
        }
      }
      .box-content{
        position: relative;
        padding: 10px 16px;
        font-size: 14px;
        .last-p{
          width: 55%;
          white-space: nowrap;
        }
        p span:last-child{
          margin-left: 10px;
        }
        .commissionPip{
          position: absolute;
          right: 16px;
          bottom: 10px;
          font-size: 12px;
          white-space: nowrap;
          >.sign:first-child{
            margin-right: 6px;
          }
        }
      }
    }
    .add-form{
      content: " ";
      display: block;
      clear: both;
      margin-left: 1.3%;
      padding-top: 6px;
    }
    .sign{
      display: inline-block;
      padding: 1px 6px;
      border-radius: 2px;
    }
    .el-collapse-item__content:after{
      content: " ";
      display: block;
      clear: both;
    }
    h1{
      padding-left: 1.2%;
      margin-bottom: 15px;
      font-size: 14px;
    }
    .el-dialog{
      min-width: 500px;
    }
  }
</style>
