var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  PORT: '6789',
  configCenterUrl: 'https://newtestconfig.chatecdn.com',
})
