var moment = require('moment')
var fs = require('fs')
var path = require('path')
var day = moment().format('YYYY-MM-DD')
var filePath = path.resolve(__dirname, `./data/${day}.json`)
var unionKeys = ["LTC", "ETH", "ETC", "BTS", "QTUM", "HSR", "XRP", "DASH", "BCD", "SBTC", "BCX", "LBTC", "CHAT", "TOPC", "BAT", "QUN", "DOGE", "NEO", "OMG", "BTM", "SNT",
    "ICX", "ZRX", "MANA", "RCN", "MCO", "KNC", "GNT", "MTL", "XEM", "KAN", "ADA", "XWC", "DGB", "XMR", "ZEC", "TRX", "BCH", "DCR", "POWR", "LSK", "SRN", "PAY"]
var hot = ["LTC", "ETH", "ETC", "QTUM", "HSR", "DASH", "NEO", "OMG", "BTM", "KNC", "GNT", "MTL", "XEM", "ADA"]
// var list = ["CMT", "BLZ", 'EOS', "BTG"]
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "{}")
}

var dataCache = require(filePath)
var express = require('express')

var router = express.Router()

function flushReport() {
    // 把js对象转成json，写入文件中
    fs.writeFileSync(filePath, JSON.stringify(dataCache))
    // if (new Date().getMinutes() % 10 === 0) {
    //     fs.writeFileSync(filePath, JSON.stringify(dataCache))
    // }
}

router.post('/report-table', function (req, res) {
    var keys = unionKeys
    if (req.body.hot) {
        keys = hot
    }
    var huobiKey = 'https://www.hbg.com'
    var cryKey = 'https://www.cryptopia.co.nz'
    var zbKey = 'https://www.zb.cn'
    var filePath = path.resolve(__dirname, 'data', req.body.date + '.json')
    var currData = JSON.parse(fs.readFileSync(filePath))
    var x = Object.keys(currData)
    var y = x.reduce((fin, key) => {
        var item = currData[key]
        var huobi = item[huobiKey] || {}
        var cry = item[cryKey] || {}
        var zb = item[zbKey] || {}
        // var origins = [{obj: cry, label: 'cry'}, {obj: zb, label: 'zb'}]
        // var origins = [{obj: huobi, label: 'huobi'}, {obj: cry, label: 'cry'}, {obj: zb, label: 'zb'}]
        var origins = [{obj: huobi, label: 'huobi'}, {obj: zb, label: 'zb'}]
        // var origins = [{obj: huobi, label: 'huobi'}, {obj: cry, label: 'cry'}]
        var res = keys.reduce((result, inKey) => {
            var valList = origins.map(origin => origin.obj[inKey]).filter(val => !!val)
            if (valList.length >= 2) {
                var max = Math.max(...valList)
                var min = Math.min(...valList)
                console.log('valList', valList, max, min, origins);
                var percent = (max - min) / min * 100
                var maxLabel = origins.find(origin => origin.obj[inKey] == max).label
                var minLabel = origins.find(origin => origin.obj[inKey] == min).label
                result[inKey] = {val: percent, label: maxLabel + ' - ' + minLabel}
            }
            return result
        }, {})
        if (Object.keys(res).length > 0) {
            fin[key] = res
        }
        return fin
    }, {})
    res.json({re: 200, table: {x, keys, y}})
})

router.post('/report', function (req, res) {
    var origin = req.headers.origin
    // console.log('req.headers.origin, body: ', origin, req.body)
    var {time, info} = req.body
    time = moment(time).format('YYYY-MM-DD hh:mm')
    if (!dataCache[time]) {
        dataCache[time] = {}
    }
    dataCache[time][origin] = unionKeys.reduce((res, key) => {
        res[key] = parseFloat(info[key])
        return res
    }, {})
    flushReport()
    res.json({re: 200})
})

router.post('/date-list', function (req, res) {
    var list = fs.readdirSync(path.resolve(__dirname, 'data')).map(item => item.split('.')[0])
    res.json({re: 200, data: list.reverse()})
})
module.exports = router
