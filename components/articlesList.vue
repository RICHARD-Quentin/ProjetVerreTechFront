<template>
  <v-card
    class="mx-auto"
    tile
    min-width="250px"
    max-height="75vh"
  >
    <v-list v-show="articles.length > 0">
      <v-list-item-group>
        <v-list-item v-for="(article, i) in articles" :key="i" class="px-0">
          <v-row no-gutters align="center">
            <v-col cols="4">
              <v-img max-width="80px" max-height="80px" :src="'/' + article.img "/>
            </v-col>

            <v-col cols="6">
              <v-list-item-title v-text="article.title"/>
              <v-list-item-subtitle v-text="'Quantité: ' + article.quantity"/>
              <v-list-item-subtitle v-text="'Prix: ' + article.price*article.quantity + '€'"/>
            </v-col>

            <v-col cols="1">
              <v-list-item-action>
                <v-btn @click="suppArticle({i})" text small icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-card-text v-show="articles.length > 0">
      <v-row>
        Nombre d'articles : {{ getNumberOfArticles }}
      </v-row>

      <v-row>
        Prix total : {{ getTotalPrice }}€
      </v-row>
    </v-card-text>


    <v-card-text v-show="articles.length === 0">
      Aucun article dans le pannier
    </v-card-text>


    <v-card-actions v-show="articles.length > 0">
      <v-row no-gutters justify="center">
        <v-btn color="button-custom-color"> Passer commande </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "articlesList",

  data() {
    return {
      articles: [],
      totalPrice : 0,
      numberOfArticles: 0
    }
  },

  methods: {
    suppArticle(articleIndex){
      this.$store.commit('cart/suppArticle', articleIndex)
    }
  },

  watch: {
    'getArticlesList':{
      handler(val) {
        this.articles = val
      },
      deep: true
    },
    'getTotalPrice':{
      handler(val) {
        this.totalPrice = val
      },
      deep: true
    },
    'getNumberOfArticles':{
      handler(val) {
        this.numberOfArticles = val
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters('cart', ['getArticlesList', 'getTotalPrice', 'getNumberOfArticles'])
  },

  mounted() {

  }
}
</script>

<style scoped>

</style>
