const notifier = require('node-notifier')
const path = require('path')

notifier.notify({
  title: '提示',
  message: '这是我的第一条notifier提示！',
  icon: path.join(__dirname, 'build', 'logo.png'),
  sound: true,
  wait: true
}, function (err, res) {
  console.log('err, res', err, res)
})

notifier.on('click', function (notifierObj, opts) {
  console.log('Trigger while wait is true and user click the notification')
})

notifier.on('timeout', function (notifierObj, opts) {
  console.log('Trigger while wait is true and the notification closes')
})
