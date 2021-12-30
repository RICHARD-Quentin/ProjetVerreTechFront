<template>
<v-container>
   <v-row class="grey lighten-3 pa-2 " align="center"
      justify="center">
        <v-col cols="3">        
        Boutique sélectionné : <b>{{getShopName}}</b>
        </v-col>
        <v-col cols="5" class="text-xs-right">
          <v-autocomplete
                        :items="articles"
                        :filter="customFilter"
                        color="white"
                        item-text="intitule_article"
                        label="Rechercher un article">
          </v-autocomplete>
        </v-col>
        <v-col cols="2" class="text-xs-right">
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
             <v-tab>Tout les articles</v-tab> 
            <v-tab>Prix le plus bas</v-tab> 
            <v-tab>Meilleures notes</v-tab>
            <v-tab>Plus récents</v-tab>          
            <v-tabs-items >
                <v-tab-item>  
                    test
                </v-tab-item>                          
            </v-tabs-items>
            
        </v-tabs>
      </v-col>
    </v-row>
  <v-row>
    <v-col cols="12" sm="4" v-for="article in articles" :key="article.id">
    <article-card :article="article" ></article-card>
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
      shopSelection:false
    }
  },
  async fetch(){
    const result = await this.$axios.get("/api/catalog/article").catch(err => this.$nuxt.error({ statusCode: 404, message: err.message }))
    if(result.data.success == true){
      this.articles = result.data.response
    }
  },
  computed:{
    ...mapGetters('cart', ['shopSelected','getShopName']),
  },
  methods: {
    selectShop(val){
      this.shopSelection = false;
    },
    customFilter (item, queryText, itemText) {
        const textOne = item.intitule_article.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1 
    }
  }
}
</script>

<style scoped>

</style>
