class Color {
  constructor (hexStr) {
    let m = parseInt(hexStr.slice(1), 16)
    this.r = +(m >> 16 & 0xff)
    this.g = +(m >> 8 & 0xff)
    this.b = +(m & 0xff)
    this.opacity = 1
  }
  lighten (k) {
    if (k.indexOf('%') > -1) {
      k = k.slice(0, k.indexOf('%')) * 0.01
    }
    let arr = [this.r + (255 - this.r) * k, this.g + (255 - this.g) * k, this.b + (255 - this.b) * k]
    arr = this.check(arr)
    return `rgb(${arr})`
  }
  darken (k) {
    if (k.indexOf('%') > -1) {
      k = k.slice(0, k.indexOf('%')) * 0.01
    }
    let arr = [this.r - (this.r - 0) * k, this.g - (this.g - 0) * k, this.b - (this.b - 0) * k]
    arr = this.check(arr)
    return `rgb(${arr})`
  }
  fade (k) {
    if (k.indexOf('%') > -1) {
      k = k.slice(0, k.indexOf('%')) * 0.01
    }
    this.opacity = k
    return `rgba(${this.r},${this.g},${this.b},${this.opacity})`
  }
  spin (k) {
    let [h, s, l] = this.toHsl()
    let t = (h + k) % 360
    h = t < 0 ? 360 + t : t
    return `hsl(${h},${s},${l})`
  }
  toHsl () {
    let r = this.r / 255
    let g = this.g / 255
    let b = this.b / 255
    let max = Math.max(r, g, b)
    let min = Math.min(r, g, b)
    let h, s
    let l = (max + min) / 2
    if (max === min) {
      h = s = 0
    } else {
      let d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
    return [Math.floor(h * 100), Math.round(s * 100) + '%', Math.round(l * 100) + '%']
  }
  check (arr) {
    return arr.map((item) => {
      return Math.max(0, Math.min(255, Math.round(item) || 0))
    })
  }
}

export default Color
