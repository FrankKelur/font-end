import {fetch} from 'common/js/Utils'

export default {
  getFromAccountSelect (params) {
    var url = '/api/resource/funding/get_fromAccount_select'
    return fetch(url, params)
  },
  accountTransferSelf (params) {
    var url = '/api/resource/funding/account_transfer_self'
    return fetch(url, params)
  },
  getFundSetting (params) {
    var url = '/api/resource/config/get_fund_management_setting_list'
    return fetch(url, params)
  }
}
