import colorParse from '../colorParse.js'

var styleMixin = {
  mounted: function () {
    this.insertStyleMaxin()
  },
  methods: {
    insertStyleMaxin: function () {
      const styleString = colorParse(window.renderData.color, this.styleMixinLess)
      let styleEle = document.createElement('style')
      styleEle.id = 'theme' + this.$options.name
      document.querySelector('head').appendChild(styleEle)
      styleEle.innerHTML = styleString
    }
  }
}
export default styleMixin
