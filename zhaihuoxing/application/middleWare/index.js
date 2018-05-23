module.exports = (app) => {
  let resourceLogger = require('./resourceLogger')
  let config = require('./config')

  resourceLogger(app)
  config(app)
}
