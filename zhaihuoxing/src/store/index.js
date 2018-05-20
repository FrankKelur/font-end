import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common.js'
<<<<<<< HEAD
=======
import componentData from './modules/componentData.js'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
<<<<<<< HEAD
    common
=======
    common,
    componentData
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  }
})

export default store
