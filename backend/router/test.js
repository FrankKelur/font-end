// var moment = require('moment')
var fs = require('fs')
var path = require('path')
// var day = moment().format('YYYY-MM-DD')
// var day = '2018-07-19'
// var filePath = `./data/${day}`
// if (!fs.existsSync(filePath + '.json')) {
//     fs.writeFileSync(filePath + '.json', "{}")
// }
// var dataCache = require(filePath)
// console.log('dataCache', dataCache)

var list = fs.readdirSync(path.resolve(__dirname, 'data'))
console.log(list)