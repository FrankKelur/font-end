import { fetch } from '../../common/js/Utils'

export default {
  addStatus (params) {
    var url = '/api/resource/config/add_fund_management_status'
    return fetch(url, params)
  },
  getFundStatus (params) {
    var url = '/api/resource/config/get_fund_management_status'
    return fetch(url, params)
  },
  deleteStatus (params) {
    var url = '/api/resource/config/delete_fund_management_status'
    return fetch(url, params)
  },
  getFundSetting (params) {
    var url = '/api/resource/config/get_fund_management_setting_list'
    return fetch(url, params)
  },
  saveform (params) {
    var url = '/api/resource/config/edit_fund_management_setting'
    return fetch(url, params)
  },
  editTransferSetting (params) {
    var url = '/api/resource/funding/edit_transfer_setting'
    return fetch(url, params)
  },
  uploadCDN (params) {
    var url = '/upload-cdn'
    return fetch(url, params)
  }
}
