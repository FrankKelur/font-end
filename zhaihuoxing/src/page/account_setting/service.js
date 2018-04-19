import { fetch } from '../../common/js/Utils'

export default {
  getAllLeverage (params) {
    var url = '/api/resource/accountset/get_all_leverage'
    return fetch(url, params)
  },
  getAllCurrency (params) {
    var url = '/api/resource/accountset/get_all_currency'
    return fetch(url, params)
  },
  getAccountSettingList (params) {
    var url = '/api/resource/accountset/get_account_setting_list'
    return fetch(url, params)
  },
  editAccountSetting (params) {
    var url = '/api/resource/accountset/edit_account_setting'
    return fetch(url, params)
  }
}
