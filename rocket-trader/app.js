var express = require('express')
var expressApp = express()
require('./websocket-server')

expressApp.use('/', express.static('./', {
  maxAge: 60 * 1000 * 1000,
  etag: false
}))

var server = expressApp.listen(3000, function () {
  var {host, port} = server.address()
  console.log('host, port', host, port)
})