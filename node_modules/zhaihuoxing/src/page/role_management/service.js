import {fetch} from 'common/js/Utils'

export default {
  getAllAuth (params) {
    var url = '/api/rbac/role/get_all_auth'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve([{
    //     'auth': 'user_management',
    //     'dependentAuths': [],
    //     'canDisabled': false,
    //     'label': '{{userManagement}}',
    //     'children': [{
    //       'auth': 'user_management_new_user',
    //       'dependentAuths': [],
    //       'canDisabled': true,
    //       'label': '{{userManagementNewUser}}',
    //       'children': []
    //     }, {
    //       'auth': 'user_management_search_user',
    //       'dependentAuths': [],
    //       'canDisabled': false,
    //       'label': '{{userManagementSearchUser}}',
    //       'children': [{
    //         'auth': 'user_management_search_uid',
    //         'dependentAuths': ['user_management_list_uid'],
    //         'canDisabled': false,
    //         'label': '{{userManagementSearchUid}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_search_email',
    //         'dependentAuths': ['user_management_list_email'],
    //         'canDisabled': false,
    //         'label': '{{userManagementSearchEmail}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_search_status',
    //         'dependentAuths': ['user_management_list_status'],
    //         'canDisabled': false,
    //         'label': '{{userManagementSearchStatus}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_search_create_time',
    //         'dependentAuths': ['user_management_list_create_time'],
    //         'canDisabled': false,
    //         'label': '{{userManagementSearchCreateTime}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_search_creator',
    //         'dependentAuths': ['user_management_list_creator'],
    //         'canDisabled': false,
    //         'label': '{{userManagementSearchCreator}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_search_user_role',
    //         'dependentAuths': ['user_management_list_user_role'],
    //         'canDisabled': false,
    //         'label': '{{userManagementSearchUserRole}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_search_user_type',
    //         'dependentAuths': ['user_management_list_user_type'],
    //         'canDisabled': false,
    //         'label': '{{userManagementSearchUserType}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_search_user_group',
    //         'dependentAuths': ['user_management_list_user_group'],
    //         'canDisabled': false,
    //         'label': '{{userManagementSearchUserGroup}}',
    //         'children': []
    //       }]
    //     }, {
    //       'auth': 'user_management_list_user',
    //       'dependentAuths': [],
    //       'canDisabled': false,
    //       'label': '{{userManagementListUser}}',
    //       'children': [{
    //         'auth': 'user_management_list_uid',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{userManagementListUid}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_list_email',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{userManagementListEmail}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_list_status',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{userManagementListStatus}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_list_create_time',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{userManagementListCreateTime}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_list_creator',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{userManagementListCreator}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_list_user_role',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{userManagementListUserRole}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_list_user_type',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{userManagementListUserType}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_list_user_group',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{userManagementListUserGroup}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_change_password',
    //         'dependentAuths': [],
    //         'canDisabled': true,
    //         'label': '{{userManagementChangePassword}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_delete_user',
    //         'dependentAuths': [],
    //         'canDisabled': true,
    //         'label': '{{userManagementDeleteUser}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_edit_group',
    //         'dependentAuths': [],
    //         'canDisabled': true,
    //         'label': '{{userManagementEditGroup}}',
    //         'children': []
    //       }, {
    //         'auth': 'user_management_link_role',
    //         'dependentAuths': [],
    //         'canDisabled': true,
    //         'label': '{{userManagementLinkRole}}',
    //         'children': []
    //       }]
    //     }]
    //   }, {
    //     'auth': 'group_management',
    //     'dependentAuths': [],
    //     'canDisabled': false,
    //     'label': '{{groupManagement}}',
    //     'children': [{
    //       'auth': 'group_management_new_group',
    //       'dependentAuths': [],
    //       'canDisabled': true,
    //       'label': '{{groupManagementNewGroup}}',
    //       'children': []
    //     }, {
    //       'auth': 'group_management_move_subgroup',
    //       'dependentAuths': [],
    //       'canDisabled': true,
    //       'label': '{{groupManagementMoveSubgroup}}',
    //       'children': []
    //     }, {
    //       'auth': 'group_management_move_group',
    //       'dependentAuths': ['group_management_edit_move_group'],
    //       'canDisabled': true,
    //       'label': '{{groupManagementMoveGroup}}',
    //       'children': []
    //     }, {
    //       'auth': 'group_management_delete_group',
    //       'dependentAuths': [],
    //       'canDisabled': true,
    //       'label': '{{groupManagementDeleteGroup}}',
    //       'children': []
    //     }, {
    //       'auth': 'group_management_edit_group',
    //       'dependentAuths': [],
    //       'canDisabled': false,
    //       'label': '{{groupManagementEditGroup}}',
    //       'children': []
    //     }, {
    //       'auth': 'group_management_edit_role',
    //       'dependentAuths': [],
    //       'canDisabled': false,
    //       'label': '{{groupManagementEditRole}}',
    //       'children': []
    //     }, {
    //       'auth': 'group_management_edit_member',
    //       'dependentAuths': [],
    //       'canDisabled': false,
    //       'label': '{{groupManagementEditMember}}',
    //       'children': []
    //     }, {
    //       'auth': 'group_management_edit_move_group',
    //       'dependentAuths': ['group_management_move_group'],
    //       'canDisabled': false,
    //       'label': '{{groupManagementEditMoveGroup}}',
    //       'children': []
    //     }, {
    //       'auth': 'group_management_search_group',
    //       'dependentAuths': [],
    //       'canDisabled': false,
    //       'label': '{{groupManagementSearchGroup}}',
    //       'children': [{
    //         'auth': 'group_management_search_group_name',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{groupManagementSearchGroupName}}',
    //         'children': []
    //       }, {
    //         'auth': 'group_management_search_create_time',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{groupManagementSearchCreateTime}}',
    //         'children': []
    //       }, {
    //         'auth': 'group_management_search_creator',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{groupManagementSearchCreator}}',
    //         'children': []
    //       }, {
    //         'auth': 'group_management_search_group_role',
    //         'dependentAuths': ['group_management_edit_role'],
    //         'canDisabled': false,
    //         'label': '{{groupManagementSearchGroupRole}}',
    //         'children': []
    //       }]
    //     }]
    //   }, {
    //     'auth': 'role_management',
    //     'dependentAuths': [],
    //     'canDisabled': false,
    //     'label': '{{roleManagement}}',
    //     'children': [{
    //       'auth': 'role_management_new_role',
    //       'dependentAuths': [],
    //       'canDisabled': true,
    //       'label': '{{roleManagementNewRole}}',
    //       'children': []
    //     }, {
    //       'auth': 'role_management_search_role',
    //       'dependentAuths': [],
    //       'canDisabled': false,
    //       'label': '{{roleManagementSearchRole}}',
    //       'children': [{
    //         'auth': 'role_management_search_role_name',
    //         'dependentAuths': ['role_management_list_role_name'],
    //         'canDisabled': false,
    //         'label': '{{roleManagementSearchRoleName}}',
    //         'children': []
    //       }, {
    //         'auth': 'role_management_search_create_time',
    //         'dependentAuths': ['role_management_list_create_time'],
    //         'canDisabled': false,
    //         'label': '{{roleManagementSearchCreateTime}}',
    //         'children': []
    //       }, {
    //         'auth': 'role_management_search_creator',
    //         'dependentAuths': ['role_management_list_creator'],
    //         'canDisabled': false,
    //         'label': '{{roleManagementSearchCreator}}',
    //         'children': []
    //       }]
    //     }, {
    //       'auth': 'role_management_list_role',
    //       'dependentAuths': [],
    //       'canDisabled': false,
    //       'label': '{{roleManagementListRole}}',
    //       'children': [{
    //         'auth': 'role_management_list_role_name',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{roleManagementListRoleName}}',
    //         'children': []
    //       }, {
    //         'auth': 'role_management_list_create_time',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{roleManagementListCreateTime}}',
    //         'children': []
    //       }, {
    //         'auth': 'role_management_list_creator',
    //         'dependentAuths': [],
    //         'canDisabled': false,
    //         'label': '{{roleManagementListCreator}}',
    //         'children': []
    //       }, {
    //         'auth': 'role_management_link_user',
    //         'dependentAuths': [],
    //         'canDisabled': true,
    //         'label': '{{roleManagementLinkUser}}',
    //         'children': []
    //       }, {
    //         'auth': 'role_management_copy_role',
    //         'dependentAuths': [],
    //         'canDisabled': true,
    //         'label': '{{roleManagementCopyRole}}',
    //         'children': []
    //       }, {
    //         'auth': 'role_management_delete_role',
    //         'dependentAuths': [],
    //         'canDisabled': true,
    //         'label': '{{roleManagementDeleteRole}}',
    //         'children': []
    //       }, {
    //         'auth': 'role_management_manage_auth',
    //         'dependentAuths': [],
    //         'canDisabled': true,
    //         'label': '{{roleManagementManageAuth}}',
    //         'children': []
    //       }, {
    //         'auth': 'role_management_list_edit_time',
    //         'dependentAuths': [],
    //         'canDisabled': true,
    //         'label': '{{roleManagementListEditTime}}',
    //         'children': []
    //       }]
    //     }]
    //   }])
    // })
  },
  setConflict (params) {
    var url = '/api/rbac/role/set_conflict'
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
  deleteRole (params) {
    // {
    //   "rid": "121212343435356345345345354" // string 角色id
    // }
    var url = '/api/rbac/role/delete_role'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '删除角色成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  setSenior (params) {
    // {
    //   "rid": "abf77dea8d4b11e7a8640050568b0264", // string 角色id
    //   "senior_rid": "abf77dea8d4b11e7a8640050568b0264" // string 高级角色id
    // }
    var url = '/api/rbac/role/set_senior'
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
  setBasic (params) {
    // {
    //   "rid": "abf77dea8d4b11e7a8640050568b0264", // string 角色id
    //   "basic_rid": "abf77dea8d4b11e7a8640050568b0264"
    // }
    var url = '/api/rbac/role/set_basic'
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
  addRole (params) {
    // https://docs.mogu61.com.cn/confluence/display/GENERAL/rbac/role-addRole
    var url = '/api/rbac/role/add_role'
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
  editRole (params) {
    // https://docs.mogu61.com.cn/confluence/display/GENERAL/rbac/role-editRole
    var url = '/api/rbac/role/edit_role'
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
  getFromList (params) {
    var url = '/api/rbac/role/get_from_where_select'
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
  getPrioritySelect (params) {
    var url = '/api/audit_process/get_priority_select'
    console.log('url, params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [{
    //       key: 'key1',
    //       val: 'val1'
    //     }]
    //   })
    // })
  },
  getFilterList (params) {
    var url = '/api/audit_process/get_filter_list'
    console.log('url, params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         field: 'apply_time',
    //         label: '申请时间'
    //       },
    //       {
    //         field: 'priority',
    //         label: '优先级'
    //       },
    //       {
    //         field: 'audit_result',
    //         label: '审核结果'
    //       }
    //     ]
    //   })
    // })
  },
  getResourceList (params) {
    var url = '/api/audit_process/get_resource_list'
    console.log('url, params', url, params)
    // return fetch(url, params)
    return new Promise((resolve, reject) => {
      resolve({
        re: '200',
        data: [
          {
            name: 'withdraw_audit',
            label: '出金审核'
          },
          {
            name: 'deposit_audit',
            label: '入金审核'
          },
          {
            name: 'user_audit',
            label: '用户审核'
          }
        ]
      })
    })
  },
  getAuditResultSelect (params) {
    var url = '/api/audit_process/get_audit_result_select'
    console.log('url, params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [{
    //       key: 'key1',
    //       val: 'val1'
    //     }]
    //   })
    // })
  }
}
