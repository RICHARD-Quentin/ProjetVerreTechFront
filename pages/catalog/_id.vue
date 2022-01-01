<template>
    <v-container>
        
    <v-row class="grey lighten-3 pa-2 " align="center" 
      justify="center">
        <v-col>
        <v-btn class="mr-4"
         @click.prevent="$router.back()">
            <v-icon dark>
                mdi-arrow-left
            </v-icon>
        </v-btn>
<<<<<<< HEAD
        Point de vente sélectionné : <b>{{getShopName}}</b>
=======
        Boutique sélectionné : <b>{{getShopName}}</b>
>>>>>>> 1f220cc03078a056457cc21ff4c52b694f2e49fb
        </v-col>
    </v-row>
    <v-row class="mt-0">
        <v-col cols="6" class="grey lighten-5">
            <v-img width="800" max-height="480" v-bind:src="getUrlImageOfArticle(article.image)"></v-img>
        </v-col>

        <v-col cols="6" class="text-h4 pa-4  grey lighten-5">
            <div>
                {{article.intitule_article}}
            </div>

            <div class="mt-4">
                {{article.prix_achat}}€
            </div>

            <div class="mt-6 mb-16 text-subtitle-2 text-justify">
                {{article.description}}
            </div>

            <v-row v-if="shopSelected && quantity">
                <v-col cols="4">
                    <v-subheader>Quantité</v-subheader>
                </v-col>
                <v-col cols="8">
                    <v-text-field
                        v-model = "quantitySelector"
                        type="number"
<<<<<<< HEAD
                        suffix="pièce(s)"
=======
                        suffix="pièce"
>>>>>>> 1f220cc03078a056457cc21ff4c52b694f2e49fb
                    ></v-text-field>
                </v-col>
            </v-row>
  
            <v-btn color="yellow" x-large disabled v-if="article.commandable==false">
                Article indisponible
            </v-btn>
            <div v-else-if="shopSelected == null">
                <p class="body-1" > Aucun point de vente sélectionné.</p>
                <v-btn color="yellow" x-large  @click="shopSelection = true">
                    Sélectionnez un point de vente
                </v-btn>
            </div>
            
            <div v-else-if="shopSelected && quantity == null">
                <p class="body-1" >Cet article n'est pas disponible dans ce point de vente.</p>
                <v-btn color="yellow" x-large  @click="shopSelection = true">
                    Sélectionnez un autre point de vente
                </v-btn>
            </div>     
               
            <v-btn color="yellow" x-large  @click="addToCart()" v-else-if="quantity && shopSelected">
                
                Ajouter au panier
            </v-btn>
            <p v-if="messageError" class="body-1 red--text pa-2">{{messageError}}</p> 
            <p v-if="quantity" class="body-1 my-4" >Quantité disponible : {{quantity}} pièce(s).</p>
               
        </v-col>
        <v-divider inset class="mt-6"></v-divider>
    </v-row>
    <v-row>
         <v-col cols="12" class="mt-6 text-body-1 text-justify">
            <h3>Caractéristiques :</h3>
            <v-list>
                <v-list-item>
                    Hauteur : {{article.dimension_1}}    
                </v-list-item>
                 <v-list-item>
                    Largeur :{{article.dimension_2}}
                </v-list-item>
                 <v-list-item>
                    Profondeur : {{article.dimension_3}} 
                </v-list-item>
                <v-list-item>
                    Couleur : {{article.couleur}} 
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>
    <v-row>
         <v-col cols="12" class="mt-6 text-body-1 text-justify">
            <h3>Commentaires client :</h3>
            <v-list  v-for="(commentaire,idx) in article.commentaires" :key="idx">
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Commentaire de {{commentaire.client.prenom}} {{commentaire.client.nom}} le {{commentaire.date}}:</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-list-item-icon>
                                <v-icon v-for="(star,index) in commentaire.note_client" :key="index">mdi-star</v-icon>
                            </v-list-item-icon>
                        </v-list-item-subtitle>
                        {{commentaire.commentaire}}
                    </v-list-item-content>
                    
                </v-list-item>
            </v-list>
            <p class="ma-2" v-if="article.commentaires == 0">Pas encore de commentaires sur cet article. </p>
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
    data(){
        return {
            quantitySelector: 1,
            article: {},
            quantity:null,
            shopSelection:false,
            logisticApi:true,
            messageError:null
        }
    },
    async fetch()
    {  
        this.getData()

    },
    mounted() {
         this.getData()
    },
    computed:{
         ...mapGetters('cart', ['shopSelected','getShopName']),
         shopName(){

         }
    },
    methods: {
        async getData()
        {
            let params = {}

            if(this.shopSelected) params["id_boutique"] = this.shopSelected.id_boutique
       
            const result = await this.$axios.get(`/api/catalog/article/${this.$route.params.id}`,{params:params}).catch(err => this.$nuxt.error({ statusCode: 404, message: "Impossible de joindre le service catalogue." }))          
            if(result.data.success == true)
            {   
                if(this.shopSelected){
                    this.article = result.data.response.article
                    this.quantity = result.data.response.quantité
                }else{
                    this.article= result.data.response
                }                  
            }                                        
        },
        getUrlImageOfArticle(base64)
        {   
            return base64 != undefined ? "data:image/jpeg;base64,"+base64 : "/image_not_found.png"
        },
        addToCart() 
        {   
            this.messageError = null
            const number = parseInt(this.quantitySelector);
            if(number != this.quantitySelector && number < 0){
                this.messageError = "Valeur incorrecte !"
                return
            }

            if(this.quantitySelector > this.quantity)
            {
                this.messageError = "Quantité invalide !"
            }
            else
            {        
                this.article.quantity = this.quantitySelector
                this.$store.commit('cart/addArticle',  this.article);
                this.quantity -= this.article.quantity
            }
        },
        selectShop(val)
        {
            this.shopSelection = false
            this.$store.commit('cart/setShop', val);
            this.getData()
          
        }
  },
}
</script>