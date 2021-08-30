const state = {
  isLoading: false
}

const actions = {
  loading({ commit }, estado) {
    commit("updateState", estado)
  }
}

const getters = {
  getLoading: state => {
    return state.isLoading
  }
};

const mutations = {
  updateState(state, estado) {
    state.isLoading = estado;
  }
};

export const loader = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}