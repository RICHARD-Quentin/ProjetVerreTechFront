<template>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
    min-width="250px"
  >
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="(article, i) in getArticlesList" :key="i" class="px-0">
          <v-row no-gutters align="center">
            <v-col cols="4">
              <v-list-item-icon :src="article.image"/>
            </v-col>

            <v-col cols="6">
              <v-list-item-title v-text="article.title"/>
              <v-list-item-subtitle v-text="article.price + '€'"/>
            </v-col>

            <v-col cols="1">
              <v-list-item-action>
                <v-btn @click="this.suppArticle({i})" text small icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "articlesList",

  methods: {
    suppArticle(articleIndex){
      this.$store.commit('cart/suppArticle', articleIndex)
    }
  },

  computed: {
    ...mapGetters('cart', ['getArticlesList'])
  }
}
</script>

<style scoped>

</style>
