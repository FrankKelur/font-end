import { fetch } from 'common/js/Utils'

export default {
  redoTask (params) {
    var url = '/api/resource/audit_process/redo_task'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': 'add_user!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
<<<<<<< HEAD
=======
  uploadCDN (params) {
    var url = '/upload-cdn'
    return fetch(url, params)
  },
  uploadCDNBatch (params) {
    var url = '/upload-cdn-batch'
    return fetch(url, params)
  },
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  processTask (params) {
    var url = '/api/resource/audit_process/process_task'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': 'processTask!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  getCustomizedAudit (params) {
    var url = '/api/resource/audit_process/get_customized_audit'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         label: '自定义审核1',
    //         name: 'c1'
    //       },
    //       {
    //         label: '自定义审核2',
    //         name: 'c2'
    //       },
    //       {
    //         label: '自定义审核3',
    //         name: 'c3'
    //       },
    //       {
    //         label: '自定义审核4',
    //         name: 'c4'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核5',
    //         description: '自定义审核5',
    //         name: 'c5'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核6',
    //         description: '自定义审核6',
    //         name: 'c6'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核7',
    //         description: '自定义审核7',
    //         name: 'c7'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核8',
    //         description: '自定义审核8',
    //         name: 'c8'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核9',
    //         description: '自定义审核9',
    //         name: 'c9'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核10',
    //         description: '自定义审核10',
    //         name: 'c10'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核11',
    //         description: '自定义审核11',
    //         name: 'c11'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核12',
    //         description: '自定义审核12',
    //         name: 'c12'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核13',
    //         description: '自定义审核13',
    //         name: 'c13'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核14',
    //         description: '自定义审核14',
    //         name: 'c14'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核15',
    //         description: '自定义审核15',
    //         name: 'c15'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核16',
    //         description: '自定义审核16',
    //         name: 'c16'
    //       }
    //     ]
    //   })
    // })
  },
  getAuditCount (params) {
    var url = '/api/resource/audit_process/get_audit_count'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: {
    //       c1: 0,
    //       c2: 200,
    //       c3: 0,
    //       user_audit: 9,
    //       deposit_audit: 1,
    //       withdraw_audit: 0
    //     }
    //   })
    // })
  },
<<<<<<< HEAD
  getPrioritySelect (params) {
    var url = '/api/resource/audit_process/get_priority_select'
=======
  getPrioritySelect (params, url) {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         key: '1',
    //         val: 'lowest'
    //       },
    //       {
    //         key: '2',
    //         val: 'low'
    //       },
    //       {
    //         key: '3',
    //         val: 'medium'
    //       },
    //       {
    //         key: '4',
    //         val: 'high'
    //       },
    //       {
    //         key: '5',
    //         val: 'highest'
    //       }
    //     ]
    //   })
    // })
  },
<<<<<<< HEAD
  sortAudit (params) {
    var url = '/api/resource/audit_process/sort_audit'
=======
  sortAudit (params, url) {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200'
    //   })
    // })
  },
<<<<<<< HEAD
  setPriorityFun (params) {
    var url = '/api/resource/audit_process/set_priority'
=======
  setPriorityFun (params, url) {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': 'add_user!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  // getAuditForm (params) {
  //   var url = '/api/resource/audit_process/get_audit_page_info'
  //   console.log('params', url, params)
  //   // return fetch(url, params)
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       stepName: '初级审核',
  //       formItemList: [
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
<<<<<<< HEAD
  getAuditInfo (params) {
    var url = '/api/resource/audit_process/get_audit_page_info'
    console.log('params', url, params)
    // return fetch(url, params)
    return new Promise((resolve, reject) => {
      resolve({
        result: {
          type: 'select',
          name: '失败原因',
          key: 'multiple-select',
          label: '备注',
          placeholder: '请输入',
          rules: ['required'],
          dataSource: [
            {
              key: 'error1',
              label: '失败原因1'
            },
            {
              key: 'error2',
              label: '失败原因2'
            }
          ]
        },
        stepName: '初级审核',
        formItemList: [
          {
            label: '用户姓名',
            placeholder: '请填写',
            type: 'input',
            rules: ['required'],
            field: '10001'
          },
          {
            label: '实入金额',
            placeholder: '请填写',
            type: 'input',
            rules: ['required', 'number'],
            field: '10002'
          },
          {
            label: '交易账号',
            placeholder: '请填写',
            type: 'input',
            rules: [],
            field: '10003'
          },
          {
            type: 'select',
            label: '电汇单',
            placeholder: '请选择',
            dataSource: [
              {
                key: '0',
                val: '需要电汇单'
              },
              {
                key: '1',
                val: '不需要电汇单'
              }
            ],
            rules: ['required'],
            field: '10004'
          },
          {
            label: '备注',
            placeholder: '请填写',
            type: 'textarea',
            rules: [],
            field: '10004'
          },
          {
            type: 'select',
            label: '文件类型',
            placeholder: '请选择',
            dataSource: [
              {
                key: '0',
                val: '银行入金证明'
              }
            ],
            rules: ['required'],
            field: '10005'
          },
          {
            type: 'upload',
            placeholder: '将文件拖到此处，或点击上传',
            tooltip: '只能上传jpg/png文件，且不能超过500kb',
            label: '附件',
            rules: ['required'],
            field: '10006'
          },
          {
            label: '用户名',
            placeholder: '请填写',
            type: 'input',
            rules: ['required'],
            field: '10007'
          },
          {
            label: '邮箱',
            placeholder: '请填写',
            type: 'input',
            rules: ['required'],
            field: '10008'
          },
          {
            label: '备注',
            placeholder: '请填写',
            type: 'textarea',
            rules: ['longText'],
            field: '10009'
          }
        ],
        data: [
          {
            'key': 'deposit_detail',
            'label': '用户信息',
            'dataSource': [{'key': 'uid', 'label': '用户名', 'value': 'xxxx'}]
          },
          {
            'key': 'deposit_detail',
            'label': '会员信息',
            'dataSource': [{'key': 'uid', 'label': '用户名', 'value': 'xxxx'}]
          },
          {
            'key': 'deposit_detail',
            'label': '账户信息',
            'dataSource': [{'key': 'uid', 'label': '用户名', 'value': 'xxxx'}]
          }
        ]
      })
    })
  },
  saveCustomAudit (params) {
    var url = '/api/resource/audit_process/saveCustomAudit'
    console.log('params', url, params)
    // return fetch(url, params)
    return new Promise((resolve, reject) => {
      resolve({
        'target_components': {
          'bubble': {
            'action': 'show',
            'params': {
              'type': 'success',
              'title': 'saveCustomAudit！'
            }
          }
        },
        'type': 'operateComponents'
      })
    })
  },
  submitCustomAudit (params) {
    var url = '/api/resource/audit_process/submitCustomAudit'
    console.log('params', url, params)
    // return fetch(url, params)
    return new Promise((resolve, reject) => {
      resolve({
        'target_components': {
          'bubble': {
            'action': 'show',
            'params': {
              'type': 'success',
              'title': 'submitCustomAudit！'
            }
          }
        },
        'type': 'operateComponents'
      })
    })
=======
  getAuditInfo (params, url = '/api/resource/audit_process/get_audit_page_info') {
    console.log('params', url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     stepName: '初级审核',
    //     template: '2',
    //     tables: [
    //       {
    //         url: '/api/resource/audit_process/get_audit_list',
    //         label: '入金审核',
    //         headerCols: [
    //           {
    //             'field': 'order_ref',
    //             'label': '交易编号'
    //           },
    //           {
    //             'field': 'apply_time',
    //             'label': '申请时间'
    //           },
    //           {
    //             'field': 'account',
    //             'auth': 'audit_process_deposit_account',
    //             'label': '交易账号'
    //           },
    //           {
    //             'field': 'method',
    //             'auth': 'audit_process_deposit_type',
    //             'label': '入金方式'
    //           },
    //           {
    //             'field': 'currency',
    //             'auth': 'audit_process_deposit_currency',
    //             'label': '货币'
    //           },
    //           {
    //             'field': 'amount',
    //             'auth': 'audit_process_deposit_amount',
    //             'label': '金额'
    //           },
    //           {
    //             'field': 'audit_status',
    //             'auth': 'audit_process_deposit_audit_status',
    //             'label': '审核状态'
    //           }
    //         ]
    //       },
    //       {
    //         url: '/api/resource/audit_process/get_audit_list',
    //         label: '出金审核',
    //         headerCols: [
    //           {
    //             'field': 'order_ref',
    //             'label': '交易编号'
    //           },
    //           {
    //             'field': 'apply_time',
    //             'label': '申请时间'
    //           },
    //           {
    //             'field': 'account',
    //             'auth': 'audit_process_deposit_account',
    //             'label': '交易账号'
    //           },
    //           {
    //             'field': 'method',
    //             'auth': 'audit_process_deposit_type',
    //             'label': '入金方式'
    //           },
    //           {
    //             'field': 'currency',
    //             'auth': 'audit_process_deposit_currency',
    //             'label': '货币'
    //           },
    //           {
    //             'field': 'amount',
    //             'auth': 'audit_process_deposit_amount',
    //             'label': '金额'
    //           },
    //           {
    //             'field': 'audit_status',
    //             'auth': 'audit_process_deposit_audit_status',
    //             'label': '审核状态'
    //           }
    //         ]
    //       }
    //     ],
    //     audit_file: [
    //       {
    //         file_remarks: '这是备注',
    //         file_name: '银行入金证明.png',
    //         url: '/preview/0a3d588f8c2d0dfb8a12b488444169cb',
    //         file_status: '2',
    //         file_id: '2',
    //         file_type: '银行入金证明',
    //         status_data_source: [
    //           {
    //             key: '1',
    //             label: '通过'
    //           },
    //           {
    //             key: '2',
    //             label: '不清晰'
    //           }
    //         ]
    //       },
    //       {
    //         file_remarks: '这是备注',
    //         file_name: '地址证明文件.png',
    //         url: '/preview/test.png',
    //         file_status: '1',
    //         file_type: '地址证明文件',
    //         status_data_source: [
    //           {
    //             key: '1',
    //             label: '通过'
    //           },
    //           {
    //             key: '2',
    //             label: '不清晰'
    //           }
    //         ]
    //       },
    //       {
    //         file_remarks: '这是备注',
    //         file_name: '交易指南.pdf',
    //         url: '/preview/tutorial.pdf',
    //         file_status: '1',
    //         file_type: '交易指南',
    //         status_data_source: [
    //           {
    //             key: '1',
    //             label: '通过'
    //           },
    //           {
    //             key: '2',
    //             label: '不清晰'
    //           }
    //         ]
    //       }
    //     ],
    //     data: [  // A区
    //       {
    //         'key': 'deposit_detail',
    //         'label': '用户信息',
    //         'dataSource': [{'key': 'uid', 'label': '用户名', 'value': 'xxxx'}]
    //       },
    //       {
    //         'key': 'deposit_detail2',
    //         'label': '会员信息',
    //         'dataSource': [{'key': 'uid', 'label': '用户名', 'value': 'xxxx'}]
    //       },
    //       {
    //         'key': 'deposit_detail3',
    //         'label': '账户信息',
    //         'dataSource': [{'key': 'uid', 'label': '用户名', 'value': 'xxxx'}]
    //       }
    //     ],
    //     formItemList: [ // B区
    //       {
    //         label: '用户姓名',
    //         placeholder: '请填写',
    //         type: 'input',
    //         rules: ['required'],
    //         key: '10001'
    //       },
    //       {
    //         label: '实入金额',
    //         placeholder: '请填写',
    //         type: 'input',
    //         rules: ['required', 'number'],
    //         key: '10002'
    //       },
    //       {
    //         label: '交易账号',
    //         placeholder: '请填写',
    //         type: 'input',
    //         rules: [],
    //         key: '10003'
    //       },
    //       {
    //         type: 'select',
    //         label: '电汇单',
    //         placeholder: '请选择',
    //         dataSource: [
    //           {
    //             key: '0',
    //             val: '需要电汇单'
    //           },
    //           {
    //             key: '1',
    //             val: '不需要电汇单'
    //           }
    //         ],
    //         rules: ['required'],
    //         key: '10004'
    //       },
    //       {
    //         label: '备注',
    //         placeholder: '请填写',
    //         type: 'textarea',
    //         rules: [],
    //         key: '10004'
    //       },
    //       {
    //         type: 'select',
    //         label: '文件类型',
    //         placeholder: '请选择',
    //         dataSource: [
    //           {
    //             key: '0',
    //             val: '银行入金证明'
    //           }
    //         ],
    //         rules: ['required'],
    //         key: '10005'
    //       },
    //       {
    //         type: 'upload',
    //         placeholder: '将文件拖到此处，或点击上传',
    //         tooltip: '只能上传jpg/png文件，且不能超过500kb',
    //         label: '附件',
    //         rules: ['required'],
    //         key: '10006'
    //       },
    //       {
    //         label: '用户名',
    //         placeholder: '请填写',
    //         type: 'input',
    //         rules: ['required'],
    //         key: '10007'
    //       },
    //       {
    //         label: '邮箱',
    //         placeholder: '请填写',
    //         type: 'input',
    //         rules: ['required'],
    //         key: '10008'
    //       },
    //       {
    //         label: '备注',
    //         placeholder: '请填写',
    //         type: 'textarea',
    //         rules: ['longText'],
    //         key: '10009'
    //       }
    //     ],
    //     result: {
    //       value: {
    //         audit_result: '1001',
    //         audit_action: 'error1'
    //       },
    //       dataSource: [
    //         {
    //           key: '1001',
    //           label: '失败',
    //           action: {
    //             type: 'select',
    //             name: '失败原因',
    //             key: 'multiple-select',
    //             label: '备注',
    //             placeholder: '请输入',
    //             rules: ['required'],
    //             dataSource: [
    //               {
    //                 key: 'error1',
    //                 label: '失败原因1'
    //               },
    //               {
    //                 key: 'error2',
    //                 label: '失败原因2'
    //               }
    //             ]
    //           }
    //         },
    //         {
    //           key: '1002',
    //           label: '成功',
    //           action: {
    //             type: 'input',
    //             name: '成功',
    //             key: 'input',
    //             label: '备注',
    //             placeholder: '请输入',
    //             rules: ['required']
    //           }
    //         }
    //       ]
    //     }
    //   })
    // })
    return fetch(url, params)
  },
  saveCustomAudit (params, url) {
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': 'saveCustomAudit！'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  cancelTask (params, url) {
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': 'saveCustomAudit！'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  submitCustomAudit (params, url) {
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': 'submitCustomAudit！'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  }
}

