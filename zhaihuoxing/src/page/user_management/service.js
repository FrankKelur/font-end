import { fetch } from '../../common/js/Utils'

export default {
  getPwdExp (params) {
    var url = '/api/resource/config/get_usersetting_password_re'
    console.log('params', url, params)
    return fetch(url, params)
  },
  addUser (params) {
    var url = '/api/rbac/user/add_user'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '保存成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  changePassword (params) {
    var url = '/api/rbac/user/change_password'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '修改密码成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  checkRole (params) {
    var url = '/api/rbac/user/check_role'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '保存成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  deleteUser (params) {
    var url = '/api/rbac/user/delete_user'
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
  getRoleInfo (params) {
    var url = '/api/rbac/role/get_role_info'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'role_name': 'role1', // string 角色名称
    //     'description': 'juese', // string 描述
    //     'from_where': 'group1', // string 权限归属
    //     'interface_auth_data': {
    //       'user_management': [
    //         {'name': 'new_user', 'disable': false},
    //         {'name': 'basic_info', 'disable': false}
    //       ], // array<string> 组件选择的权限(所有打勾的权限名称)
    //       'group_management': [
    //         {'name': 'new_group', 'disable': false},
    //         {'name': 'edit_group', 'disable': false}
    //       ],
    //       'role_management': [
    //         {'name': 'new_role', 'disable': false},
    //         {'name': 'search_role', 'disable': false}
    //       ]
    //     }, // object 界面访问权限
    //     'source_auth_data': {
    //       'user_resource': {
    //         'all_data': 'all_data', // string 查看全部数据
    //         /*
    //         all_data映射：
    //         查看全部数据: all_data
    //         查看单个数据: one_data
    //         */
    //         'level_data': {
    //           'group_user': {
    //             'level': 'now_and_down', // string 访问模式
    //             /*
    //             访问模式映射：
    //             被关联用户以及下属：now_and_down
    //             节点以下: node
    //             */
    //             'node': [] // array<string> 节点名称
    //           }, // object<string> 用户组用户
    //           'member_user': {
    //             'level': 'node',
    //             'node': [
    //               {
    //                 'id': 'abf77dea8d4b11e7a8640050568b0264',
    //                 'name': 'node1'
    //               },
    //               {
    //                 'id': 'abf77dea8d4b11e7a8640050568b0264',
    //                 'name': 'node2'
    //               }
    //             ]
    //           },
    //           'other_user': {
    //             'level': 'all',
    //             'node': []
    //           }
    //         }
    //       }, // object 用户资源
    //       'user_group_resource': {
    //         'all_data': 'one_data',
    //         'level_data': {
    //           'level': 'node',
    //           'node': [
    //             {
    //               'id': 'abf77dea8d4b11e7a8640050568b0264',
    //               'name': 'group1'
    //             },
    //             {
    //               'id': 'abf77dea8d4b11e7a8640050568b0264',
    //               'name': 'group2'
    //             }
    //           ]
    //         }
    //       }, // object 用户组资源
    //       'role_resource': {
    //         'all_data': 'all_data',
    //         'level_data': {
    //           'level': 'now_and_down',
    //           'node': []
    //         }
    //       } // object 角色资源
    //     }
    //   })
    // })
  },
  linkGroup (params) {
    var url = '/api/rbac/user/link_group'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '关联分组成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })/api/rbac/role/get_role_info
  },
  cancelLinkGroup (params) {
    var url = '/api/rbac/user/cancel_link_group'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '关联分组成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  getAutoPassword (params) {
    var url = '/api/rbac/user/get_auto_password'
    console.log('params, url', params, url)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'password': 'Asd123TQwRrr'
    //   })
    // })
  },
  getUserTypeSelect (params) {
    var url = '/api/rbac/user/get_user_type_select'
    console.log('params, url', params, url)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'password': 'Asd123TQwRrr'
    //   })
    // })
  },
  getGroupSelect (params) {
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
  getGroupListForCreate (params) {
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
  getRoleSelect (params) {
    var url = '/api/rbac/role/get_role_select'
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
  linkRole (params, origin) {
    var url = '/api/rbac/user/link_role'
    if (origin === 'group') {
      url = '/api/rbac/group/link_role'
    }
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
  disconnectRole (params, origin) {
    var url = '/api/rbac/user/cancel_link_role'
    if (origin === 'group') {
      url = '/api/rbac/group/cancel_link_role'
    }
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
  getRoleMaxInfo (params) {
    var url = '/api/rbac/user/get_role_max_info'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'role_max': '10', // string 当前用户角色上限
    //     'role_max_limit': '20' // string 用户角色上限最大值
    //   })
    // })
  },
  setRoleMax (params) {
    var url = '/api/rbac/user/set_role_max'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '设置成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  getRoleForCreate (params) {
    var url = '/api/rbac/user/get_role_list_for_edit'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'data': [
    //       {
    //         'id': 'dac5d5a48d4b11e7a8640050568b0264',
    //         'name': 'role1',
    //         'description': ''
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

  getSelectedRoleList (params) {
    var url = '/api/rbac/group/get_group_roles'
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
  getUserInfo (params) {
    var url = '/api/rbac/user/get_user_info'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'uid': 'dac5d5a48d4b11e7a8640050568b0264', // string 用户id
    //     'user_name': 'gudabai', // string 用户名
    //     'email': 'gudabai@qq.com', // string 邮箱
    //     'user_type': '1', // string 用户类型
    //     'user_role': [{rid: '1001', group_name: 'manager'}, {rid: '1002', group_name: 'other'}], // string 用户角色
    //     'user_group': [{gid: '1001', group_name: 'group1'}], // string 所属用户组
    //     'creator': 'boss', // string 创建人
    //     'create_time': '2017-12-12', // string 创建时间
    //     'max_role': '3', // string 角色数上限
    //     'status': '1', // string 状态
    //     'first_name': '', // string FirstName
    //     'middle_name': '', // string MidName
    //     'last_name': '' // string LastName
    //   })
    // })
  },
  toggleUserStatus (params = {}, url = '/api/rbac/user/toggle_user_status') {
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200'
    //   })
    // })
  },
  changeEmail (params = {}, url = '/api/rbac/user/change_email') {
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200'
    //   })
    // })
  },
  emailUnique (params = {}, url = '/api/public/check_unique') {
    return fetch(url, params)
  }
}

