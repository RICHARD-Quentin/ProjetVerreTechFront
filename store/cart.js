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

  addArticle(state, {article}) {
    state.articles.push(article)
    // const id_client = this.$auth.user.id_client
    // this.$axios.post('/api/catalog/cart', {id_client, cart: state.articles})
  },

  suppArticle(state, {articleIndex}) {
    state.articles.splice(articleIndex, 1)
    // const id_client = this.$auth.user.id_client
    // this.$axios.post('/api/catalog/cart', {id_client, cart: state.articles})
  },

  setShop(state,value){
    state.shop = value
  }
}

export const getters = {
  getNumberOfArticles(state) {
    return state.articles.length
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
