var all = {
  'zh-CN': {
    confirm: '确定',
    tooltip: '提示',
    more: '查看更多',
    memberLayout: '会员级别',
    memberTree: '会员级别网',
    joinDate: '加入时间',
    role: '身份',
    username: '姓名',
    email: '邮箱',
    insuranceAccountDepositAmount: '保险账号入金量',
    insuranceAccountAmount: '保险账号余额'
  },
  'zh-TW': {
    confirm: '確定',
    tooltip: '提示',
    more: '查看更多',
    memberLayout: '會員級別',
    memberTree: '會員級別網',
    joinDate: '加入時間',
    role: '身份',
    username: '姓名',
    email: '郵箱',
    insuranceAccountDepositAmount: '保險賬號入金量',
    insuranceAccountAmount: '保險賬號餘額'
  },
  'en': {
    confirm: 'Confirm',
    tooltip: 'Hint',
    more: 'See More',
    memberLayout: 'Membership Level',
    memberTree: 'Membership Network',
    joinDate: 'Date of Joining',
    role: 'Status',
    username: 'Full Name',
    email: 'Email',
    insuranceAccountDepositAmount: 'Deposit Amount of Assurance Account',
    insuranceAccountAmount: 'Balance of Assurance Account'
  }
}

import cookie from 'cookie'
var lang = cookie.get('lang') || 'en'
export default all[lang]
