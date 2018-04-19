import { fetch } from 'common/js/Utils'

export default {
  vcodeValidate (params) {
    var url = '/api/resource/base/check_vcode'
    return fetch(url, params)
  },
  signUp (params) {
    var url = '/api/resource/user/user_sign_up'
    return fetch(url, params)
  },
  getFormFieldMap (params) {
    var url = '/api/public/get_component_resource'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   setTimeout(function () {
    //     resolve({
    //       data: {
    //         'personal': {
    //           label: '{{个人}}',
    //           fields: [{
    //             label: '{{firstName}}',
    //             field: 'first_name',
    //             type: 'input',
    //             placeholder: '{{firstName}}',
    //             required: true,
    //             requiredMessage: '{{requiredMessage}}', // 请输入
    //             regex: /\S{1,100}/,
    //             regexError: '{{regexError}}' // 不符合规则
    //           }, {
    //             field: 'middle_name',
    //             label: '{{middleName}}',
    //             type: 'input',
    //             placeholder: '{{middleName}}',
    //             requiredMessage: '{{requiredMessage}}', // 请输入
    //             regexError: '{{regexError}}', // 不符合规则
    //             regex: /\S{1,100}/
    //           }, {
    //             field: 'last_name',
    //             label: '{{lastName}}',
    //             type: 'input',
    //             placeholder: '{{lastName}}',
    //             required: true,
    //             requiredMessage: '{{requiredMessage}}', // 请输入
    //             regexError: '{{regexError}}', // 不符合规则
    //             regex: /\S{1,100}/
    //           }, {
    //             field: 'nation',
    //             label: '{{nation}}',
    //             type: 'select',
    //             required: true,
    //             requiredMessage: '{{pleaseSelect}}', // 请输入
    //             placeholder: '{{pleaseSelect}}',
    //             dataSource: []
    //           }, {
    //             field: 'phone',
    //             label: '{{phone}}',
    //             required: true,
    //             type: 'input',
    //             placeholder: '{{phone}}',
    //             requiredMessage: '{{requiredMessage}}', // 请输入
    //             regexError: '{{regexError}}', // 不符合规则
    //             regex: /\S{1,100}/
    //           }]
    //         },
    //         'company': {
    //           label: '{{公司}}',
    //           fields: [{
    //             field: 'company_name',
    //             label: '{{companyName}}',
    //             type: 'input',
    //             required: true,
    //             placeholder: '{{companyName}}',
    //             requiredMessage: '{{requiredMessage}}', // 请输入
    //             regexError: '{{regexError}}', // 不符合规则
    //             regex: /\S{1,100}/
    //           }, {
    //             field: 'rTime',
    //             label: '{{rTime}}',
    //             required: true,
    //             type: 'datetime',
    //             placeholder: '{{rTime}}',
    //             requiredMessage: '{{pleaseSelect}}', // 请输入
    //             format: 'yyyy-MM-dd'
    //           }, {
    //             field: 'phone',
    //             label: '{{phone}}',
    //             required: true,
    //             type: 'input',
    //             placeholder: '{{phone}}',
    //             requiredMessage: '{{requiredMessage}}', // 请输入
    //             regexError: '{{regexError}}', // 不符合规则
    //             regex: /\S{1,100}/
    //           }]
    //         }
    //       }
    //     })
    //   }, 1000)
    // })
  },
  getUserTypeList (params) {
    var url = '/api/resource/user/get_user_type_list'
    return fetch(url, params)
  },
  getSignupResource (params) {
    var url = '/api/resource/user/get_signup_resource'
    return fetch(url, params)
  },
  getImproveInfo (params) {
    var url = '/api/resource/user/get_improve_info'
    return fetch(url, params)
  },
  returnSignIn (params) {
    var url = '/api/resource/user/return_sign_in'
    return fetch(url, params)
  },
  getUsernameRule (params) {
    var url = '/api/resource/user/get_username_rule'
    return fetch(url, params)
  },
  checkMatch (params) {
    var url = '/api/resource/user/check_match'
    return fetch(url, params)
  },
  getTradeAccountSelect (params) {
    var url = '/api/resource/account/get_tradeAccount_select'
    return fetch(url, params)
  }
}
