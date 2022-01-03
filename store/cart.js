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

  addArticle(state, article) {
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
  },

  clearCart(state){
    state.articles = []
  }
}

export const getters = {
  getNumberOfArticles(state) {
    return state.articles.reduce((acc,curr)=>{ return Number(acc) + Number(curr.quantity)},0)
  },

  getArticlesList(state) {
    return state.articles
  },

  getTotalPrice(state){
    return state.articles.length > 0 ? state.articles.reduce((acc,curr)=>{return (Number(acc)+(Number(curr.prix_achat)*curr.quantity))},0).toFixed(2) : 0;
  },
  getTotalPriceHT(state){
    return state.articles.length > 0 ? (state.articles.reduce((acc,curr)=>{return (Number(acc)+(Number(curr.prix_achat)*curr.quantity))},0)*0.8).toFixed(2) : 0;
  },

  shopSelected(state){
    return state.shop;
  },

  getShopName(state) {
    if(!state.shop)return "Aucun"
    return state.shop.intitule
  },
}
