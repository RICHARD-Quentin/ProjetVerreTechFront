<template>
<v-container>
   <v-row class="grey lighten-3" justify="space-between" align="center">
        <v-col cols="5">
        Point de vente sélectionné : <b>{{getShopName}}</b>
        </v-col>
<!--        <v-col cols="5" class="text-xs-right">-->
<!--          &lt;!&ndash;-->
<!--          <v-autocomplete-->
<!--                        :items="articles"-->
<!--                        :filter="customFilter"-->
<!--                        color="white"-->
<!--                        item-text="intitule_article"-->
<!--                        label="Rechercher un article">-->
<!--          </v-autocomplete>-->
<!--          &ndash;&gt;-->
<!--        </v-col>-->
        <v-col cols="5" md="3">
          <v-btn class="mr-5" @click="shopSelection=true">
            <span class="mr-2">Modifier</span>
            <v-icon dark>
                mdi-city
            </v-icon>
        </v-btn>
        </v-col>
    </v-row>
    <v-row>
      <v-col>
           <v-tabs>
             <v-tab @click="setFilter('all')" >Tous les articles</v-tab>
            <v-tab @click="setFilter('price')">Prix le plus bas</v-tab>
            <v-tab @click="setFilter('note')">Meilleures notes</v-tab>
            <v-tabs-items >
                <v-tab-item>
                    test
                </v-tab-item>
            </v-tabs-items>

        </v-tabs>
      </v-col>
      <v-col>
        <v-pagination
        v-model="currentPage"
        :length="getPageNumber"
        @input="changePage"
        circle
    ></v-pagination>
      </v-col>
    </v-row>

  <v-row>
    <v-col cols="12" sm="4" v-for="(article,i) in articles" :key="i">
    <article-card :article="article" ></article-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-pagination
        v-model="currentPage"
        :length="getPageNumber"
        @input="changePage"
        circle
    ></v-pagination>
    </v-col>
  </v-row>
   <v-dialog v-model="shopSelection" max-width="1000px">
            <SelectShop  @Selected="selectShop"/>
  </v-dialog>
</v-container>
</template>

<script>
import {mapGetters} from "vuex";
import {isUndefined} from "lodash";

export default {
  name: "catalog",
  data() {
    return {
      articles: [],
      shopSelection:false,
      currentPage:1,
      totalArticle:0,
      articleByPage:12,
      orderby: 'all'
    }
  },
  async fetch(){
    await this.getArticles()
  },
  computed:{
    ...mapGetters('cart', ['shopSelected','getShopName']),
    getPageNumber(){
      const calcPage = Math.floor(this.totalArticle / this.articleByPage)
      return calcPage === 0 ? 1 : calcPage
    }
  },
  methods: {
    setFilter(filter){
      this.orderby = filter
      this.getArticles()
    },
    changePage(page){
      this.currentPage = page
      this.getArticles()
    },
    selectShop(val){
      this.shopSelection = false;
      this.getArticles()
    },
    async getArticles()
    {
      try {
        await this.$store.dispatch('cart/initShop')
      } catch (e) {
        console.error(e)
      }
      const shop = await this.$store.getters["cart/shopSelected"]

      let params = {
        page : this.currentPage,
        limit : this.articleByPage,
        commandable:1,
        orderby: this.orderby,
        id_boutique: shop ? shop.id_boutique : null
      }
      //if(this.shopSelected) params["id_boutique"] = Number(this.shopSelected?.id_boutique)

      const result = await this.$axios.get("/api/catalog/article",{params:params}).catch(err => this.$nuxt.error({ statusCode: 404, message: "Impossible de joindre le service catalogue !" }))

      if(result.data.success === true)
      {
        this.totalArticle = result.data.response.count

        if(this.shopSelected){
          this.articles = result.data.response.rows.map(resp => {
            let articleModified = resp.article;
            articleModified.quantity = !isUndefined(resp.quantité) ? resp.quantité : 0;

            return articleModified})
        }else{
          this.articles = result.data.response.rows
        }

      }
      else
      {
        this.articles = []
      }

    },
    /*
    customFilter (item, queryText, itemText) {
        const textOne = item.intitule_article.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1
    }
    */
  }
}
</script>

<style scoped>

</style>
