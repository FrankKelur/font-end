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
  getPrioritySelect (params) {
    var url = '/api/resource/audit_process/get_priority_select'
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
  sortAudit (params) {
    var url = '/api/resource/audit_process/sort_audit'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200'
    //   })
    // })
  },
  setPriorityFun (params) {
    var url = '/api/resource/audit_process/set_priority'
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
  }
}

