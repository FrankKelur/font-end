var express = require('express')
var fs = require('fs')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
// var router = require('./router')
var dataRouter = require('./router/dataRouter')
var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.use('/static', express.static('public', {
    maxAge: 60 * 1000 * 1000,
    etag: false
}))
var allowCrossDomain = function (req, res, next) {
    // console.log('req.origin', req.headers)
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
app.use(allowCrossDomain);
// app.use('/api', router)
app.use('/trade', dataRouter)

app.get('/set', function (req, res) {
    res.cookie('token', 'zhai', {httpOnly: true})
    res.json({'re': 200})
})
app.post('/redpacket/getInviterInfo', function (req, res) {
    console.log('redpacket/getInviterInfo  called', req.body)
    res.json({'re': 200})
})

var server = app.listen(3011, function () {
    var {host, port} = server.address()
    console.log('host, port', host, port)
})