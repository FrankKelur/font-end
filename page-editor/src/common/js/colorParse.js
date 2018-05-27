/**
 * 颜色解析工具，用来编译color.less
 * 支持fade、lighten、darken、spin四种函数，调用格式与less一样
 */

import Color from './color'
/**
 * 全局替换颜色变量(建议使用@A的形式定义)
 * @param lessStr 颜色css，含有颜色变量、颜色操作函数
 * @param colorList 颜色映射数组  [{key: '@A', value: '#abc123'}]
 * @returns {*}
 */
const replace = (lessStr, colorList) => {
  colorList.forEach((item) => {
    lessStr = lessStr.replace(new RegExp(item.key, 'g'), item.value)
  })
  return lessStr
}

const handler = ['fade', 'lighten', 'darken', 'spin']

/**
 * 执行操作函数并替换，考虑到性能，建议定义单独的变量引用颜色操作函数
 * eg:  @fadeA10: fade(@A, 10%)
 *      .themeA: {
 *        color: @fadeA10;  // ok
 *        color: fade(@A, 10%) // bad
 *      }
 * @param lessStr
 * @param key
 * @returns {*}
 */
const parseColor = (lessStr, key) => {
  let regx = new RegExp('(@\\w+):\\s*' + key + '\\((.+?),\\s*(.+?)\\)', 'g')
  let rs = regx.exec(lessStr)
  while (regx.lastIndex > 0) {
    // 解析
    let color = new Color(rs[2])[key](rs[3])
    // 替换
    lessStr = lessStr.replace(new RegExp(rs[1], 'g'), color)
    rs = regx.exec(lessStr)
  }
  return lessStr
}

const deleteVari = (lessStr) => {
  return lessStr.slice(lessStr.indexOf('deleteFlag') + 10)
}

function getLessStr (colorList) {
  var str = ''
  colorList.forEach(colorVariable => {
    var isDerivative = ['fade', 'lighten', 'darken', 'spin'].some(method => {
      return colorVariable.indexOf(method) !== -1
    })
    var colorIdx = -1
    var colorArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    colorArr.forEach(color => {
      if (colorVariable.indexOf(color) !== -1) {
        colorIdx = colorVariable.indexOf(color)
      }
    })
    if (isDerivative) {
      // 插入派生颜色变量 到 str eg: @lightenB10: lighten(@B, 10%)
      var handler = colorVariable.substring(1, colorIdx)
      var scale = colorVariable.substring(colorIdx + 1)
      var color = colorVariable[colorIdx]
      str += `${colorVariable}: ${handler}(@${color}, ${scale}%)\n`
    }
  })
  str += 'deleteFlag\n'
  colorList.forEach(colorVariable => {
    var colorName = colorVariable.substring(1)
    var template = `
.theme-bg-${colorName}{
  background-color: ${colorVariable}!important
}
.theme-color-${colorName}{
  color: ${colorVariable}!important
}
.theme-border-${colorName}{
  border-color: ${colorVariable}!important
}
.theme-border-bottom-${colorName}{
  border-bottom-color: ${colorVariable}!important
}
.theme-color-${colorName}-hover:hover{
  color:${colorVariable}!important
}
.theme-color-${colorName}-active:active{
  color:${colorVariable}!important
}
.theme-bg-${colorName}-hover:hover{
  background-color:${colorVariable}!important
}
.theme-bg-${colorName}-active:active{
  background-color:${colorVariable}!important
}
.theme-border-${colorName}-hover:hover{
  border-color:${colorVariable}!important
}
.theme-border-${colorName}-active:active{
  border-color:${colorVariable}!important
}
.theme-box-shadow-${colorName}{
  box-shadow: 0 0 4px ${colorVariable}!important
}
`
    str += template
  })
  return str
}

const parse = (colorList, additionalStr) => {
  let lessStr
  if (additionalStr) {
    lessStr = additionalStr
  } else {
    lessStr = getLessStr(['@A', '@darkenA10', '@lightenA10', '@lightenA32', '@B', '@darkenB10', '@lightenB10', '@C', '@lightenC32', '@darkenC15', '@D', '@lightenD10', '@lightenD18', '@lightenD15', '@darkenC10', '@lightenD32', '@lightenD12', '@E', '@F', '@G', '@H', '@lightenH32', '@lighten12D', '@fadeA2', '@I', '@J'])
  }
  lessStr = replace(lessStr, colorList)
  for (let f of handler) {
    lessStr = parseColor(lessStr, f)
  }
  return deleteVari(lessStr)
}

export default parse
