<template>
  <v-data-table
    :items="getArticlesList"
    :headers="headers"
  >

  </v-data-table>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "basket",

  data() {
    return {
      headers: [
        {
          text: 'titre',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Prix', value: 'price' },
        { text: 'Identifiant', value: 'id' },
      ]
    }
  },

  computed: {
    ...mapGetters('basket', ["getArticlesList", "getNumberOfArticles"])
  }
}
</script>

<style scoped>

</style>
