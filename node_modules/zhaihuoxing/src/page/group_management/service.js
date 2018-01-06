import { fetch } from 'common/js/Utils'

export default {
  getGroupList (params) {
    var url = '/api/rbac/group/get_all_group'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [{
    //       'group_name': 'group1', // string 用户组名称
    //       'gid': 'dac5d5a48d4b11e7a8640050568b0264',
    //       'children': []
    //     }]
    //   })
    // })
  },
  getParentSelect (params) {
    var url = '/api/rbac/group/get_move_group_select'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
    //       {
    //         val: '父级1',
    //         key: '100001'
    //       },
    //       {
    //         val: '父级2',
    //         key: '100002'
    //       }
    //     ]
    //   })
    // })
  },
  editGroup (params) {
    var url = '/api/rbac/group/edit_group'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '编辑分组成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  moveGroup (params) {
    var url = '/api/rbac/group/move_group'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '移动成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  newSubgroup (params) {
    var url = '/api/rbac/group/add_group'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '操作成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  deleteGroup (params) {
    var url = '/api/rbac/group/delete_group'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '操作成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  getGroupInfo (params) {
    var url = '/api/rbac/group/get_group_info'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'group_name': 'group1', // string 用户组名称
    //     'description': 'yonghuzu', // string 描述
    //     'group_role': [
    //       {
    //         'role_name': 'role1',
    //         'rid': '457875f08d4c11e7a8640050568b0264'
    //       },
    //       {
    //         'role_name': 'role2',
    //         'rid': '457875f08d4c11e7a8640050568b0264'
    //       }
    //     ], // array<string> 用户组角色列表
    //     'parent': {
    //       'gid': '457875f08d4c11e7a8640050568b0264', // string 父级用户组id, 无父级为none
    //       'group_name': 'group3'
    //     },
    //     'role_max': '10', // string 角色数上限，无上限为max
    //     'group_user': [
    //       {
    //         'user_name': 'user1',
    //         'uid': '457875f08d4c11e7a8640050568b0264',
    //         'email': 'user1@qq.com',
    //         'first_name': 'cui',
    //         'middle_name': 'jin',
    //         'last_name': 'tao',
    //         'phone': '18888888888'
    //       },
    //       {
    //         'user_name': 'user2',
    //         'uid': '457875f08d4c11e7a8640050568b0264',
    //         'email': 'user2@qq.com',
    //         'first_name': 'cui',
    //         'middle_name': 'jin',
    //         'last_name': 'tao',
    //         'phone': '18888888888'
    //       }
    //     ] // array<string> 用户组用户列表
    //   })
    // })
  },
  toPreviewRole (params) {
    var url = '/api/rbac/group/to_preview_role'
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

  getSelectedRoleList (params) {
    // z todo 获取当前用户组的角色
    var url = '/api/rbac/user/get_role_select'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'data': [
    //       {
    //         'rid': 'dac5d5a48d4b11e7a8640050568b0264',
    //         'role_name': 'role1',
    //         'description': 'miaoshu'
    //       }
    //     ]
    //   })
    // })
  },

  getRoleListForConnect (params) {
    var url = '/api/rbac/role/get_role_list_for_connect'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'data': [
    //       {
    //         'rid': 'dac5d5a48d4b11e7a8640050568b0264',
    //         'role_name': 'role1',
    //         'description': 'miaoshu'
    //       }
    //     ]
    //   })
    // })
  },
  editUserFun (params) {
    var url = '/api/rbac/group/link_user'
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
  linkRole (params) {
    var url = '/api/rbac/group/link_role'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'failed',
    //           'title': '网络错误，保存失败！'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  disconnectRole (params) {
    var url = '/api/rbac/group/link_role'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'failed',
    //           'title': '网络错误，保存失败！'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  }
}
