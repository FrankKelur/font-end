import {fetch} from 'common/js/Utils'

export default {
  getBasicInfo (params) {
    var url = '/api/resource/basic_setting/get_basic_setting_info'
    return fetch(url, params)
  },
  checkUnique (params) {
    var url = '/api/resource/basic_setting/check_companyName'
    return fetch(url, params).then(res => {
      return !!res.re
    }).catch(() => {
      return false
    })
  },
  saveData (params) {
    var url = '/api/resource/basic_setting/save_basic_setting_info'
    console.log('params', url, params)
    return fetch(url, params)
  },
  getTimeList (params) {
    var url = '/api/resource/basic_setting/get_timezone_list'
    console.log('params', url, params)
    return fetch(url, params)
  },
  getPageList (params) {
    var url = '/api/resource/config/get_page_list'
    console.log('params', url, params)
    return fetch(url, params)
  },
  getlogoutPageList (params) {
    var url = '/api/resource/basic_setting/get_setting_page_list'
    console.log('params', url, params)
    return fetch(url, params)
  }
}
