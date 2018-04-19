import { fetch } from 'common/js/Utils'

export default {
  submitAudit (params) {
    var url = '/api/resource/audit_start/audit_submit'
    console.log(url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '审核提交成功！'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  },
  getAccountByUsername (params = {}, url = '/api/resource/audit_start/get_account_list') {
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         key: '1000101',
    //         currency: '美元'
    //       },
    //       {
    //         key: '1000102',
    //         currency: '美元'
    //       },
    //       {
    //         key: '1000103',
    //         currency: '欧元'
    //       },
    //       {
    //         key: '1000104',
    //         currency: '澳元'
    //       }
    //     ]
    //   })
    // })
  },
  getFormItemList (params) {
    var url = '/api/resource/audit_start/get_form_item_list'
    console.log(url, params)
    return fetch(url, params)
    // var arr1 = [{
    //   'label': '用户名',
    //   'placeholder': '请输入',
    //   'key': '_1513324788169',
    //   'rules': ['required'],
    //   'type': 'input',
    //   'icon': 'inputbox',
    //   'value': ''
    // }, {
    //   'label': 'mt4',
    //   'placeholder': '请输入',
    //   'key': '_1513324817712',
    //   'rules': ['required'],
    //   'type': 'cascadeSelect',
    //   'icon': 'Group',
    //   'follow': [{
    //     key: '_1513324788169',
    //     label: '用户名'
    //   }],
    //   'dataSource': '/api/resource/audit_start/get_mt4_by_user_name',
    //   'value': ''
    // }, {
    //   'label': '姓名',
    //   'placeholder': '请输入',
    //   'key': '_1513325098424',
    //   'rules': ['required', 'number'],
    //   'type': 'input',
    //   'icon': 'inputbox',
    //   'value': ''
    // }, {
    //   'label': '入金银行名称',
    //   'placeholder': '请输入',
    //   'key': '_1513325114460',
    //   'rules': ['required'],
    //   'type': 'input',
    //   'icon': 'inputbox',
    //   'value': ''
    // }, {
    //   'label': '入金金额',
    //   'placeholder': '请输入',
    //   'key': '_1513325120141',
    //   'rules': ['required', 'number'],
    //   'type': 'input',
    //   'icon': 'inputbox',
    //   'value': ''
    // }]
    // var arr2 = [
    //   {
    //     label: '用户名',
    //     placeholder: '请填写',
    //     type: 'input',
    //     rules: ['required', '/api/unique_validate'],
    //     key: 'A10010'
    //   },
    //   {
    //     label: 'MT4账号',
    //     placeholder: '请选择',
    //     type: 'cascadeSelect',
    //     dataSource: '/api/resource/audit_start/get_mt4_by_user_name',
    //     rules: ['required'],
    //     dependencies: ['A10010'],
    //     key: 'A10011'
    //   },
    //   {
    //     label: '姓名',
    //     placeholder: '请输入',
    //     type: 'input',
    //     rules: ['required'],
    //     key: 'A10012'
    //   },
    //   {
    //     label: '入金金额',
    //     placeholder: '请输入',
    //     type: 'input',
    //     rules: ['required', 'number'],
    //     key: 'A10013'
    //   },
    //   {
    //     label: '入金银行名称',
    //     placeholder: '请输入',
    //     type: 'input',
    //     rules: ['required'],
    //     key: 'A10014'
    //   }
    // ]
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: arr1
    //   })
    // })
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         label: '用户姓名',
    //         placeholder: '请填写',
    //         type: 'input',
    //         rules: ['required'],
    //         key: 'A10001'
    //       },
    //       {
    //         label: '实入金额',
    //         placeholder: '请填写',
    //         type: 'input',
    //         rules: ['required', 'number'],
    //         key: 'A10002'
    //       },
    //       {
    //         label: '交易账号',
    //         placeholder: '请填写',
    //         type: 'input',
    //         rules: [],
    //         key: 'A10003'
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
    //         key: 'A10004'
    //       },
    //       {
    //         label: '备注',
    //         placeholder: '请填写',
    //         type: 'textarea',
    //         rules: [],
    //         key: 'A10004'
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
    //         key: 'A10005'
    //       },
    //       {
    //         type: 'upload',
    //         placeholder: '将文件拖到此处，或点击上传',
    //         tooltip: '只能上传jpg/png文件，且不能超过500kb',
    //         label: '附件',
    //         rules: ['required'],
    //         key: 'A10006'
    //       },
    //       {
    //         label: '用户名',
    //         placeholder: '请填写',
    //         type: 'input',
    //         rules: ['required'],
    //         key: 'A10007'
    //       },
    //       {
    //         label: '邮箱',
    //         placeholder: '请填写',
    //         type: 'input',
    //         rules: ['required'],
    //         key: 'A10008'
    //       },
    //       {
    //         label: '备注',
    //         placeholder: '请填写',
    //         type: 'textarea',
    //         rules: ['longText'],
    //         key: 'A10009'
    //       }
    //     ]
    //   })
    // })
  },
  getCustomizedAudit (params) {
    var url = '/api/resource/audit_start/get_customized_audit'
    console.log('params getCustomizedAudit', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         icon: 'delete',
    //         label: '自定义审核1',
    //         description: '自定义审核1',
    //         name: 'c1'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核2',
    //         description: '自定义审核2',
    //         name: 'c2'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核3',
    //         description: '自定义审核3',
    //         name: 'c3'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核4',
    //         description: '自定义审核4',
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
    //       }
    //     ]
    //   })
    // })
  },
  getSysAuditIcon (params) {
    var url = '/api/resource/audit_start/get_sys_audit_icon'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: {
    //       deposit: 'delete',
    //       withdraw: 'delete',
    //       user: 'delete'
    //     }
    //   })
    // })
  },
  triggerAudit (params) {
    var url = '/api/resource/audit_start/trigger_audit'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'params': {
    //       toUrl: '/pages/user_management'
    //     },
    //     'type': 'redirect'
    //   })
    // })
  }
}

