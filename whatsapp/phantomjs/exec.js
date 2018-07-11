const webPage = require('webpage')
const page = webPage.create()
const emitter = require('./emitter')
const utils = require('./utils')
var waitFor = utils.waitFor
// var printArgs = utils.printArgs
// var counter = utils.counter

page.onConsoleMessage = function (msg) {
  console.warn(msg)
}

// page.onLoadStarted = function () {
//   counter.toGet++
//   console.log('page.onLoadStarted')
//   printArgs.apply(this, arguments)
// }
// page.onLoadFinished = function () {
//   counter.got++
//   console.log('page.onLoadFinished')
//   printArgs.apply(this, arguments)
// }

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'

page.open('https://web.whatsapp.com/', function (status) {
// page.open('https://www.jianshu.com/p/15cba843bb55', function (status) {
  console.log('status', status)
  if (status !== 'success') {
    console.log('Unable to access network')
  } else {
    setTimeout(function () {
      // var src = 'zhai'
      var src = page.evaluate(function () {
        var map = new Map()
        map.set('zhai', 'pengchao')
        console.log(map)
        var img = document.querySelector('img')
        return (img && img.src)
      })
      console.log('=================src=================')
      console.log(src)
      page.render('whatsapp-success.png')
      phantom.exit()
    }, 3500)
    // waitFor(function () {
    //   console.log('evaluate')
    //   var src = page.evaluate(function () {
    //     var img = document.querySelector('img')
    //     return (img && img.src);
    //   });
    //   console.log(src);
    //   return (src)
    // }, function (src) {
    //   emitter.emit('getCode', {src: src})
    //   phantom.exit()
    //   // page.render('whatsapp-success.png')
    // }, 300000, page, 'whatsapp.png') //< Default Max Timeout is 3s
  }
})
