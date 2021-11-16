<template>
  <v-row>
    <v-col cols="12" sm="4" v-for="article in articles" :key="article.id">
    <article-card :article=article @increment="increment"></article-card>
    </v-col>
  </v-row>

</template>

<script>
export default {
  name: "catalog",
  data() {
    return {
      articles: [
        {
        id:121231,
        name: 'Insert à granulé MTUI 700',
        price: 40,
        item: 'mdi-card',
        img:'article1.jpg'
        },
        {
        id:1212,
        name: 'Insert à bois MII 600',
        price: 30,
        item: 'mdi-card',
        img:'article1.jpg'
        },
        {
        id:1213,
        name: 'Insert à granulé MATUI 560',
        price: 20,
        item: 'mdi-card',
        img:'article1.jpg'
        }
      ]
    }
  },

  methods: {
    increment() {
      this.$store.dispatch('basket/addArticle', {article: this.article});
    },
  }
}
</script>

<style scoped>

</style>
