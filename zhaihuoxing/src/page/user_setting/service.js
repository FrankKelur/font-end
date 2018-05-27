import { fetch } from 'common/js/Utils'

export default {
  getUserSetting (params) {
    var url = '/api/resource/config/get_user_setting'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: {
    //       email_status: {
    //         '0': {
    //           label: '已激活'
    //         },
    //         '1': {
    //           label: '未激活'
    //         }
    //       },
    //       status: {
    //         '0': {
    //           label: '已激活'
    //         },
    //         '1': {
    //           label: '未激活'
    //         },
    //         '2': {
    //           label: '已删除'
    //         },
    //         '3': {
    //           label: '禁用',
    //           custom: true
    //         }
    //       },
    //       create_email_status: '1',
    //       register_email_status: '0',
    //       create_user_status: '0',
    //       register_user_status: '1',
    //       ask_user_change_pwd: false,
    //       password_re: '/^[\\s\\S]{8,25}$/',
    //       user_re: '/^[a-zA-Z0-9]{5,15}$/'
    //     }
    //   })
    // })
  },
  saveUserSetting (params) {
    var url = '/api/resource/config/edit_user_setting'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'failed',
    //           'title': '网络错误，删除失败!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  addStatus (params) {
    var url = '/api/resource/config/add_user_setting_status'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200'
    //   })
    // })
  },
  deleteStatus (params) {
    var url = '/api/resource/config/delete_user_setting_status'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200'
    //   })
    // })
  }
}

