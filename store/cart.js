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
  },

  suppArticle(state, {articleIndex}) {
    state.articles.splice(articleIndex, 1)
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
<<<<<<< HEAD
    return state.articles.length > 0 ? state.articles.reduce((acc,curr)=>{return (Number(acc)+(Number(curr.prix_achat)*curr.quantity))},0).toFixed(2) : 0;
  },
  getTotalPriceHT(state){
    return state.articles.length > 0 ? (state.articles.reduce((acc,curr)=>{return (Number(acc)+(Number(curr.prix_achat)*curr.quantity))},0)*0.8).toFixed(2) : 0;
=======
    return state.articles.length > 0 ? state.articles.reduce((acc,curr)=>{return (Number(acc)+Number(curr.prix_achat))},0) : 0;
>>>>>>> 1f220cc03078a056457cc21ff4c52b694f2e49fb
  },

  shopSelected(state){
    return state.shop;
  },

  getShopName(state) {
<<<<<<< HEAD
    if(!state.shop)return "Aucun"
=======
    if(!state.shop)return "Aucune"
>>>>>>> 1f220cc03078a056457cc21ff4c52b694f2e49fb
    return state.shop.intitule
  },
}