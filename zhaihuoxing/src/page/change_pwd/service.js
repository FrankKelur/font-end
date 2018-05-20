import {fetch} from 'common/js/Utils'

export default {
  getPasswdRule (params) {
    var url = '/api/resource/user/get_passwd_rule'
    return fetch(url, params)
  },
  changePwd (params) {
    var url = '/api/resource/user/change_passwd'
    return fetch(url, params)
  },
  vcodeValidate (params) {
    var url = '/api/resource/base/check_vcode'
    return fetch(url, params)
  },
  returnSignIn (params) {
    var url = '/api/resource/user/return_sign_in'
    return fetch(url, params)
  }
}
