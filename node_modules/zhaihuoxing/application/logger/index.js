/**
 * logger.js
 * 日志模块，可同时打印至控制台和文件
 */

const winston = require('winston')

let logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      colorize: true,
      timestamp: true
    })
    // new (winston.transports.File)({
    //     filename: './winston.log'
    // }),
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({timestamp: true})
  ],
  exitOnError: false
})

module.exports = logger
