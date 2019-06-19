var express = require('express')
var fs = require('fs')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var say = require('say')
let data = require('./res.json');
let list = Object.keys(data).map(key => ({ key, val: data[key] }));
var app = express()
const _ = require('lodash');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/static', express.static('public', {
    maxAge: 60 * 1000 * 1000,
    etag: false
}))

const sayWord = (word) => {
    return new Promise((resolve) => {
        say.speak(word, 'Alex', 1, (error) => {
            if (error) {
                console.log('error', error);
            }
            resolve(true);
        });
    });
}
const service = require('./service.js');
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
app.use(allowCrossDomain);

app.post('/api/getData', function (req, res) {
    let { pageSize, pageNum, type, errorOnly, errorTime } = req.body;
    service.getData(type, pageNum, pageSize, errorOnly, errorTime).then(({ data, total }) => {
        // 保存
        res.json({ 're': 200, data, total })
    });
})

let requestKey = '';
app.post('/api/sayWord', async (req, res) => {
    // let newRequestKey = JSON.stringify(req.body);
    // if (newRequestKey == requestKey) {
    //     return res.json({ 're': '501' });
    // }
    // requestKey = newRequestKey;
    let { word } = req.body;
    await sayWord(word);
    // requestKey = '';
    res.json({ 're': 200 })
})


app.post('/api/setData', function (req, res) {
    console.log('/api/setData', req.body)
    let { data, type, pageNum, pageSize, errorOnly, errorTime } = req.body;
    service.setData(type, data, pageSize, pageNum, errorOnly, errorTime).then((message) => {
        // 保存
        res.json({ 're': 200, message })
    });
})

app.post('/api/deleteWord', function (req, res) {
    let { key, type } = req.body;
    service.deleteWord(type, key).then(() => {
        // 保存
        res.json({ 're': 200 })
    });
})

var server = app.listen(3011, function () {
    var { host, port } = server.address()
    console.log('host, port', host, port)
})