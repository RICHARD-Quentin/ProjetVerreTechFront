<template>
  <div>
    <v-text-field type="number" ></v-text-field>
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
        title: 'ete',
        price: 40,
        quantity: 3,
        img: 'chrono.png'
      },
      article2: {
        id:2,
        title: 'test2',
        price: 60,
        img: 'lock.png',
        quantity: 3
      }
      
    }
  },

  methods: {
    increment(article) {
      console.log(article)
      this.$store.commit('cart/addArticle', {article: article})
    },

    decrement() {
      this.$store.commit('cart/suppArticle', {articleIndex: 0})
    }
  }
}
</script>

<style scoped>

</style>
