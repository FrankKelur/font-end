let allConfig = require('./config')
require('./build/init')
let config
if (process.argv) {
  config = allConfig[process.argv[2]]
  process.env.NODE_ENV = JSON.parse(config.env.NODE_ENV)
}
let app = require('./application')(config)
const cluster = require('cluster')
const logger = require('./application/logger/')
const {port} = app.get('config')
const numOfProcesses = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numOfProcesses; i++) {
    cluster.fork()
  }
} else {
  app.listen(port, function () {
    logger.info('Server start on %s:%s', port)
  })
}
