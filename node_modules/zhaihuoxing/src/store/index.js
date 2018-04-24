import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common.js'

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    common
  }
})

export default store
