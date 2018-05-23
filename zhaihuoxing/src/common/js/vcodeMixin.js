import service from '../../page/signin/service'

export default {
  data () {
    return {
      vcodeLoading: false,
      vcode_key: '',
      vcodeSrc: ''
    }
  },
  methods: {
    changeVcode () {
      this.vcode_key = Math.random() + ''
      var params = {
        vcode_key: this.vcode_key
      }
      this.vcodeLoading = true
      service.getVcode(params).then(({re, data}) => {
        this.vcodeSrc = 'data:image/png;base64,' + data.vcode
        this.vcodeLoading = false
      })
    }
  },
  mounted: function () {
    this.changeVcode()
  }
}
