module.exports = (app) => {
  const path = require('path')
  const favicons = require('connect-favicons')
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')
  const express = require('express')
  const config = app.get('config')
  app.use('/static', express.static(path.join(__dirname, '../../dist/static')))
  // app.use(favicons(path.join(__dirname, '../../static')));
  console.log(config)
  app.set('views', path.join(process.cwd(), '/src/layout/'))
  app.set('view engine', 'pug')
  app.set('view cache', false)
  // body parser, json
  app.use(bodyParser.json({
    limit: '100kb' // 此为默认值，若有需要可以更改
  }))
  // body parser, urlencoded
  app.use(bodyParser.urlencoded({
    extended: false, // 设置为false以关闭一些无需使用的高级特性
    limit: '100kb' // 此为默认值，若有需要可以更改
  }))
  // cookie parser
  app.use(cookieParser())
}
