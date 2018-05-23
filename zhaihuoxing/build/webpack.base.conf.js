var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var glob = require('glob')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var hotReloadPage = require('./hot-pages')

function getEntry () {
  console.log('===============\n\n\n' + process.webpackInited + '===============\n\n\n')
  var components = glob.sync(resolve('src/components/*/index.vue')) //控件js,chunk入口
  var layouts = glob.sync(resolve('src/layout/*/index.less')).reduce((entries, path) => {  //布局less，chunk入口
    var name = /.*\/(layout\/.*?\/index)\.less/.exec(path)[1]
    entries[name] = path
    return entries
  }, {})
  var pages = glob.sync(resolve('src/page/*/index.js')).reduce((entries, path) => {  //组件chunk入口
    var name = /.*\/(page\/.*?\/index)\.js/.exec(path)[1]
    var page = name.split('/')[1]
    if (!process.webpackInited) {
      entries[name] = path
    } else {
      hotReloadPage.includes(page) && (entries[name] = path)
    }
    return entries
  }, {})
  var componentsCSS = glob.sync(resolve('src/components/*/*.less')).reduce((entries, path) => {  // 控件less,chunk入口, 分主题
    var themeMatch = /\/(theme-\S+)\.less$/.exec(path)
    name = themeMatch ? themeMatch[1] : ''
    entries[name] || (entries[name] = [])
    name && entries[name].push(path)
    return entries
  }, {})
  let newEntry = {
    components: components,
    ...layouts,
    ...pages,
    ...componentsCSS,
    main: resolve('src/common/js/main.js') //公用chunk入口
  }
  process.webpackInited = true
  console.log('newEntry', newEntry)
  return newEntry
}

module.exports = {
  entry: () => new Promise((resolve) => {
    resolve(getEntry())
  }),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    modules: [
      'node_modules',
      'lib'
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'promise': 'es6-promise/dist/es6-promise.auto.js',
      'cookie': 'js-cookie/src/js.cookie.js',
      '@': resolve('src'),
      'components': resolve('src/components'),
      'page': resolve('src/page'),
      'common': resolve('src/common')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
