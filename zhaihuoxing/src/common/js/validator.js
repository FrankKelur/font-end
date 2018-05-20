export default {
  validate (rule, value, callback) {
    console.log('arguments', arguments)
    if (rule.regex instanceof RegExp) { // 验证正则
<<<<<<< HEAD
      callback(rule.regex.test(value) ? undefined : rule.message)
=======
      callback(rule.regex.test(value) || !value ? undefined : rule.message) // value 为undefined的时候，正则通过（解耦 regex验证和required验证）
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    } else if (typeof rule.test === 'function') { // 验证rule里传来的test函数
      var res = rule.test(value)
      if (typeof res === 'boolean') {
        callback(res ? undefined : rule.message)
      } else {
        res.then(valid => { // 验证rule里传来的test异步函数
          console.log('valid', valid, rule)
          if (typeof valid === 'object') { // 自定义表单验证，验证文案后端决定
<<<<<<< HEAD
            var { re, message } = valid
=======
            var {re, message} = valid
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
            callback(re === '200' ? undefined : message)
          } else {
            callback(valid ? undefined : rule.message)
          }
        }).catch(() => {
          callback(rule.message)
        })
      }
    }
  }
}
