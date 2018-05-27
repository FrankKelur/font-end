var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser())
app.use('/static', express.static('public', {
  maxAge: 60 * 1000 * 1000,
  etag: false
}))
app.get('/api/*', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Cache-control', 'max-age=100000000')
  console.log('get api 2', req.cookies)
  // res.set('Access-Control-Allow-Origin', 'http://www.ruanyifeng.com')
  res.send('Hello 2: ' + new Date())
})
app.get('/set', function (req, res) {
  res.cookie('token', 'zhai', {httpOnly:true})
  res.json({'re': 200})
})

var server = app.listen(3000, function () {
  var {host, port} = server.address()
  console.log('host, port', host, port)
})