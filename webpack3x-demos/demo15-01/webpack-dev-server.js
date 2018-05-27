var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

var config = require('./webpack.config')
var options = {
  contentBase: './build',
  hot: true,
  host: 'localhost'
}
// config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080')
WebpackDevServer.addDevServerEntrypoints(config, options)
var compiler = webpack(config)
var server = new WebpackDevServer(compiler, options)
server.listen('8080')