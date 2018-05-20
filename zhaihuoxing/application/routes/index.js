const Path = require('path')
const request = require('request').defaults({jar: true})
const express = require('express')
const logger = require('../logger/')
var multer = require('multer')
var fs = require('fs')
var uploadDir = 'tmp/'
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const upload = multer({'dest': uploadDir})
let router = express.Router()

function getPageConfig (originReq, cb) {
  var url = originReq.url
  var config = originReq.app.get('config')
  var backendUrl = config['proxyTable']['/api']['target']
  // 根据url，token，获取页面配置
  var host = originReq.headers.host
  // 先去掉host的端口号
  host = host.substring(0, host.lastIndexOf(':') === -1 ? host.length : host.lastIndexOf(':'))
  return request.post({
    url: backendUrl + '/api/public/get_page_components',
    body: {
      url: url
    },
    headers: {
      Host: host,
      Origin: host
    },
    jar: getCookieJar(originReq, backendUrl),
    json: true
  }, cb)
}

function getCookieJar (originReq, backendUrl) {
  console.log('originReq.cookies.token', originReq.cookies, originReq.cookies.token)
  let j = request.jar()
  var cookieLang = request.cookie('lang=' + (originReq.cookies.lang || ''))
  var cookieToken = request.cookie('token=' + (originReq.cookies.token || ''))
  j.setCookie(cookieLang, backendUrl)
  j.setCookie(cookieToken, backendUrl)
  return j
}

function getManifest (renderData) {
  let manifest = {
    jsList: [],
    cssList: []
  }
  if (renderData.error) {
    return manifest
  }
  var componentsArray = []
  for (var list in renderData.components) {
    // console.log('name', renderData.components[idx].name)
    renderData.components[list].componentsName = list
    componentsArray.push(renderData.components[list])
  }
  componentsArray.sort((o1, o2) => {
    o1[o1.componentsName + '_auth'].index - o2[o2.componentsName + '_auth'].index
  })

  // 开发环境，不使用hash 后的静态文件
  if (process.env.NODE_ENV === 'development') {
    manifest.jsList.push('/main.js')
    manifest.jsList.push('/components.js')
    manifest.jsList.push(`/layout/${renderData.page_info.layout}/index.js`)
    manifest.jsList.push(`/${renderData.broker_setting.theme}.js`)
    componentsArray.forEach((el) => {
      manifest.jsList.push(`/page/${el.componentsName}/index.js`)
    })
  } else {
    var manifestMap = require(Path.join(__dirname, '../../dist/manifest.json'))
    manifest.cssList.push(manifestMap['main.css'])
    manifest.cssList.push(manifestMap[`layout/${renderData.page_info.layout}/index.css`])
    manifest.cssList.push(manifestMap[`${renderData.broker_setting.theme}.css`])
    manifest.cssList.push(manifestMap['main.css'])
    manifest.jsList.push(...[
      manifestMap['manifest.js'],
      manifestMap['vendor.js'],
      manifestMap['main.js'],
      manifestMap['components.js']
    ])
    componentsArray.forEach((el) => {
      manifest.jsList.push(manifestMap[`page/${el.componentsName}/index.js`])
      manifest.cssList.push(manifestMap[`page/${el.componentsName}/index.css`])
    })
    manifest.jsList = manifest.jsList.map(js => '/' + js)
    manifest.cssList = manifest.cssList.map(css => '/' + css)
  }
  return manifest
}

function getColor (body) {
  let color = [
    {
      key: '@A',
      value: body.broker_setting.main_color
    },
    {
      key: '@B',
      value: body.broker_setting.auxiliary_color
    },
    {
      key: '@C',
      value: body.broker_setting.text_color
    },
    {
      key: '@D',
      value: body.broker_setting.line_color
    },
    {
      key: '@E',
      value: body.broker_setting.positive_color
    },
    {
      key: '@F',
      value: body.broker_setting.alert_color
    },
    {
      key: '@G',
      value: body.broker_setting.negative_color
    },
    {
      key: '@H',
      value: body.broker_setting.bright_color
    },
    {
      key: '@I',
      value: body.broker_setting.form_color
    },
    {
      key: '@J',
      value: body.broker_setting.header_color
    }
  ]
  return color
}

router.get('/pages/*', function (req, res) {
  getPageConfig(req, function (err, result, body) {
    // node err
    if (err) {
      logger.info(err)
    } else {
      let lang = req.cookies.lang || body.broker_setting.default_lang
      body.user_setting = {
        lang: lang
      }
      body.color = getColor(body)
      req.app.locals.renderData = body
      req.app.locals.manifest = getManifest(body)
      // get components error
      if (body.error) {
        res.render('./error/')
      } else {
        res.render(`./${body.page_info.layout}/`)
      }
    }
  })
})

router.post('/upload-cdn', jsonParser, function (req, res) {
  var filename = req.body.originPath
  var config = req.app.get('config')
  console.log('req.body', req.body)
  if (filename) {
    uploadCDN(filename, config, function () {
      res.json({re: 200, url: '/preview/' + filename})
    })
  }
})

router.post('/upload', upload.single('file'), function (req, res) {
  var filePath = './tmp/' + req.file.filename
  setFileExpired(filePath, 3 * 60 * 1000)
  res.json({re: 200, filename: req.file.filename})
})

function uploadCDN (fileName, config, cb) {
  var formData = {
    fileName: fileName,
    file: fs.createReadStream(Path.join(__dirname, '../../tmp/', fileName))
  }
  request.post({
    url: `${config.env.configCenterUrl}/upload-file`,
    formData: formData
  }, function (err, resp, body) {
    if (err) {
      console.log('err', err)
    } else {
      console.log('Upload successful!', body)
      cb && cb()
    }
  })
}

function setFileExpired (filePath, time) {
  setTimeout(function () {
    fs.unlink(filePath, err => {
      if (err) {
        console.log('删除tmp文件失败', err)
      }
    })
  }, time)
}

router.get('/preview/*', function (req, res, next) {
  var config = req.app.get('config')
  res.redirect(config.env.configCenterUrl + req.url)
})

router.get('/tmp-preview/*', function (req, res, next) {
  var folder = 'tmp'
  var path = req.url.substr('/tmp-preview'.length)
  var options = {
    root: path.join(__dirname, '..', folder),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile(path, options, function (err) {
    if (err) {
      // console.log(err);
      res.status('500').end()
    } else {
      console.log('预览文件： ', path)
    }
  })
})

module.exports = router