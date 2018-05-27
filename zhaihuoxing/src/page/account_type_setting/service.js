import { fetch } from '../../common/js/Utils'

export default {
  getAccountSettingList (params) {
    var url = '/api/resource/accountset/get_account_setting_list'
    return fetch(url, params)
  },
  getAccountTypeList (params) {
    var url = '/api/resource/accountset/get_account_type_list'
    return fetch(url, params)
  },
  addAccountType (params) {
    var url = '/api/resource/accountset/add_account_type'
    return fetch(url, params)
  },
  editAccountType (params) {
    var url = '/api/resource/accountset/edit_account_type'
    return fetch(url, params)
  },
  deleteAccountType (params) {
    var url = '/api/resource/accountset/delete_account_type'
    return fetch(url, params)
  }
}
