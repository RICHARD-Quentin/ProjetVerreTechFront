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

  setArticles(state, articles) {
    state.articles = articles.response
    state.articleCount = articles.responseCount
  },

  addArticle(state, articles) {
    state.articles = articles
    // const id_client = this.$cookies.get('sessionId')
    // this.$axios.post('/api/cache/cart', {id_client, cart: state.articles})
  },

  suppArticle(state, articleIndex) {
    state.articles.splice(articleIndex, 1)
    // const id_client = this.$cookies.get('sessionId')
    // this.$axios.post('/api/cache/cart', {id_client, cart: state.articles})
  },

  setShop(state,value){
    // const id_client = this.$cookies.get('sessionId')
    // this.$axios.post('/api/cache/shop', {id_client, shop: value})
    state.shop = value

  },

  clearCart(state){
    state.articles = []
    state.articleCount = 0
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

export const actions = {
  async initArticles({commit}) {
    const id_client = this.$cookies.get('sessionId')
    const articles = await this.$axios.$get('/api/cache/cart/' + id_client)
    if (articles.success) {
      commit('setArticles', articles)
    }
  },

  async initShop({commit}) {
    const id_client = this.$cookies.get('sessionId')
    const shop = await this.$axios.$get('/api/cache/shop/' + id_client)
    if (shop.success) {
      commit('setShop', shop.response)
    }
  },

  async addArticle({commit, state}, article) {
    const articles = [...state.articles]
    // const index = articles.indexOf(article)
    // index === -1
    //   ? articles.push(article)
    //   : articles[index].quantity += article.quantity
    articles.push(article)
    const id_client = this.$cookies.get('sessionId')
    const res = await this.$axios.post('/api/cache/cart', {id_client, cart: articles})
    if (res.data.success) {
      commit("addArticle", articles)
    }
  },

  async suppArticle({commit, state}, articleIndex) {
    const articles = [...state.articles]
    console.log(articleIndex)
    articles.splice(articleIndex, 1)

    const id_client = this.$cookies.get('sessionId')
    const res = await this.$axios.post('/api/cache/cart', {id_client, cart: articles})
    if (res.data.success) commit("suppArticle", articleIndex)
  },

  async setShop({commit},value){
    const id_client = this.$cookies.get('sessionId')
    const res = await this.$axios.post('/api/cache/shop', {id_client, shop: value})
    if (res.data.success) {
      commit("setShop", value)
    }

  },


  async clearCart({commit}) {
    const id_client = this.$cookies.get('sessionId')
    const res = await this.$axios.$delete('/api/cache/cart/' + id_client)
    if (res.success) {
      commit('clearCart')
    }
  }
}
