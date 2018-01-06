module.exports = (app) => {
  const logger = require('../logger')
  app.use((req, res, next) => {
    let {method, host, url} = req
    logger.info('%s - %s%s', method, host, url)
    next()
  })
}
