export const state = () => ({
  articleCount: 0,
  articles: [],
  shop: null
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
  },

  setShop(state,value){
    state.shop = value
  }
}

export const getters = {
  getNumberOfArticles(state) {
    return state.articles.reduce((quantity, article) =>
      quantity + article.quantity, 0
    )
  },

  getArticlesList(state) {
    return state.articles
  },

  getTotalPrice(state){
    return state.articles.length > 0 ? state.articles.reduce((acc,curr)=>{return acc+curr.price},0) : 0;
  },

  shopSelected(state){
    return state.shop;
  }
}
