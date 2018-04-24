var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  configCenterUrl: 'http://192.168.15.239:8080',
  port: 8081
})
