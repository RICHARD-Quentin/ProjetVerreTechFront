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

  addArticle(state, {article, quantity}) {

    let oldArticleIndex = state.articles.findIndex(elem => elem.id === article.id)

    if (oldArticleIndex === -1){
      let newArticle = Object.assign(article, {quantity: parseInt(quantity)})
      state.articles.push(newArticle)
    } else {
      let newQuantity = state.articles[oldArticleIndex].quantity + parseInt(quantity)
      state.articles.push({...state.articles[oldArticleIndex], 'quantity': newQuantity})
      state.articles.splice(oldArticleIndex, 1)
    }
  },

  suppArticle(state, {articleIndex}) {
    state.articles.splice(articleIndex, 1)
  }
}

export const getters = {
  getNumberOfArticles(state) {
    return state.articles.reduce((quantity, article) =>
      quantity + article.quantity, 0
    )
  },

  getArticlesList(state) {
    return [...state.articles].reverse()
  },

  getTotalPrice(state) {
    return state.articles.reduce((total, article) =>
      total + article.price*article.quantity, 0
    )
  }
}
