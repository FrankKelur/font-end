import Vue from 'vue'
import { Loading } from 'element-ui'
function initLoading () {
  var LoadingComponent = Vue.extend({
    template: '<div id="loading" ></div>',
    name: 'loading',
    data () {
      return {
        isLoading: true
      }
    },
    mounted: function () {
      this.loadingInstance = Loading.service({
        fullscreen: true
      })
      for (var key in window.renderData.components) {
        window.$store.default.commit({
          type: 'addLoadingFlag',
          name: key
        })
      }
    },
    computed: {
      isAllLoading () {
        return window.$store.default.getters.allLoading
      }
    },
    watch: {
      isAllLoading: function (val) {
        if (!val) {
          this.loadingInstance.close()
        }
      }
    }
  })
  Vue.component('concise_header', LoadingComponent)
  const Component = new LoadingComponent().$mount()
  document.getElementById('loading').appendChild(Component.$el)
}
export default initLoading
