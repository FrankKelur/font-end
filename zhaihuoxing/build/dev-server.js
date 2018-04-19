require('./check-versions')()
require('./init')
var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
  process.env.PORT = JSON.parse(config.dev.env.port)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var url = require('url')
// var proxyMiddleware = require('http-proxy-middleware')
const proxy = require('express-http-proxy')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
var app = require('../application')(config[process.env.NODE_ENV === 'development' ? 'dev' : (process.env.NODE_ENV === 'testing' ? 'testing' : 'build')])
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000,
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('done', function (compilation) {
  hotMiddleware.publish({
    action: 'reload'
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  app.use('/api', proxy(options.target, {
    proxyReqPathResolver: function (req) {
      console.log('url.parse(req.url).path', url.parse(req.url).path)
      return '/api' + url.parse(req.url).path
    }
  }))
})

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)
// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
// app.use('/tmp-preview', express.static('./tmp'))
app.set('views', path.join(process.cwd(), '/src/layout/'))
app.set('view engine', 'pug')
app.set('view cache', false)
var routes = require('../application/routes')
app.use('/', routes)

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
