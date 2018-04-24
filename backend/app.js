var express = require('express')
var app = express()
app.use('/static', express.static('public'))
app.get('/api', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Cache-control', 'max-age=100000000')
  console.log('get api')
  // res.set('Access-Control-Allow-Origin', 'http://www.ruanyifeng.com')
  res.send('Hello: ' + new Date())
})

var server = app.listen(3000, function () {
  var {host, port} = server.address()
  console.log('host, port', host, port)
})