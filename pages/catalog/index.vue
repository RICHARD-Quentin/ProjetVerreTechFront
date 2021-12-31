<template>
<v-container>
   <v-row class="grey lighten-3 pa-2 " align="center"
      justify="center">
        <v-col cols="4">        
        Boutique sélectionné : <b>{{getShopName}}</b>
        </v-col>
        <v-col cols="5" class="text-xs-right">
          <!--
          <v-autocomplete
                        :items="articles"
                        :filter="customFilter"
                        color="white"
                        item-text="intitule_article"
                        label="Rechercher un article">
          </v-autocomplete> 
          -->
        </v-col>
        <v-col cols="3" class="text-xs-right">
          <v-btn class="pa-4" @click="shopSelection=true">    
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
             <v-tab @click="setFilter('all')" >Tout les articles</v-tab> 
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
import { mapGetters } from "vuex";

export default {
  name: "catalog",
  data() {
    return {
      articles: [],
      shopSelection:false,
      currentPage:1,
      totalArticle:0,
      articleByPage:12,
      orderby: null
    }
  },
  async fetch(){

    this.getArticles()
  },
  computed:{
    ...mapGetters('cart', ['shopSelected','getShopName']),
    getPageNumber(){
      const calcPage = Math.floor(this.totalArticle / this.articleByPage)
      return calcPage == 0 ? 1 : calcPage
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
      this.$store.commit('cart/setShop', val);
      this.getArticles()
    },
    async getArticles()
    {
      let params = {
        page : this.currentPage,        
        limit : this.articleByPage,
        commandable:1,
        orderby: this.orderby
      }
      if(this.shopSelected) params["id_boutique"] = Number(this.shopSelected.id_boutique)

      const result = await this.$axios.get("/api/catalog/article",{params:params}).catch(err => this.$nuxt.error({ statusCode: 404, message: "Impossible de joindre le service catalogue !" }))
      
      if(result.data.success == true)
      {
        this.totalArticle = result.data.response.count
 
        if(this.shopSelected){
          this.articles = result.data.response.rows.map(resp => {let articleModified = resp.article; articleModified.quantity = resp.quantité; return articleModified})         
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
