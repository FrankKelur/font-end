import {fetch} from 'common/js/Utils'

export default {
  getContactMethods (params) {
    var url = '/api/resource/header/get_contact_methods'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: ['qq', 'skype']
    //   })
    // })
  },
  getUserInfo (params) {
    var url = '/api/resource/header/get_user_info'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: {
    //       name: 'Zhai',
    //       status: {
    //         val: '0',
    //         label: '未激活'
    //       }
    //     }
    //   })
    // })
  },
  getStatus (params) {
    var url = '/api/resource/header/get_basic_display_set'
    console.log(url, params)
    return fetch(url, params)
  },
  getMessages (params) {
    var url = '/api/resource/header/get_messages'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: ['这是第一条信息。。。。。', '这是第二条信息xxxxx']
    //   })
    // })
  },
  signOut (params) {
    var url = '/api/resource/header/sign_out'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'params': {
    //       toUrl: '/pages/signin'
    //     },
    //     'type': 'redirect'
    //   })
    // })
  },
  clickMore (params) {
    var url = '/api/resource/header/click_more'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'params': {
    //       toUrl: '/pages/signin'
    //     },
    //     'type': 'redirect'
    //   })
    // })
  },
  toActivate (params = {}) {
    var url = '/api/resource/header/to_activate'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'params': {
    //       toUrl: '/pages/signin'
    //     },
    //     'type': 'redirect'
    //   })
    // })
  }
}
