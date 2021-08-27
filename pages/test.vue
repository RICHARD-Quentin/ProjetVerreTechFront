<template>
  <div>
    <v-text-field type="number" v-model="quantity"></v-text-field>
    <v-btn @click="increment(article1)">1</v-btn>
    <v-btn @click="increment(article2)">2</v-btn>
  </div>

</template>

<script>
export default {
  name: "test",
  data() {
    return {
      article1: {
        id:1,
        title: 'test',
        price: 40,
        img: 'chrono.png'
      },
      article2: {
        id:2,
        title: 'test2',
        price: 60,
        img: 'lock.png'
      },
      quantity: 1
    }
  },

  methods: {
    increment(article) {
      console.log(article.id)
      this.$store.commit('cart/addArticle', {article: article, quantity: this.quantity})
    },

    decrement() {
      this.$store.commit('cart/suppArticle', {articleIndex: 0})
    }
  }
}
</script>

<style scoped>

</style>
