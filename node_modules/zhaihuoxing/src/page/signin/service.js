import { fetch } from 'common/js/Utils'

export default {
  vcodeValidate (params) {
    var url = '/api/resource/base/check_vcode'
    return fetch(url, params)
  },
  getVcode (params) {
    var url = '/api/resource/base/get_vcode'
    return fetch(url, params)
  },
  signIn (params) {
    var url = '/api/resource/user/sign_in'
    return fetch(url, params)
  },
  sendEmail (params) {
    var url = '/api/password/send_forget_email'
    return fetch(url, params)
  }
}
