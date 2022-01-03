<template>
  <v-card
    class="mx-auto pa-2"
    tile
    max-height="50vh"

  >
    <v-list v-show="getArticlesList.length > 0">
      <v-list-item-group>
        <v-list-item v-for="(article, i) in getArticlesList" :key="i" class="px-0">
          <v-row no-gutters align="center" @click="$router.push(`/catalog/${article.code_article}`)">
            <v-col cols="4">
              <v-img max-width="80px" max-height="80px" class="mr-2" v-bind:src="getUrlImageOfArticle(article.image)" />
     
            </v-col>

            <v-col cols="6">
              <v-list-item-title v-text="article.intitule_article"/>
              <v-list-item-subtitle v-text="'Quantité: ' + article.quantity"/>
              <v-list-item-subtitle v-text="'Prix: ' + (article.prix_achat*article.quantity) + '€'"/>
            </v-col>

            <v-col cols="1">
              <v-list-item-action>
                <v-btn @click="suppArticle(i)" text small icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-card-text v-show="getArticlesList.length > 0 " v-if="showFooter == true" class="ma-1">
      <v-row>
        Nombre d'articles : {{ getNumberOfArticles }}
      </v-row>

      <v-row>
        Prix total : {{ getTotalPrice }}€
      </v-row>
    </v-card-text>


    <v-card-text v-show="getArticlesList.length === 0">
      Aucun article dans le panier
    </v-card-text>


    <v-card-actions v-show="getArticlesList.length > 0" v-if="showFooter == true" @click="goToOrderPage()">
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
  props:{
    showFooter: Boolean
  },
  watch: {
    getArticlesList:{
      handler(val) {
        this.articles = val
      },
      deep: true
    },
    getTotalPrice:{
      handler(val) {
        this.totalPrice = val
      },
      deep: true
    },
    getNumberOfArticles:{
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
  },

  methods:{
    suppArticle(articleIndex){
      this.$store.commit('cart/suppArticle', articleIndex)
    },
    goToOrderPage(){

      this.$router.push('/orders/order')
    },
    getUrlImageOfArticle(base64)
    {
      return base64 != undefined ? "data:image/jpeg;base64,"+base64 : "/image_not_found.png"
    }
  }
}
</script>

<style scoped>
</style>
