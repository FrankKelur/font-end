var express = require('express')
var app = express()
app.use('/', express.static('dist', {
  maxAge: 60 * 1000 * 1000,
  etag: false
}))

var server = app.listen(8080, function () {
  var {host, port} = server.address()
  console.log('host, port', host, port)
})
