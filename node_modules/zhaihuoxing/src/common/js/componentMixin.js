export default {
  data () {
    return {
      imgType: ''
    }
  },
  mounted: function () {
    if (!window.components) {
      window.components = {}
    }
    window.components[this.$options.name] = this
    console.log('reverseLoadingFlag', this.$options.name)
    window.$store.default.commit('reverseLoadingFlag', this.$options.name)
    var _this = this
    var oC = document.getElementById('C')
    if (window.renderData.page_info.img_1) {
      oC.style.backgroundImage = 'url(' + window.renderData.page_info.img_1 + ')'
    }
    function imgChange () {
      let cwidth = oC.offsetWidth
      let cheight = oC.offsetHeight
      if (cwidth < 600 || cheight < 250) {
        oC.style.backgroundSize = 'cover'
        oC.style.backgroundPosition = '50% 50%'
        return
      }
      let cscale = (cwidth / cheight).toFixed(2)
      let img = document.getElementById('imgNew')
      let imgheight = img.offsetHeight
      let imgwidth = img.offsetWidth
      let imgscale = (imgwidth / imgheight).toFixed(2)
      let difference = (cscale - imgscale).toFixed(3)
      if (difference >= -0.25 && difference <= 0.25) {
        _this.imgType = 'typeNormal'
      }
      if (difference <= -2) {
        _this.imgType = 'type1'
      }
      if (difference > -2 && difference <= -1) {
        _this.imgType = 'type2'
      }
      if (difference > -1 && difference < -0.25) {
        _this.imgType = 'type3'
      }
      if (difference < 1 && difference > 0.25) {
        _this.imgType = 'type4'
      }
      if (difference < 1.5 && difference >= 1) {
        _this.imgType = 'type5'
      }
      if (difference >= 1.5) {
        _this.imgType = 'type6'
      }
      let size, positionsize
      switch (_this.imgType) {
        case 'typeNormal':
          oC.style.backgroundPosition = '0 0'
          oC.style.backgroundSize = 'cover'
          break
        case 'type1':
          positionsize = (-300 + 'px') + ' ' + (0 + 'px')
          size = (cwidth + 600 + 'px') + ' ' + (cheight + 'px')
          oC.style.backgroundPosition = positionsize
          oC.style.backgroundSize = size
          break
        case 'type2':
          positionsize = (-200 + 'px') + ' ' + (0 + 'px')
          size = (cwidth + 400 + 'px') + ' ' + (cheight + 'px')
          oC.style.backgroundPosition = positionsize
          oC.style.backgroundSize = size
          break
        case 'type3':
          positionsize = (-100 + 'px') + ' ' + (0 + 'px')
          size = (cwidth + 200 + 'px') + ' ' + (cheight + 'px')
          oC.style.backgroundPosition = positionsize
          oC.style.backgroundSize = size
          break
        case 'type4':
          positionsize = (0 + 'px') + ' ' + (-100 + 'px')
          size = (cwidth + 'px') + ' ' + (cheight + 200 + 'px')
          oC.style.backgroundPosition = positionsize
          oC.style.backgroundSize = size
          break
        case 'type5':
          positionsize = (0 + 'px') + ' ' + (-200 + 'px')
          size = (cwidth + 'px') + ' ' + (cheight + 400 + 'px')
          oC.style.backgroundPosition = positionsize
          oC.style.backgroundSize = size
          break
        case 'type6':
          positionsize = (0 + 'px') + ' ' + (-300 + 'px')
          size = (cwidth + 'px') + ' ' + (cheight + 600 + 'px')
          oC.style.backgroundPosition = positionsize
          oC.style.backgroundSize = size
          break
        default:
          break
      }
    }
    setTimeout(function () {
      imgChange()
    }, 1000)
    window.onresize = function () {
      imgChange()
    }
  }
}
