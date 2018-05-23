import {fetch} from 'common/js/Utils'

export default {
  getTradeAccountSelect (params) {
    var url = '/api/resource/funding/get_trade_accounts_select'
    return fetch(url, params)
  },
  getUserEmailForAccount (params) {
    var url = '/api/resource/funding/get_user_email_for_account'
    return fetch(url, params)
  },
  getFundSetting (params) {
    var url = '/api/resource/config/get_fund_management_setting_list'
    return fetch(url, params)
  },
  // 入金接口
  depositUnionpay (params) {
    var url = '/api/resource/funding/deposit_unionpay'
    return fetch(url, params)
  },
  depositWeixin (params) {
    var url = '/api/resource/funding/deposit_weixin'
    return fetch(url, params)
  },
  depositWiredTransfer (params) {
    var url = '/api/resource/funding/deposit_wired_transfer'
    return fetch(url, params)
  },
  depositEpayments (params) {
    var url = '/api/resource/funding/deposit_epayments'
    return fetch(url, params)
  },
  depositNeteller (params) {
    var url = '/api/resource/funding/deposit_neteller'
    return fetch(url, params)
  },
  depositSkrill (params) {
    var url = '/api/resource/funding/deposit_skrill'
    return fetch(url, params)
  },
  getBankmanageList (params) {
    var url = '/api/resource/channel/get_manager_bank_list'
    return fetch(url, params)
  },
  // 检查金额
  checkCurrencyValue: function (params) {
    var url = '/api/resource/funding/check_currency_value'
    return fetch(url, params)
  }
}
