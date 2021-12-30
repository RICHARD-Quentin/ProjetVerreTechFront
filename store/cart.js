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
    return state.articles.length > 0 ? state.articles.reduce((acc,curr)=>{return (Number(acc)+Number(curr.prix_achat))},0) : 0;
  },

  shopSelected(state){
    return state.shop;
  },

  getShopName(state) {
    if(!state.shop)return "Aucune"
    return state.shop.intitule
  },
}