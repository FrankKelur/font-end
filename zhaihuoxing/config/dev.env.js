var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
<<<<<<< HEAD
  configCenterUrl: 'http://192.168.15.239:8080',
=======
  // configCenterUrl: 'http://192.168.15.239:8080',
  configCenterUrl: 'http://192.168.15.182:8080', // hcy
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  port: 8081
})
