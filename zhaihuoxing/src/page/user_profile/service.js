import { fetch } from 'common/js/Utils'

export default {
  getProfileSetting (params = {}, url = '/api/resource/user_profile/get_profile_setting') {
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     customMap: {
    //       custom_01: '自定义信息1'
    //     },
    //     data: {
    //       'base_info': [
    //         {
    //           'checked': false,
    //           'depth': 1,
    //           'key': 'last_name',
    //           'label': '姓氏',
    //           'required': true,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'middle_name',
    //           'label': '中间名',
    //           'required': true,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': false,
    //           'depth': 1,
    //           'key': 'first_name',
    //           'label': '名字',
    //           'required': true,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'birthday',
    //           'label': '生日',
    //           'required': false,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'company_name',
    //           'label': '公司名称',
    //           'required': true,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'company_ctime',
    //           'label': '公司注册时间',
    //           'required': false,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'phone_no',
    //           'label': '电话号码',
    //           'required': false,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'lang',
    //           'label': '语言',
    //           'required': true,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': false,
    //           'depth': 1,
    //           'key': 'country',
    //           'label': '国籍',
    //           'required': true,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': false,
    //           'depth': 1,
    //           'key': 'company_register_country',
    //           'label': '公司注册国家',
    //           'required': false,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': false,
    //           'depth': 1,
    //           'key': 'state',
    //           'label': '省/直辖市/自治区/州',
    //           'required': true,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': false,
    //           'depth': 1,
    //           'key': 'city',
    //           'label': '城市',
    //           'required': false,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': false,
    //           'depth': 1,
    //           'key': 'address',
    //           'label': '详细地址',
    //           'required': false,
    //           'system': true,
    //           'type': 'input'
    //         }, {
    //           'checked': false,
    //           'depth': 1,
    //           'key': 'postcode',
    //           'label': '邮政编码',
    //           'required': false,
    //           'system': true,
    //           'type': 'input'
    //         }
    //       ],
    //       'investor_info': [
    //         {
    //           'checked': false,
    //           'dataSource': [{'key': '0', 'label': '受雇'}, {'key': '1', 'label': '无业'}, {
    //             'key': '2',
    //             'label': '退休'
    //           }, {'key': '3', 'label': '自雇'}, {'key': '4', 'label': '学生'}],
    //           'depth': 2,
    //           'key': 'working_condition',
    //           'label': '工作状态',
    //           'required': false,
    //           'system': true,
    //           'type': 'select'
    //         }, {
    //           'checked': false,
    //           'dataSource': [{
    //             'dataSource': [{'key': 'carrer1_key1', 'label': '娱乐'}],
    //             'key': 'carrer1',
    //             'label': '艺术/媒体/传播',
    //             'type': 'select'
    //           }],
    //           'depth': 3,
    //           'key': 'career_field',
    //           'label': '职业',
    //           'required': 0,
    //           'type': 'select'
    //         }, {
    //           'checked': false,
    //           'dataSource': [{'key': '0', 'label': '存款/投资'}, {'key': '1', 'label': '夫妻/父母/家人'}, {
    //             'key': '2',
    //             'label': '利益/借款'
    //           }, {'key': '3', 'label': '私人养老金'}, {'key': '4', 'label': '国家养老金'}, {'key': '5', 'label': '其他'}],
    //           'depth': 2,
    //           'key': 'source_funds',
    //           'label': '资金来源',
    //           'required': false,
    //           'system': true,
    //           'type': 'select'
    //         }, {
    //           'checked': false,
    //           'dataSource': [{'key': '0', 'label': '低于$15000'}, {'key': '1', 'label': '$15000-$24999'}, {
    //             'key': '2',
    //             'label': '$25000-$49999'
    //           }, {'key': '3', 'label': '$50000-$99999'}, {'key': '4', 'label': '$100000-$249999'}, {
    //             'key': '5',
    //             'label': '$255000或更多'
    //           }],
    //           'depth': 2,
    //           'key': 'annual_revenue',
    //           'label': '估计净值',
    //           'required': false,
    //           'system': true,
    //           'type': 'select'
    //         }, {
    //           'checked': false,
    //           'dataSource': [{'key': '0', 'label': '低于$15000'}, {'key': '1', 'label': '$15000-$24999'}, {
    //             'key': '2',
    //             'label': '$25000-$49999'
    //           }, {'key': '3', 'label': '$50000-$99999'}, {'key': '4', 'label': '$100000-$249999'}, {
    //             'key': '5',
    //             'label': '$255000或更多'
    //           }],
    //           'depth': 2,
    //           'key': 'net_worth',
    //           'label': '预计年收入',
    //           'required': false,
    //           'system': true,
    //           'type': 'select'
    //         }, {
    //           'checked': false,
    //           'dataSource': [{'key': '0', 'label': '外汇'}, {'key': '1', 'label': '差价和约'}, {'key': '2', 'label': '无'}],
    //           'depth': 2,
    //           'key': 'engaged_transaction',
    //           'label': '您从事过的交易',
    //           'required': false,
    //           'system': true,
    //           'type': 'select'
    //         }, {
    //           'checked': false,
    //           'dataSource': [{'key': '0', 'label': '我曾经完成或注册过交易课程'}, {'key': '1', 'label': '我的交易全基于自己的经验'}, {
    //             'key': '2',
    //             'label': '我有相关的工作或证书,亦表示我已了解您的产品和服务,以及当中所涉及的风险。'
    //           }],
    //           'depth': 2,
    //           'key': 'invest_knowledge',
    //           'label': '您的投资知识',
    //           'required': false,
    //           'system': true,
    //           'type': 'select'
    //         }
    //       ],
    //       'files': [
    //         {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'id_card',
    //           'label': '身份证/护照',
    //           'system': true,
    //           'type': 'upload'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'address_proof',
    //           'label': '居住证明',
    //           'system': true,
    //           'type': 'upload'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'incorporation_cert',
    //           'label': '公司注册证书',
    //           'system': true,
    //           'type': 'upload'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'organization_article',
    //           'label': '公司注册章程',
    //           'system': true,
    //           'type': 'upload'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'shareholders_list',
    //           'label': '股东名单',
    //           'system': true,
    //           'type': 'upload'
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'directors_list',
    //           'label': '董事名单',
    //           'system': true,
    //           'type': 'upload'
    //         }, {
    //           'checked': false,
    //           'depth': 1,
    //           'key': 'shareholders_passport',
    //           'label': '股东所有护照',
    //           'system': true,
    //           'type': 'upload',
    //           'required': true
    //         }, {
    //           'checked': true,
    //           'depth': 1,
    //           'key': 'shareholders_proof',
    //           'label': '股东所有居住证明',
    //           'system': true,
    //           'type': 'upload'
    //         }, {
    //           'checked': false,
    //           'depth': 1,
    //           'key': 'company_bank_address',
    //           'label': '公司银行',
    //           'system': true,
    //           'type': 'upload',
    //           'required': true
    //         }, {
    //           'checked': false,
    //           'dataSource': [{'checked': false, 'key': '0', 'label': '文件已通过'}, {
    //             'checked': false,
    //             'key': '1',
    //             'label': '文件已拒绝'
    //           }, {'checked': false, 'key': '2', 'label': '文件不清晰'}, {
    //             'checked': false,
    //             'key': '3',
    //             'label': '文件不完整'
    //           }, {'checked': false, 'key': '4', 'label': '文件过期'}, {
    //             'checked': false,
    //             'key': '5',
    //             'label': '文件与系统内个人资料不相符'
    //           }, {'checked': false, 'key': '6', 'label': '文件错误'}, {
    //             'checked': false,
    //             'key': '7',
    //             'label': '文件未签名'
    //           }, {
    //             'checked': false,
    //             'dataSource': [],
    //             'key': '1514355775',
    //             'label': 'test',
    //             'required': false,
    //             'system': false
    //           }],
    //           'depth': 2,
    //           'key': 'file_status',
    //           'label': '文件状态',
    //           'required': 0,
    //           'type': 'select'
    //         }
    //       ],
    //       'custom_01': [
    //         {
    //           'label': '用户名',
    //           'placeholder': '请输入',
    //           'key': '_1513324788169',
    //           'rules': ['required'],
    //           'type': 'input',
    //           'icon': 'inputbox',
    //           'value': ''
    //         }, {
    //           'label': 'mt4',
    //           'placeholder': '请输入',
    //           'key': '_1513324817712',
    //           'rules': ['required'],
    //           'type': 'cascadeSelect',
    //           'icon': 'Group',
    //           'follow': [{
    //             key: '_1513324788169',
    //             label: '用户名'
    //           }],
    //           'dataSource': '/api/resource/audit_start/get_mt4_by_user_name',
    //           'value': ''
    //         }, {
    //           'label': '姓名',
    //           'placeholder': '请输入',
    //           'key': '_1513325098424',
    //           'rules': ['required', 'number'],
    //           'type': 'input',
    //           'icon': 'inputbox',
    //           'value': ''
    //         }, {
    //           'label': '入金银行名称',
    //           'placeholder': '请输入',
    //           'key': '_1513325114460',
    //           'rules': ['required'],
    //           'type': 'input',
    //           'icon': 'inputbox',
    //           'value': ''
    //         }, {
    //           'label': '入金金额',
    //           'placeholder': '请输入',
    //           'key': '_1513325120141',
    //           'rules': ['required', 'number'],
    //           'type': 'input',
    //           'icon': 'inputbox',
    //           'value': ''
    //         }
    //       ]
    //     },
    //     custom: {
    //       base_info: [
    //         {
    //           'label': '用户名',
    //           'placeholder': '请输入',
    //           'key': '_1513324788169',
    //           'rules': ['required'],
    //           'type': 'input',
    //           'icon': 'inputbox',
    //           'value': ''
    //         }, {
    //           'label': 'mt4',
    //           'placeholder': '请输入',
    //           'key': '_1513324817712',
    //           'rules': ['required'],
    //           'type': 'cascadeSelect',
    //           'icon': 'Group',
    //           'follow': [{
    //             key: '_1513324788169',
    //             label: '用户名'
    //           }],
    //           'dataSource': '/api/resource/audit_start/get_mt4_by_user_name',
    //           'value': ''
    //         }, {
    //           'label': '姓名',
    //           'placeholder': '请输入',
    //           'key': '_1513325098424',
    //           'rules': ['required', 'number'],
    //           'type': 'input',
    //           'icon': 'inputbox',
    //           'value': ''
    //         }, {
    //           'label': '入金银行名称',
    //           'placeholder': '请输入',
    //           'key': '_1513325114460',
    //           'rules': ['required'],
    //           'type': 'input',
    //           'icon': 'inputbox',
    //           'value': ''
    //         }, {
    //           'label': '入金金额',
    //           'placeholder': '请输入',
    //           'key': '_1513325120141',
    //           'rules': ['required', 'number'],
    //           'type': 'input',
    //           'icon': 'inputbox',
    //           'value': ''
    //         }
    //       ],
    //       investor_info: []
    //     }
    //   })
    // })
    return fetch(url, params)
  },
  // '/api/common/check_user_status' // z todo 添加 到confluence
  getProfileInfo (params = {}, url = '/api/resource/user_profile/get_profile_info') {
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     base_info: {
    //       'last_name': 'zhai',
    //       'middle_name': '鹏',
    //       'first_name': 'chao',
    //       'birthday': '',
    //       'company_name': '',
    //       'company_ctime': '',
    //       'phone_no': '',
    //       'lang': '',
    //       'country': '',
    //       'company_register_country': '',
    //       'state': '',
    //       'city': '',
    //       'address': '',
    //       'postcode': '',
    //
    //       '_1513324788169': 'test',
    //       '_1513324817712': '',
    //       '_1513325098424': '',
    //       '_1513325114460': '',
    //       '_1513325120141': ''
    //     },
    //     investor_info: {},
    //     files: {
    //       'id_card': {'url': '/preview/0a3d588f8c2d0dfb8a12b488444169cb', 'name': '银行入金证明.png', status: '文件已通过', remark: '格式正确'},
    //       'address_proof': {'url': '/preview/tutorial.pdf', 'name': '交易指南.pdf', status: '文件已通过', remark: '格式正确'},
    //       'incorporation_cert': {'url': '/preview/test.png', 'name': '地址证明文件.png', status: '文件已通过', remark: '格式正确'},
    //       'organization_article': {'url': '/preview/test.png', 'name': '地址证明文件.png', status: '文件已通过', remark: '格式正确'},
    //       'shareholders_list': {'url': '/preview/test.png', 'name': '地址证明文件.png', status: '文件已通过', remark: '格式正确'},
    //       'directors_list': {'url': '/preview/test.png', 'name': '地址证明文件.png', status: '文件已通过', remark: '格式正确'},
    //       'shareholders_passport': {'url': '/preview/test.png', 'name': '地址证明文件.png', status: '文件已通过', remark: '格式正确'},
    //       'shareholders_proof': {'url': '/preview/test.png', 'name': '地址证明文件.png', status: '文件已通过', remark: '格式正确'},
    //       'company_bank_address': {'url': '/preview/test.png', 'name': '地址证明文件.png', status: '文件已通过', remark: '格式正确'},
    //       'file_status': {'url': '/preview/test.png', 'name': '地址证明文件.png', status: '文件已通过', remark: '格式正确'},
    //       '_1513324788100': {'url': '/preview/test.png', 'name': '地址证明文件.png', status: '文件已通过', remark: '格式正确'}
    //     },
    //     custom_01: {
    //       '_1513324788169': 'custom test',
    //       '_1513324817712': '',
    //       '_1513325098424': '',
    //       '_1513325114460': '',
    //       '_1513325120141': ''
    //     }
    //   })
    // })
    return fetch(url, params)
  },
  getAuditResult (params = {}, url = '/api/resource/user_profile/get_audit_result') {
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '402', // 400 审核失败， 200 审核成功， 401 审核未完成, 402 未提交审核
    //     data: '审核失败，用户名格式不正确\n找不到相应的国家的城市\n地址格式有误！！'
    //   })
    // })
    return fetch(url, params)
  },
  saveProfileInfo (params = {}, url = '/api/resource/user_profile/save_profile_info') {
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
    return fetch(url, params)
  },
  submitUserProfile (params = {}, url = '/api/resource/user_profile/submit_user_profile') {
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
    return fetch(url, params)
  },
  deposit (params = {}, url = '/api/resource/user_profile/to_deposit') {
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     type: 'redirect',
    //     params: {
    //       toUrl: '/pages/deposit'
    //     }
    //   })
    // })
    return fetch(url, params)
  },
  uploadCDNBatch (params) {
    var url = '/upload-cdn-batch'
    return fetch(url, params)
  }
}

