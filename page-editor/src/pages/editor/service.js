import { fetch } from 'common/js/Utils'

export default {
  getPageList (params) {
    var url = '/api/resource/audit_setting/get_custom_audit'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'uuid': '1111',
    //     'name': 'test1',  // 审核名称key
    //     'label': '收款及获取电汇单', // 审核名称
    //     'description': {'key': '123123', 'label': '--'},
    //     'start': [{
    //       'key': '123123123',
    //       'name': '收取款项',
    //       'description': {'key': 'key1', 'label': '---'},
    //       'icon': 'delete',
    //       'dataSource': [
    //         {
    //           'key': '123123',
    //           'title': '用户姓名', // 标题
    //           'type': '0', // 单行输入框
    //           'hint': 'hint',
    //           'required': true
    //         },
    //         {
    //           'key': '11234422',
    //           'title': '备注', // 标题
    //           'type': '1', // 多行输入框
    //           'hint': 'hint',
    //           'required': true
    //         },
    //         {
    //           'key': '',
    //           'title': '实入金额', // 标题
    //           'type': '2', // 数字输入框
    //           'hint': 'hint',
    //           'unit': 'yuan',
    //           'required': true
    //         },
    //         {
    //           'key': '123123123',
    //           'title': '交易账号', // 标题
    //           'type': '3', // 单选框
    //           'dataSource': [
    //             {'key': '123123', 'label': '交易账号1'}
    //           ],
    //           'required': true
    //         },
    //         {
    //           'key': '22211',
    //           'title': '交易账号', // 标题key
    //           'type': '4', // 多选框
    //           'dataSource': [
    //             {'key': '1', 'label': '交易账号1'}, {'key': '1', 'label': '交易账号2'}
    //           ],
    //           'required': true
    //         },
    //         {
    //           'key': '123123123',
    //           'title': '时间', // 标题
    //           'type': '5', // 时间区间
    //           'hint': 'hint',
    //           'time_type': '', // 日期类型
    //           'required': true,
    //           'calc': true
    //         },
    //         {
    //           'key': '1231414',
    //           'title': '附件', // 标题
    //           'type': '6', // 附件
    //           'required': true
    //         },
    //         {
    //           'key': '1231441',
    //           'type': '7', // 说明文字
    //           'explain': 'explain',
    //           'link': '',
    //           'required': true
    //         }
    //       ]
    //
    //     }]
    //   })
    // })
  },
  uploadCDN (params) {
    var url = '/upload-cdn'
    console.log('params', url, params)
    return fetch(url, params)
  },
  // getFormItemList (params) {
  //   var url = '/api/resource/audit_setting/getFormItemList'
  //   console.log(url, params)
  //   // return fetch(url, params)
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       re: '200',
  //       data: [
  //         {
  //           label: '用户姓名',
  //           placeholder: '请填写',
  //           type: 'input',
  //           rules: ['required'],
  //           field: '10001'
  //         },
  //         {
  //           label: '实入金额',
  //           placeholder: '请填写',
  //           type: 'input',
  //           rules: ['required', 'number'],
  //           field: '10002'
  //         },
  //         {
  //           label: '交易账号',
  //           placeholder: '请填写',
  //           type: 'input',
  //           rules: [],
  //           field: '10003'
  //         },
  //         {
  //           type: 'select',
  //           label: '电汇单',
  //           placeholder: '请选择',
  //           dataSource: [
  //             {
  //               key: '0',
  //               val: '需要电汇单'
  //             },
  //             {
  //               key: '1',
  //               val: '不需要电汇单'
  //             }
  //           ],
  //           rules: ['required'],
  //           field: '10004'
  //         },
  //         {
  //           label: '备注',
  //           placeholder: '请填写',
  //           type: 'textarea',
  //           rules: [],
  //           field: '10004'
  //         },
  //         {
  //           type: 'select',
  //           label: '文件类型',
  //           placeholder: '请选择',
  //           dataSource: [
  //             {
  //               key: '0',
  //               val: '银行入金证明'
  //             }
  //           ],
  //           rules: ['required'],
  //           field: '10005'
  //         },
  //         {
  //           type: 'upload',
  //           placeholder: '将文件拖到此处，或点击上传',
  //           tooltip: '只能上传jpg/png文件，且不能超过500kb',
  //           label: '附件',
  //           rules: ['required'],
  //           field: '10006'
  //         },
  //         {
  //           label: '用户名',
  //           placeholder: '请填写',
  //           type: 'input',
  //           rules: ['required'],
  //           field: '10007'
  //         },
  //         {
  //           label: '邮箱',
  //           placeholder: '请填写',
  //           type: 'input',
  //           rules: ['required'],
  //           field: '10008'
  //         },
  //         {
  //           label: '备注',
  //           placeholder: '请填写',
  //           type: 'textarea',
  //           rules: ['longText'],
  //           field: '10009'
  //         }
  //       ]
  //     })
  //   })
  // },
  getAuditInfo (params) {
    var url = '/api/resource/audit_setting/getAuditInfo'
    console.log(url, params)
    // return fetch(url, params)
    return new Promise((resolve, reject) => {
      resolve({
        re: '200',
        data: {
          name: '入金审核',
//          task_type: '',
          description: '这是入金审核',
          selectedIcon: {url: '', name: '', icon: 'record'}
        }
      })
    })
  },
  deleteAudit (params) {
    var url = '/api/resource/audit_setting/delete_audit'
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
  deleteStep (params) {
    var url = '/api/resource/audit_setting/delete_audit'
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
  toggleAudit (params) {
    var url = '/api/resource/audit_setting/toggle_audit'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'failed',
    //           'title': '网络错误！'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  saveEnable (params) {
    var url = '/api/resource/audit_setting/add_custom_audit_start_page'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'failed',
    //           'title': '网络错误！'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  editAuditForm (params) {
    var url = '/api/resource/audit_setting/edit_audit_form'
    console.log('params', url, params)
    return fetch(url, params)
  },
  editEnable (params) {
    var url = '/api/resource/audit_setting/edit_custom_audit_start_page'
    console.log('params', url, params)
    return fetch(url, params)
  },
  checkNameUnique (params) {
    var url = '/api/resource/audit_setting/check_name_unique'
    console.log(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: true
    //   })
    // })
    return fetch(url, params)
  },
  auditPeopleAdd (params) {
    var url = '/api/resource/audit_setting/auditPeopleAdd'
    console.log(url, params)
    return new Promise((resolve, reject) => {
      resolve({
        type: 'redirect',
        params: {
          toUrl: '/pages/user_add'
        }
      })
    })
    // return fetch(url, params)
  },
  noticePeopleAdd (params) {
    var url = '/api/resource/audit_setting/noticePeopleAdd'
    console.log(url, params)
    return new Promise((resolve, reject) => {
      resolve({
        type: 'redirect',
        params: {
          toUrl: '/pages/user_add'
        }
      })
    })
    // return fetch(url, params)
  },
  // saveFlow (params) {
  //   var url = '/api/resource/audit_setting/saveFlow'
  //   console.log(url, params)
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       'type': 'operateComponents',
  //       're': '200',
  //       'target_components': {
  //         'bubble': {
  //           'action': 'show',
  //           'params': {
  //             'type': 'success',
  //             'title': '保存成功!'
  //           }
  //         }
  //       }
  //     })
  //   })
  //   // return fetch(url, params)
  // },
  getStepList (params) {
    var url = '/api/resource/audit_setting/get_audit_step_setting_list'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         stepName: '步骤1',
    //         stepDad: '触发页面',
    //         description: '在这个步骤，审核人员。。。。'
    //       },
    //       {
    //         stepName: '步骤2',
    //         stepDad: '步骤1',
    //         description: '在这个步骤，审核人员。。。。'
    //       },
    //       {
    //         stepName: '步骤3',
    //         stepDad: '步骤2',
    //         description: '在这个步骤，审核人员。。。。'
    //       }
    //     ]
    //   })
    // })
  },
  // getAuditItemList (params) {
  //   var url = '/api/resource/audit_setting/getAuditItemList'
  //   console.log(url, params)
  //   // return fetch(url, params)
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       re: '200',
  //       data: [
  //         {
  //           label: '收取电汇单',
  //           audit_term: '文件类型 附件 用户名 邮箱 备注'
  //         },
  //         {
  //           label: '收取款项',
  //           audit_term: '用户姓名 实入金额 交易账户 备注 电汇单'
  //         }
  //       ]
  //     })
  //   })
  // },
  // getStepInfo (params) {
  //   var url = '/api/resource/audit_setting/getStepInfo'
  //   console.log('params', url, params)
  //   // return fetch(url, params)
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       re: '200',
  //       data: {
  //         'name': {'key': '123123123', 'label': '同步交易记录'},
  //         'parent': [
  //           {
  //             'key': '1001',
  //             'label': '收款款项',
  //             'condition': [
  //               {
  //                 'type': 'select',
  //                 'key': '1002',
  //                 'trans_key': '123123123',
  //                 'title': '电汇单',
  //                 'dataSource': [{'key': '1003', 'trans_key': '12312', 'label': '不需要电汇单'}]
  //               },
  //               {
  //                 'type': 'datetimeRange',
  //                 'key': '1004',
  //                 'trans_key': '1123213123',
  //                 'title': '选项2',
  //                 'dataSource': {'condition': 'more', 'value': '10'}
  //               }
  //             ]
  //           },
  //           {
  //             'key': '1005',
  //             'label': '会计查收电汇单',
  //             'condition': [
  //               {
  //                 'type': 'select',
  //                 'key': '1006',
  //                 'trans_key': '123123123',
  //                 'title': '审核结果',
  //                 'dataSource': [{'key': '1007', 'trans_key': '12312', 'label': '收到款项'}]
  //               },
  //               {
  //                 'type': 'datetimeRange',
  //                 'key': '1008',
  //                 'trans_key': '1123213123',
  //                 'title': '选项2',
  //                 'dataSource': {'condition': 'more', 'value': '10'}
  //               }
  //             ]
  //           }
  //         ],
  //         'description': {'key': '1009', 'label': 'enquiry收到电汇单后，告知会计，会计需要关注该笔入金的款项情况'},
  //         'audit_page': {'key': '0', 'trans_key': '123123123123', 'label': '图片文件及信息对比'},
  //         'audit_target': [
  //           {
  //             'key': '1011',
  //             'label': '入金记录',
  //             'all': false,
  //             'trans_key': '1231231231',
  //             'dataSource': [
  //               {'key': '1011-1', 'label': '用户名'},
  //               {'key': '1011-2', 'label': '申请时间'}
  //             ]
  //           },
  //           {
  //             'key': '1013',
  //             'label': '文件',
  //             'all': true,
  //             'trans_key': '12312312311'
  //           }
  //         ],
  //         'result': [
  //           {
  //             'key': '1014',
  //             'label': '成功',
  //             'action': {
  //               'type': 'input',
  //               'key': '1015',
  //               'label': '备注',
  //               'placeholder': '备注'
  //             }
  //           },
  //           {
  //             'key': '1016',
  //             'label': '失败',
  //             'action': {
  //               'type': 'input',
  //               'key': '1017',
  //               'label': '失败原因',
  //               'placeholder': '失败原因',
  //               'dataSource': [
  //                 {
  //                   key: '1018',
  //                   label: '原因1'
  //                 },
  //                 {
  //                   key: '1019',
  //                   label: '原因2'
  //                 }
  //               ]
  //             }
  //           }
  //         ]
  //       }
  //     })
  //   })
  // },
  getDadStepList (params) {
    var url = '/api/resource/audit_setting/get_audit_step_parent'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     're': '200',
    //     'data': [
    //       {
    //         key: '1001',
    //         label: '收取款项'
    //       },
    //       {
    //         key: '1005',
    //         label: '会计查收电汇单'
    //       },
    //       {
    //         key: '102',
    //         label: '用户提供电汇单'
    //       },
    //       {
    //         key: '103',
    //         label: '入金市场决定'
    //       }
    //     ]
    //   })
    // })
  },
  getStepFields (params) {
    var url = '/api/resource/audit_setting/get_audit_step_condition'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: {
    //       '1002': {
    //         field: 'order',
    //         label: '电汇单',
    //         type: 'select',
    //         'dataSource': [
    //           {'key': '1003', 'trans_key': '12312', 'label': '不需要电汇单'},
    //           {'key': '10031', 'trans_key': '12312', 'label': '要电汇单'}
    //         ]
    //       },
    //       '1004': {
    //         field: 'order',
    //         label: '选项2',
    //         type: 'datetimeRange'
    //       },
    //       '1006': {
    //         field: 'order',
    //         label: '电汇单',
    //         type: 'select',
    //         'dataSource': [
    //           {'key': '1007', 'trans_key': '12312', 'label': '收到款项'}
    //         ]
    //       },
    //       '1008': {
    //         field: 'order',
    //         label: '时间',
    //         type: 'datetimeRange'
    //       }
    //     }
    //   })
    // })
  },
  getTemplateList (params) {
    var url = '/api/resource/audit_setting/get_audit_page_list'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         key: '0',
    //         label: '纯信息展示'
    //       },
    //       {
    //         key: '1',
    //         label: '图片文件及信息展示'
    //       },
    //       {
    //         key: '3',
    //         label: '系统已有资源及信息对比'
    //       }
    //     ]
    //   })
    // })
  },
  getAuditTargetMap (params) {
    var url = '/api/resource/audit_setting/get_audit_step_info'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: {
    //       '0': [
    //         {
    //           'key': '1011',
    //           'label': '入金记录',
    //           'allDataSource': [
    //             {'key': '1011-1', 'label': '用户名'},
    //             {'key': '1011-2', 'label': '申请时间'},
    //             {'key': '1011-3', 'label': '入金方式'}
    //           ]
    //         },
    //         {
    //           'key': '1013',
    //           'label': '文件',
    //           'allDataSource': [
    //             {'key': '1013-1', 'label': '状态'}
    //           ]
    //         }
    //       ],
    //       '1': [
    //         {
    //           'key': '1011',
    //           'label': '入金记录',
    //           'allDataSource': [
    //             {'key': '1011-1', 'label': '用户名'},
    //             {'key': '1011-2', 'label': '申请时间'},
    //             {'key': '1011-3', 'label': '入金方式'}
    //           ]
    //         },
    //         {
    //           'key': '1013',
    //           'label': '文件',
    //           'allDataSource': [
    //             {'key': '1013-1', 'label': '状态'}
    //           ]
    //         }
    //       ],
    //       '2': [
    //         {
    //           'key': '1011',
    //           'label': '入金记录',
    //           'allDataSource': [
    //             {'key': '1011-1', 'label': '用户名'},
    //             {'key': '1011-2', 'label': '申请时间'},
    //             {'key': '1011-3', 'label': '入金方式'}
    //           ]
    //         },
    //         {
    //           'key': '1013',
    //           'label': '文件',
    //           'allDataSource': [
    //             {'key': '1013-1', 'label': '状态'}
    //           ]
    //         }
    //       ]
    //     }
    //   })
    // })
  },
  getRList (params) {
    var url = '/api/resource/audit_setting/get_audit_condition_sign'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         key: 'gt',
    //         label: '小于'
    //       },
    //       {
    //         key: 'eq',
    //         label: '等于'
    //       },
    //       {
    //         key: 'gt',
    //         label: '大于'
    //       }
    //     ]
    //   })
    // })
  },
  getSelectedUserList (params, url) {
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         user_name: 'zhaipengchao',
    //         uuid: '10001'
    //       },
    //       {
    //         user_name: 'frank',
    //         uuid: '10002'
    //       }
    //     ]
    //   })
    // })
  },
  saveUsers (params, url) {
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'failed',
    //           'title': '保存成功！'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  saveStep (params) {
    var url = '/api/resource/audit_setting/edit_audit_step_setting'
    console.log('params', url, params)
    return fetch(url, params)
  },
  saveVariable (params, url) {
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'failed',
    //           'title': '保存成功！'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  addAudit (params) {
    var url = '/api/resource/audit_setting/add_custom_audit'
    return fetch(url, params)
  },
  editAudit (params) {
    var url = '/api/resource/audit_setting/edit_custom_audit'
    return fetch(url, params)
  },
  deletePage (params) {
    var url = '/api/resource/audit_setting/delete_custom_audit_start_page'
    return fetch(url, params)
  },
  copyPage (params) {
    var url = '/api/resource/audit_setting/copy_custom_audit_start_page'
    return fetch(url, params)
  }
}
