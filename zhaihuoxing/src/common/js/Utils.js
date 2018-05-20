import _fetch from './fetch'
import _constants from './constants'
import _validator from './validator'

var utils = {
  fetch: _fetch,
  constants: _constants,
  validator: _validator,
  debounce: function (handle, delay = 100) {
    var t = null
    clearTimeout(t)
    t = setTimeout(() => {
      handle && handle()
    }, delay)
  },
  // eg: Utils.safeGet(obj, 'name.firstName', 'none')  等于  obj.name.firstName 如果取不到，返回  'none'
  safeGet: function (keyStr, defaultVal = '') {
    console.log('safeGet', keyStr, defaultVal)
    var target = this
    try {
      var keys = keyStr.split('.')
      for (var idx in keys) {
        var key = keys[idx]
        target = target[key]
        if (typeof target === 'undefined' || target === null) {
          return defaultVal
        }
      }
    } catch (ex) {
      target = defaultVal
    }
    return target
  },
  checkUnique: function (params) {
    var url = '/api/public/check_unique'
    return _fetch(url, params).then(res => {
      return !!res.re
    }).catch(() => {
      return false
    })
  },
  // 检查用户资料设置 添加名称是否重复
  checkProfileName: function (params) {
    var url = '/api/resource/config/check_user_info_setting_name'
    return _fetch(url, params).then(res => {
      return !!res.re
    }).catch(() => {
      return false
    })
  },
<<<<<<< HEAD
=======
  // 检查出入金操作货币数值
  checkCurrencyValue: function (params) {
    var url = '/api/resource/funding/check_currency_value'
    return _fetch(url, params)
  },
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  // 检查Mt4服务器名称是否重复
  checkMt4ServerName: function (params) {
    var url = '/api/resource/channel/check_mt4server_name'
    return _fetch(url, params).then(res => {
      return !!res.re
    }).catch(() => {
      return false
    })
  },
  getOptionList: function (params, url) {
    return _fetch(url, params)
  },
  getComponentUrl (params) {
    var url = '/api/public/get_component_url'
    return fetch(url, params)
  }
}

export const constants = _constants
export const validator = _validator
export const fetch = _fetch
export default utils
