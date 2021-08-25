export const state = () => ({
  articles: 0
})

export const mutations = {
  increment(state) {
    state.articles ++
  },

  decrement(state) {
    state.articles --
  }
}

export const getters = {
  getNumberOfArticles(state) {
    return state.articles
  }
}
