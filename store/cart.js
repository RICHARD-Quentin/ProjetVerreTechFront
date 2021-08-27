export const state = () => ({
  articleCount: 0,
  articles: []
})

export const mutations = {
  increment(state) {
    state.articleCount ++
  },

  decrement(state) {
    state.articleCount --
  },

  addArticle(state, {article}) {
    state.articles.push(article)
  },

  suppArticle(state, {articleIndex}) {
    state.articles.splice(articleIndex, 1)
  }
}

export const getters = {
  getNumberOfArticles(state) {
    return state.articles.length
  },

  getArticlesList(state) {
    return state.articles
  },

  getTotalPrice(state) {
    return state.articles.reduce((total, article) => {
      total += article.price
    })
  }
}
