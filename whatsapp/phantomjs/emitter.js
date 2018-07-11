const mitt = require('mitt')
const emitter = mitt()
emitter.on('getCode', function (data) {
  console.log('getCode', data)
})

emitter.on('loginSuccess', function (data) {
  console.log('loginSuccess', data)
})

emitter.on('dataReady', function (data) {
  console.log('dataReady', data)
})

emitter.on('clearFinished', function (data) {
  console.log('clearFinished', data)
})
module.exports = emitter