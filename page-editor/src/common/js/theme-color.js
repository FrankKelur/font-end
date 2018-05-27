/* eslint-disable */
import colorParse from 'common/js/colorParse.js'
import styleMixinLess from '!raw-loader!../styleSheet/styleMixin.less'

let styleEle = document.createElement('style')
styleEle.id = '#theme'
document.querySelector('head').appendChild(styleEle)
styleEle.innerHTML = colorParse(window.renderData.color)

// 加载默认样式
styleEle = document.createElement('style')
styleEle.id = '#theme'
document.querySelector('head').appendChild(styleEle)
styleEle.innerHTML = colorParse(window.renderData.color, styleMixinLess)
