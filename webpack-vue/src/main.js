// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<div><button @click="toggle">toggle</button><br/><App v-if="show"/></div>',
  components: {App},
  data () {
    console.log('main data init')
    return {
      show: true
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    }
  },
  beforeCreate () {
    console.log('main beforecreate')
  },
  created () {
    console.log('main created')
  },
  beforeMount () {
    console.log('main mount')
  },
  mounted () {
    console.log('main.js mounted!')
  },
  beforeUpdate () {
    console.log('main beforeUpdate')
  },
  updated () {
    console.log('main updated')
  },
  beforeDestroy () {
    console.log('main beforeDestory')
  },
  destroyed () {
    console.log('main destroyed')
  }
})
