import {fetch} from 'common/js/Utils'

export default {
  getAllAuth (params) {
    var url = '/api/rbac/role/get_all_auth'
    return fetch(url, params)
  },
  getTradeAccountSelect (params) {
    var url = '/api/resource/funding/get_trade_accounts_select'
    return fetch(url, params)
  },
  getComponentUrl (params) {
    var url = '/api/public/get_component_url'
    return fetch(url, params)
  },
  getFundSetting (params) {
    var url = '/api/resource/config/get_fund_management_setting_list'
    return fetch(url, params)
  },
  addBankcard (params) {
    var url = '/api/resource/funding/add_bankcard'
    return fetch(url, params)
  },
  getCardlist (params) {
    var url = '/api/resource/funding/get_bankcard_list'
    return fetch(url, params)
  },
  deleteCardlist (params) {
    var url = '/api/resource/funding/delete_bankcard'
    return fetch(url, params)
  },
  editCardlist (params) {
    var url = '/api/resource/funding/edit_bankcard'
    return fetch(url, params)
  },
  only (params) {
    var url = '/api/resource/funding/check_cardNo'
    return fetch(url, params)
  },
  get_bankcard_unionpay_select (params) {
    var url = '/api/resource/funding/get_bankcard_unionpay_select'
    return fetch(url, params)
  },
  get_bankcard_wiredTransfer_select (params) {
    var url = '/api/resource/funding/get_bankcard_wiredtransfer_select'
    return fetch(url, params)
  },
  submit_wiredTransfer (params) {
    var url = '/api/resource/funding/withdrawal_wired_transfer'
    return fetch(url, params)
  },
  submit_unionpay (params) {
    var url = '/api/resource/funding/withdrawal_unionpay'
    return fetch(url, params)
  },
  getUserEmailForAccount (params) {
    var url = '/api/resource/funding/get_user_email_for_account'
    return fetch(url, params)
  },
  withdrawalEpayments (params) {
    var url = '/api/resource/funding/withdrawal_epayments'
    return fetch(url, params)
  },
  withdrawalNeteller (params) {
    var url = '/api/resource/funding/withdrawal_neteller'
    return fetch(url, params)
  },
  withdrawalSkrill (params) {
    var url = '/api/resource/funding/withdrawal_skrill'
    return fetch(url, params)
  },
  // 检查金额
  checkCurrencyValue: function (params) {
    var url = '/api/resource/funding/check_currency_value'
    return fetch(url, params)
  }
}
