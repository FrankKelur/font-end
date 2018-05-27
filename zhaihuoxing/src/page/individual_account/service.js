import { fetch } from '../../common/js/Utils'

export default {
  getTradeAccountList (params) {
    var url = '/api/resource/account/get_tradeAccount_list'
    return fetch(url, params)
  },
  getTradeAccountSelect (params) {
    var url = '/api/resource/account/get_tradeAccount_select'
    return fetch(url, params)
  },
  createTradeAccount (params) {
    var url = '/api/resource/account/create_tradeAccount'
    return fetch(url, params)
  },
  getComponentUrl (params) {
    var url = '/api/public/get_component_url'
    return fetch(url, params)
  },
  accountForgetPasswdEmail (params) {
    var url = '/api/resource/account/account_forget_passwd_email'
    return fetch(url, params)
  },
  modifyTradeAccountPassword (params) {
    var url = '/api/resource/account/modify_tradeAccount_password'
    return fetch(url, params)
  }
}
