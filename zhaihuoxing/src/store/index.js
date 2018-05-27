import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common.js'
import componentData from './modules/componentData.js'

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    common,
    componentData
  }
})

export default store
