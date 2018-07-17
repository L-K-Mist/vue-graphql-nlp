const state = {
  showsupplierSentences: false
}

const getters = {
  showsupplierSentences(state) {
    return state.showsupplierSentences
  }
}

const actions = {
  showsupplierSentences({
    state
  }, payload) {
    state.showsupplierSentences = payload
    console.log('​ new action triggered for showsupplier', state.showsupplierSentences);
  }
}

export default {
  state,
  getters,
  actions,

}
