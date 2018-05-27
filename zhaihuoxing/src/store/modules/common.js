const state = {
  theme: 'themeC',
  loadingArray: []
}
const mutations = {
  addLoadingFlag (state, payload) {
    state.loadingArray.push({
      name: payload.name,
      isLoading: true
    })
  },
  reverseLoadingFlag (state, payload) {
    state.loadingArray.forEach((el, idx) => {
      if (el.name === payload) {
        state.loadingArray[idx].isLoading = false
      }
    })
  }
}

const getters = {
  allLoading: state => {
    return !state.loadingArray.every(el => {
      return el.isLoading === false
    })
  }
}

export default {
  state,
  mutations,
  getters
}
