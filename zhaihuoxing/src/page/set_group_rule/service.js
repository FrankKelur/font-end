import { fetch } from '../../common/js/Utils'

export default {
  getSetGroupDataList (params) {
    var url = '/api/resource/accountset/get_set_group_data_list'
    return fetch(url, params)
  },
  getSetGroupRuleList (params) {
    var url = '/api/resource/accountset/get_set_group_rule_list'
    return fetch(url, params)
  },
  getAccountTypeSelect (params) {
    var url = '/api/resource/accountset/get_accountType_select'
    return fetch(url, params)
  },
  getAccountCategorySelect (params) {
    var url = '/api/resource/accountset/get_accountCategory_select'
    return fetch(url, params)
  },
  addSetGroupData (params) {
    var url = '/api/resource/accountset/add_set_group_data'
    return fetch(url, params)
  },
  addSetGroupRule (params) {
    var url = '/api/resource/accountset/add_set_group_rule'
    return fetch(url, params)
  },
  deleteSetGroupRule (params) {
    var url = '/api/resource/accountset/delete_set_group_rule'
    return fetch(url, params)
  },
  deleteSetGroupData (params) {
    var url = '/api/resource/accountset/delete_set_group_data'
    return fetch(url, params)
  }
}
