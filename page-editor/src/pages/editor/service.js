import { fetch } from 'common/js/Utils'

export default {
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
  getFormItemList (params) {
    var url = '/api/resource/audit_start/get_form_item_list'
    console.log(url, params)
    // return fetch(url, params)
    var arr1 = [
      {
        'label': '用户名',
        'placeholder': '请输入',
        'key': '_1513324788169',
        'rules': ['required'],
        'type': 'input',
        'icon': 'inputbox',
        'value': ''
      },
      {
        'label': 'mt4',
        'placeholder': '请输入',
        'key': '_1513324817712',
        'rules': ['required'],
        'type': 'cascadeSelect',
        'icon': 'Group',
        'follow': [{
          key: '_1513324788169',
          label: '用户名'
        }],
        'dataSource': '/api/resource/audit_start/get_mt4_by_user_name',
        'value': ''
      },
      {
        'label': '姓名',
        'placeholder': '请输入',
        'key': '_1513325098424',
        'rules': ['required', 'number'],
        'type': 'input',
        'icon': 'inputbox',
        'value': ''
      },
      {
        'label': '入金银行名称',
        'placeholder': '请输入',
        'key': '_1513325114460',
        'rules': ['required'],
        'type': 'input',
        'icon': 'inputbox',
        'value': ''
      },
      {
        'label': '入金金额',
        'placeholder': '请输入',
        'key': '_1513325120141',
        'rules': ['required', 'number'],
        'type': 'input',
        'icon': 'inputbox',
        'value': ''
      }
    ]
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
    return new Promise((resolve, reject) => {
      resolve({
        re: '200',
        data: arr1
      })
    })
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
          description: '这是入金审核'
        }
      })
    })
  }
}
