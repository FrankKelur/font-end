import { fetch } from 'common/js/Utils'

export default {
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
  getProfileInfo (params) {
    var url = '/api/resource/config/get_user_info_setting'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'data': {
    //       'name': 'user_profile',
    //       'base_info': [
    //         {
    //           'key': 'last_name',
    //           'checked': false,
    //           'required': false,
    //           'label': '姓氏',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'middle_name',
    //           'checked': false,
    //           'required': false,
    //           'label': '中间名',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'first_name',
    //           'checked': false,
    //           'required': false,
    //           'label': '名字',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'birthday',
    //           'checked': false,
    //           'required': false,
    //           'label': '生日',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'company_name',
    //           'checked': false,
    //           'required': false,
    //           'label': '公司名称',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'company_ctime',
    //           'checked': false,
    //           'required': false,
    //           'label': '公司注册时间',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'phone_no',
    //           'checked': false,
    //           'required': false,
    //           'label': '电话号码',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'lang',
    //           'checked': false,
    //           'required': false,
    //           'label': '语言',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'country',
    //           'checked': false,
    //           'required': false,
    //           'label': '国籍',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'company_register_country',
    //           'checked': false,
    //           'required': false,
    //           'label': '公司注册国家',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'state',
    //           'checked': false,
    //           'required': false,
    //           'label': '省/直辖市/自治区/州',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'city',
    //           'checked': false,
    //           'required': false,
    //           'label': '城市',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'address',
    //           'checked': false,
    //           'required': false,
    //           'label': '详细地址',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'postcode',
    //           'checked': false,
    //           'required': false,
    //           'label': '邮政编码',
    //           'type': 'input',
    //           'system': true,
    //           'depth': 1
    //         }
    //       ],
    //       'investor_info': [
    //         {
    //           'key': 'working_condition',
    //           'checked': false,
    //           'required': false,
    //           'label': '工作状态',
    //           'type': 'select',
    //           'system': true,
    //           'depth': 2,
    //           'dataSource': [
    //             {'key': '0', 'label': '受雇'},
    //             {'key': '1', 'label': '无业'},
    //             {'key': '2', 'label': '退休'},
    //             {'key': '3', 'label': '自雇'},
    //             {'key': '4', 'label': '学生'}
    //           ]
    //         },
    //         {
    //           'key': 'career_field',
    //           'required': false,
    //           'checked': false,
    //           'label': '职业',
    //           'type': 'select',
    //           'depth': 3,
    //           'dataSource': [{
    //             'key': 'carrer1',
    //             'label': '艺术/媒体/传播',
    //             'type': 'select',
    //             'dataSource': [
    //               {'key': 'carrer1_key1', 'label': '娱乐'}
    //             ]
    //           }
    //           ]
    //         },
    //         {
    //           'key': 'source_funds',
    //           'checked': false,
    //           'required': false,
    //           'label': '资金来源',
    //           'type': 'select',
    //           'system': true,
    //           'depth': 2,
    //           'dataSource': [
    //             {'key': '0', 'label': '存款/投资'},
    //             {'key': '1', 'label': '夫妻/父母/家人'},
    //             {'key': '2', 'label': '利益/借款'},
    //             {'key': '3', 'label': '私人养老金'},
    //             {'key': '4', 'label': '国家养老金'},
    //             {'key': '5', 'label': '其他'}
    //           ]
    //         },
    //         {
    //           'key': 'annual_revenue',
    //           'checked': false,
    //           'required': false,
    //           'label': '估计净值',
    //           'type': 'select',
    //           'system': true,
    //           'depth': 2,
    //           'dataSource': [
    //             {'key': '0', 'label': '低于$15000'},
    //             {'key': '1', 'label': '$15000-$24999'},
    //             {'key': '2', 'label': '$25000-$49999'},
    //             {'key': '3', 'label': '$50000-$99999'},
    //             {'key': '4', 'label': '$100000-$249999'},
    //             {'key': '5', 'label': '$255000或更多'}
    //           ]
    //         },
    //         {
    //           'key': 'net_worth',
    //           'checked': false,
    //           'required': false,
    //           'label': '预计年收入',
    //           'type': 'select',
    //           'system': true,
    //           'depth': 2,
    //           'dataSource': [
    //             {'key': '0', 'label': '低于$15000'},
    //             {'key': '1', 'label': '$15000-$24999'},
    //             {'key': '2', 'label': '$25000-$49999'},
    //             {'key': '3', 'label': '$50000-$99999'},
    //             {'key': '4', 'label': '$100000-$249999'},
    //             {'key': '5', 'label': '$255000或更多'}
    //           ]
    //         },
    //         {
    //           'key': 'engaged_transaction',
    //           'checked': false,
    //           'required': false,
    //           'label': '您从事过的交易',
    //           'type': 'select',
    //           'system': true,
    //           'depth': 2,
    //           'dataSource': [
    //             {'key': '0', 'label': '外汇'},
    //             {'key': '1', 'label': '差价和约'},
    //             {'key': '2', 'label': '无'}
    //           ]
    //         },
    //         {
    //           'key': 'invest_knowledge',
    //           'checked': false,
    //           'required': false,
    //           'label': '您的投资知识',
    //           'type': 'select',
    //           'depth': 2,
    //           'system': true,
    //           'dataSource': [
    //             {'key': '0', 'label': '我曾经完成或注册过交易课程'},
    //             {'key': '1', 'label': '我的交易全基于自己的经验'},
    //             {'key': '2', 'label': '我有相关的工作或证书,亦表示我已了解您的产品和服务,以及当中所涉及的风险。'}
    //           ]
    //         }
    //       ],
    //       'files': [
    //         {'key': 'id_card', 'checked': false, 'label': '身份证/护照', 'type': 'upload', 'system': true, 'depth': 1},
    //         {'key': 'address_proof', 'checked': false, 'label': '居住证明', 'type': 'upload', 'system': true, 'depth': 1},
    //         {
    //           'key': 'incorporation_cert',
    //           'checked': false,
    //           'label': '公司注册证书',
    //           'type': 'upload',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'organization_article',
    //           'checked': false,
    //           'label': '公司注册章程',
    //           'type': 'upload',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'shareholders_list',
    //           'checked': false,
    //           'label': '股东名单',
    //           'type': 'upload',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {'key': 'directors_list', 'checked': false, 'label': '董事名单', 'type': 'upload', 'system': true, 'depth': 1},
    //         {
    //           'key': 'shareholders_passport',
    //           'checked': false,
    //           'label': '股东所有护照',
    //           'type': 'upload',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'shareholders_proof',
    //           'checked': false,
    //           'label': '股东所有居住证明',
    //           'type': 'upload',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'company_bank_address',
    //           'checked': false,
    //           'label': '公司银行',
    //           'type': 'upload',
    //           'system': true,
    //           'depth': 1
    //         },
    //         {
    //           'key': 'file_status',
    //           'checked': false,
    //           'required': false,
    //           'label': '文件状态',
    //           'system': true,
    //           'depth': 2,
    //           'dataSource': [
    //             {'key': '0', 'checked': false, 'label': '文件已通过'},
    //             {'key': '1', 'checked': false, 'label': '文件已拒绝'},
    //             {'key': '2', 'checked': false, 'label': '文件不清晰'},
    //             {'key': '3', 'checked': false, 'label': '文件不完整'},
    //             {'key': '4', 'checked': false, 'label': '文件过期'},
    //             {'key': '5', 'checked': false, 'label': '文件与系统内个人资料不相符'},
    //             {'key': '6', 'checked': false, 'label': '文件错误'},
    //             {'key': '7', 'checked': false, 'label': '文件未签名'}
    //           ]
    //         }
    //       ],
    //       '123123123123': [
    //         {'key': 'c_last_name', 'checked': false, 'required': false, 'label': 'c 姓氏', 'type': 'input'},
    //         {'key': 'c_middle_name', 'checked': false, 'required': false, 'label': 'c 中间名', 'type': 'input'}
    //       ]
    //     },
    //     'custom': {'123123123123': '自定义分类'}
    //   })
    // })
  },
  saveProfile (params) {
    var url = '/api/resource/config/edit_user_info_setting'
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
  // 检查用户资料名称是否重复
  checkProfileName (params) {
    var url = '/api/resource/config/check_user_info_setting_name'
    console.log('检查用户资料名称是否重复')
    console.log('params', url, params)
    return fetch(url, params)
  },
  deleteProfile (params) {
    var url = '/api/resource/config/delete_user_info_setting'
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
  deleteResource (params) {
    var url = '/api/resource/config/delete_user_info_setting_key'
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
  saveResource (params) {
    var url = '/api/resource/config/edit_custom_user_info_setting'
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
  uploadCDN (params) {
    var url = '/upload-cdn'
    console.log('params', url, params)
    return fetch(url, params)
  },
  deleteCustomResource (params) {
    var url = '/api/resource/config/delete_custom_user_info_setting_key'
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
  addResource (params) {
    var url = '/api/resource/config/add_user_info_setting_key'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'key': '123123123123'
    //   })
    // })
  },
  addProfile (params) {
    var url = '/api/resource/config/add_new_user_info_setting'
    console.log('params', url, params)
    return fetch(url, params)
  },
  copyProfile (params) {
    var url = '/api/resource/config/copy_new_user_info_setting'
    console.log('params', url, params)
    return fetch(url, params)
  },
  addCustomResource (params) {
    var url = '/api/resource/config/add_custom_user_info_setting_key'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'key': '123123123123'
    //   })
    // })
  },
  editCls (params) {
    var url = '/api/resource/config/edit_custom_user_info_setting_key'
    console.log('params', url, params)
    return fetch(url, params)
  },
  getCustomizedSetting (params) {
    var url = '/api/resource/config/get_custom_user_info_setting'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'data': {
    //       'base_info': [
    //         {
    //           'key': 'last_name_new',
    //           'checked': false,
    //           'required': false,
    //           'label': '姓氏(custom)',
    //           'type': 'input',
    //           placeholder: '',
    //           rules: [],
    //           file: {},
    //           dataSource: [],
    //           'system': true,
    //           'depth': 1
    //         }
    //       ],
    //       'investor_info': [
    //         {
    //           'key': 'working_condition_custom',
    //           'checked': false,
    //           'required': false,
    //           'label': '工作状态(new)',
    //           'type': 'select',
    //           placeholder: '',
    //           rules: [],
    //           file: {},
    //           'system': true,
    //           'depth': 2,
    //           'dataSource': [
    //             {'key': '0', 'label': '受雇'},
    //             {'key': '1', 'label': '无业'},
    //             {'key': '2', 'label': '退休'},
    //             {'key': '3', 'label': '自雇'},
    //             {'key': '4', 'label': '学生'}
    //           ]
    //         },
    //         {
    //           'key': 'career_field_custom',
    //           'required': false,
    //           'checked': false,
    //           'label': '职业(new)',
    //           'type': 'select',
    //           placeholder: '',
    //           rules: [],
    //           file: {},
    //           dataSource: [],
    //           'depth': 1
    //         }
    //       ],
    //       'files': [
    //         {
    //           'key': 'id_card',
    //           'checked': false,
    //           'label': '身份证/护照',
    //           'type': 'upload',
    //           'system': true,
    //           placeholder: '',
    //           rules: [],
    //           file: {},
    //           dataSource: [],
    //           'depth': 1
    //         },
    //         {
    //           'key': 'file_status',
    //           'checked': false,
    //           'required': false,
    //           'label': '文件状态',
    //           'system': true,
    //           'depth': 2,
    //           placeholder: '',
    //           rules: [],
    //           file: {},
    //           'dataSource': [
    //             {'key': '0', 'checked': false, 'label': '文件已通过'},
    //             {'key': '1', 'checked': false, 'label': '文件已拒绝'},
    //             {'key': '2', 'checked': false, 'label': '文件不清晰'},
    //             {'key': '3', 'checked': false, 'label': '文件不完整'},
    //             {'key': '4', 'checked': false, 'label': '文件过期'},
    //             {'key': '5', 'checked': false, 'label': '文件与系统内个人资料不相符'},
    //             {'key': '6', 'checked': false, 'label': '文件错误'},
    //             {'key': '7', 'checked': false, 'label': '文件未签名'}
    //           ]
    //         }
    //       ],
    //       '123123123123': [
    //         {
    //           'key': 'c_last_name',
    //           'checked': false,
    //           'required': false,
    //           'label': 'c 姓氏',
    //           'type': 'input',
    //           'depth': 1,
    //           placeholder: '',
    //           rules: [],
    //           file: {},
    //           dataSource: []
    //         },
    //         {
    //           'key': 'c_middle_name',
    //           'checked': false,
    //           'required': false,
    //           'label': 'c 中间名',
    //           'type': 'input',
    //           placeholder: '',
    //           rules: [],
    //           file: {},
    //           dataSource: [],
    //           'depth': 1
    //         }
    //       ]
    //     },
    //     'custom': {'123123123123': '自定义分类'}
    //   })
    // })
  }
}

