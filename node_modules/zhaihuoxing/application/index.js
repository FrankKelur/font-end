const express = require('express')
const middleWare = require('./middleWare')
const routes = require('./routes')

function initApp (config) {
  let app = express()
  app.set('config', config)
  middleWare(app)
  app.use('/', routes)
  return app
}

module.exports = initApp
