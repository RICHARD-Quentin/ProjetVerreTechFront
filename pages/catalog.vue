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
        id:121231,
        title: 'test',
        price: 40
      }
    }
  },

  methods: {
    increment() {
      this.$store.commit('basket/increment')
    },

    decrement() {
      this.$store.commit('basket/decrement')
    }
  }
}
</script>

<style scoped>

</style>
