// 公用文件入口
import 'promise'
import 'fetch-detector'
import 'fetch-ie8'
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import '../styleSheet/reset.less'
import '../styleSheet/common.less'
import initLoading from '@/common/js/loading.js'
import '@/common/js/tagBrower.js'
import 'common/js/commonComp'
import 'expose-loader?$store!@/store'
import '../styleSheet/font/iconfont.css'
import 'common/js/ie-polyfill'
import 'common/js/theme-color'

// handle loading
console.log('window.$store', window.$store)
initLoading()
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
  Vue.config.productionTip = true
  require('eventsource-polyfill')
  var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

  hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
      window.location.reload()
    }
  })
}

