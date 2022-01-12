<template>
  <v-card max-width="404" class="d-flex flex-column" outlined elevation="4">
    <nuxt-link :to="'/catalog/' + article.code_article">
      <v-img height="180" :src="getUrlImage(article.image)"></v-img>
    </nuxt-link>
    <v-card-text>
      
      <v-row class="mt-2 mb-1">
      <v-col class="ml-2 ma-2">
        <div class="text-h7 font-weight-bold">
          {{article.intitule_article}}
        </div>
        <div class="text-h7 ma-2">
          {{article.prix_achat}}€
        </div>   
        <div v-if="article.quantity" class="text-h7 ma-2">
          {{showQuantity}}
        </div>
        <div>
           <v-icon v-for="(star,index) in article.note_moyenne" :key="'a'+index">mdi-star</v-icon>
           <v-icon v-for="(star2,index) in 5-article.note_moyenne" :key="'b'+index">mdi-star-outline</v-icon>
        </div>       
      </v-col>
      </v-row>
    <v-card-actions align="right">
       <v-flex class="text-xs-right">
       <v-btn color="yellow" :to="'/catalog/' + article.code_article">
          <v-icon>
            mdi-arrow-right
          </v-icon>
        </v-btn>
       </v-flex>
    </v-card-actions>
    </v-card-text>
    
  </v-card>

</template>

<script>
export default {
  name: "articleCard",
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
    }
  },
  props: [
      "article"
    ],
    computed:{
      showQuantity(){
          if (this.article.quantity > 5) return `${this.article.quantity} pièce(s) disponible.`
          else if(this.article.quantity < 5 && this.article.quantity > 0) return `Plus que ${this.article.quantity} pièce(s) disponible.`
          else return `Cet article n'est plus disponible dans ce point de vente.`
      }
    },
  methods: {
    linkToArticle(id)
    {
      console.log("test")
      return '/catalog/' + id
    },
    getUrlImage(base64)
    {
      return base64 != undefined ? "data:image/jpeg;base64,"+base64 : "/image_not_found.png"
    }
  },
}
</script>

<style scoped>
.v-card {
  transition: transform 0.5s;
}
.v-card:hover{
 transform: scale(1.02);
 }


</style>