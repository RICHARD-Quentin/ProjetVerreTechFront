<template>
  <div>
    <v-btn @click="decrement">-</v-btn>
    <v-btn @click="increment">+</v-btn>
  </div>

</template>

<script>
export default {
  name: "catalog",
  data() {
    return {
      article: {
        id:2,
        title: 'test',
        price: 40,
        quantity:3,
        img: 'chrono.png'
      }
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