import { fetch } from 'common/js/Utils'

export default {
  applyMt4 (params) {
    var url = '/api/public/apply_mt4' // z todo url
    console.log('url', url, params, typeof fetch)
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({
          'type': 'operateComponents',
          'target_components': {
            'popup': {
              'action': 'show',
              'params': {
                'confirm': '提示',
                'headText': '提示',
                'text': '邮件已发送',
                'toUrl': '/signin',
                'type': 'success'
              }
            }
          }
        })
      }, 1000)
    })
    // return fetch(url, params)
  },
  getLeverageList (params) {
    var url = '/api/public/apply_mt4' // z todo url
    console.log('url', url, params, typeof fetch)
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({
          're': '200',
          'data': [{key: '0', val: 'test'}]
        })
      }, 1000)
    })
    // return fetch(url, params)
  },
  getCurrencyList (params) {
    var url = '/api/public/apply_mt4' // z todo url
    console.log('url', url, params, typeof fetch)
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({
          're': '200',
          'data': [{key: '0', val: 'test'}]
        })
      }, 1000)
    })
    // return fetch(url, params)
  },
  getAccountTypeList (params) {
    var url = '/api/public/apply_mt4' // z todo url
    console.log('url', url, params, typeof fetch)
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({
          're': '200',
          'data': [{key: '0', val: 'test'}]
        })
      }, 1000)
    })
    // return fetch(url, params)
  }
}
