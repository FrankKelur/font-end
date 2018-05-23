import validator from './validator'

// const numberRule = /^[1-9][0-9]*$/
const numberRule = /^[0-9]*$/
const longTextRule = /^[\s\S]{0,10000}$/
const noChinese = /^[^\u4e00-\u9fa5]+$/

const constants = {
  pages: [10, 15, 20, 50],
  mainInvestPwd: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[a-zA-Z0-9]{6,15}$/, // z todo 6-15个字符，必须至少包括大小写字母、数字中的其中两种
  passwordReg: /^(?![0-9A-Za-z]+$)(?![0-9\W_]+$)(?![a-zA-Z\W_]+$)[a-zA-Z0-9\W_]{8,25}$/, // 8-25个字符，必须包括大小写字母、数字及特殊字符
  pwdRule1: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\W_]+$)[a-zA-Z0-9\W_]{8,25}$/, // z todo 8-25个字符，必须至少包括大小写字母、数字及特殊字符中的其中两种
  pwdRule2: /^[\s\S]{8,25}$/,
  length30LimitNoSpace: /^[\S]{1,30}$/, // 不能有空格
  noSpace: /^\S*$/,
  qianhouNoSpace: /^\S+|\S+$/, // 前后不能有空格
  onlyNumber: /^(-?\d+)(\.\d+)?$|^$/, // 实数
  mustNumber: /^[0-9]*$/, // 只能输入数字，不可有空格
  mustNumber2: /^[0-9]*(\.[0-9]+)?$/, // 只能输入数字，不可有空格，可有小数点
  length30Limit: /^[\s\S]{0,30}$/,
  length14Limit: /^[\s\S]{0,14}$/,
  length128Limit: /^[\s\S]{0,128}$/,
  length48Limit: /^[\s\S]{0,48}$/,
  length32Limit: /^[\s\S]{0,32}$/,
  length96Limit: /^[\s\S]{0,96}$/,
  length16Limit: /^[\s\S]{0,16}$/,
  variable0To128: /^[a-zA-Z0-9_]{0,128}$/,
  uidReg: /^[a-zA-Z0-9]{5,15}$/,
  text0To10Reg: /^[\s\S]{0,10}$/,
  text0To30Reg: /^[\s\S]{0,30}$/,
  text0To128Limit: /^[\s\S]{0,128}$/,
  text0To10000Limit: /^[\s\S]{0,10000}$/,
  text0To25Reg: /^[\s\S]{0,25}$/,
  text0To128Reg: /^[\s\S]{0,128}$/,
  text0To40Reg: /^[\s\S]{0,40}$/,
  longTextRule: longTextRule,
  numberRule: numberRule,
  floatNumberRule: /^[1-9]\d*\.\d{1,2}$|^0\.\d{1,2}$|^[1-9][0-9]*$/,
  noChinese: noChinese,
  /* eslint-disable*/
  phoneReg: /^[\(\d+\)]{0,32}$/,
  emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ruleMap: {
    required: {
      name: 'required',
      required: true,
      trigger: 'blur,change',
      test (val) {
        console.log('custom required')
        if (Array.isArray(val)) {
          return !!val.length
        } else {
          return !!val
        }
      },
      validator: validator.validate,
      message: ''
    },
    number: {
      name: 'number',
      trigger: 'blur,change',
      regex: numberRule,
      validator: validator.validate,
      message: ''
    },
    longText: {
      name: 'longText',
      trigger: 'blur,change',
      regex: longTextRule,
      validator: validator.validate,
      message: ''
    }
  },
  langList: [
    {
      icon: 'china',
      key: 'zh-CN',
      label: '中文简体'
    },
    {
      icon: 'america',
      key: 'en',
      label: 'English'
    },
    {
      icon: 'china',
      key: 'zh-TW',
      label: '中文繁體'
    }
    // {
    //   icon: '',
    //   key: 'mala',
    //   label: 'Mala'
    // }
  ]
}
export default constants
