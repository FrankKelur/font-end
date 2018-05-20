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
<<<<<<< HEAD
  sendEmail (params) {
    var url = '/api/password/send_forget_email'
    return fetch(url, params)
=======
  checkMatch (params) {
    var url = '/api/resource/user/check_match'
    return fetch(url, params)
  },
  sendActivateEmail (params) {
    var url = '/api/resource/user/emailbox_activate_email'
    return fetch(url, params)
  },
  sendEmail (params) {
    var url = '/api/password/send_forget_email'
    return fetch(url, params)
  },
  forgetPwdEmail (params) {
    var url = '/api/resource/user/forget_passwd_email'
    return fetch(url, params)
  },
  verifyEmail (params) {
    var url = '/api/resource/user/emailbox_verify'
    return fetch(url, params)
  },
  returnSignIn (params) {
    var url = '/api/resource/user/return_sign_in'
    return fetch(url, params)
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  }
}
