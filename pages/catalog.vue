<template>
  <div>
    
    <article-card v-for="article in articles" :article=article :key="article.id"></article-card>
    <v-btn @click="decrement">-</v-btn>
    <v-btn @click="increment">+</v-btn>
  </div>

</template>

<script>
export default {
  name: "catalog",
  data() {
    return {
      articles: [
        {
        id:121231,
        name: 'test',
        price: 40,
        item: 'mdi-card'
        },
        {
        id:1212,
        name: 'test',
        price: 40,
        item: 'mdi-card'
        }
      ]
    }
  },
  methods: {
    increment() {
      this.$store.commit('cart/addArticle', {article: this.article})
    },
    decrement() {
      this.$store.commit('cart/suppArticle', {articleIndex: 0})
    }
  }
}
</script>

<style scoped>
</style>