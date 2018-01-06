import { fetch } from 'common/js/Utils'

export default {
  getPageList (params) {
    var url = '/api/resource/config/get_page_list'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
    //       {
    //         label: '用户管理',
    //         key: '/pages/user_management'
    //       },
    //       {
    //         label: '角色管理',
    //         key: '/pages/role_management'
    //       }
    //     ]
    //   })
    // })
  },
  getProfileList (params) {
    var url = '/api/resource/config/get_user_info_setting_list'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
    //       {
    //         name: 'user_profile',
    //         uuid: '1001'
    //       },
    //       {
    //         name: 'company_profile',
    //         uuid: '1002'
    //       }
    //     ]
    //   })
    // })
  },
  getGroupList (params) {
    var url = '/api/rbac/user/get_group_select'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'data': [
    //       {
    //         'key': 'key1', // string key
    //         'val': 'val1' // string value
    //       },
    //       {
    //         'key': 'key2',
    //         'val': 'val2'
    //       }
    //     ]
    //   })
    // })
  },
  getTypeList (params) {
    var url = '/api/resource/config/get_user_type_setting_list'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
    //       {
    //         name: 'user_type',
    //         uuid: '1001'
    //       },
    //       {
    //         name: 'company_type',
    //         uuid: '1002'
    //       }
    //     ]
    //   })
    // })
  },
  getTypeInfo (params) {
    var url = '/api/resource/config/get_user_type_setting'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'data': {
    //       'name': 'userType',
    //       'group': 'group1',
    //       'user_detail': 'company_profile',
    //       'sign_in_url': '/pages/user_management'
    //     }
    //   })
    // })
  },
  saveType (params) {
    // {
    //   "uuid":"",
    //   "name":"",
    //   "data":{"group":"xxxxxxid",
    //   "user_type":"xxxxxid"}
    // }
    var url = '/api/resource/config/edit_user_type_setting'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'type': 'operateComponents',
    //     're': '200',
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '操作成功！'
    //         }
    //       }
    //     }
    //   })
    // })
  },
  checkTypeName (params) {
    var url = '/api/resource/config/check_user_type_setting_name'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: false
    //   })
    // })
  },
  deleteType (params) {
    var url = '/api/resource/config/delete_user_type_setting'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'type': 'operateComponents',
    //     're': '200',
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '操作成功！'
    //         }
    //       }
    //     }
    //   })
    // })
  }
}

