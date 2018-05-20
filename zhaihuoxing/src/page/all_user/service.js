import { fetch } from '../../common/js/Utils'

export default {
  getAmountSetting (params) {
    var url = '/api/resource/config/get_amount_setting'
    return fetch(url, params)
  },
  getFundAmountSetting (params) {
    var url = '/api/resource/config/get_fund_amount_setting'
    return fetch(url, params)
  },
  getUserInfo (params) {
    var url = '/api/resource/user_profile/get_user_info'
    return fetch(url, params)
  },
  getUserInfoSetting (params) {
    var url = '/api/resource/user_profile/get_user_info_setting'
    return fetch(url, params)
  },
  setPersonalInfo (params) {
    var url = '/api/resource/user_profile/set_user_info'
    return fetch(url, params)
  },
  checkPwd (params) {
    var url = '/api/resource/account/check_account_pwd'
    return fetch(url, params)
  },
  deleteAccount (params) {
    var url = '/api/resource/account/del_user_account'
    return fetch(url, params)
  },
  editAccount (params) {
    var url = '/api/resource/account/get_tradeAccount_select'
    return fetch(url, params)
  },
  confirmEdit (params) {
    var url = '/api/resource/account/modify_account_info'
    return fetch(url, params)
  }

}
