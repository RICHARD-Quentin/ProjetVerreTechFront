<template>
    <v-container>
        <v-row>
            <v-col cols="1">
                <v-btn small fab v-on:click="toogleDisplay()">
                <v-icon >                 
                    {{buttonDisplay}}
                </v-icon>
            </v-btn>
            </v-col>
            <v-col>
                <h2>Commande n° {{order.n_commande}}</h2>
            </v-col>
        </v-row>
            
           
        <v-row>
         <v-col class="ma-4">Montant : {{order.montant}} € </v-col>
         <v-col class="ma-4">Etat de la commande : {{stateOrder}} </v-col>
        </v-row>

        <v-container v-if="display==true">
        <v-row>
            <v-col v-for ="content in order.contenus" cols="3" :key="content.code_article">
            <v-sheet              
                color="white"
                elevation="2"           
                >
                <h3>{{content.article.intitule_article}}</h3>
                <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="150"
                    max-width="250"
                    src="https://picsum.photos/id/11/500/300"
                ></v-img>
                <div class="flex flex-column">
                <div>Quantité : {{content.quantite}}</div>
                <div>Prix unitaire : {{content.article.prix_achat}} €</div>
                <div>Prix total : {{content.article.prix_achat*content.quantite}} €</div>
                </div>
            </v-sheet>
         </v-col>
        </v-row>

        <v-row  class="grey d-flex lighten-5">
            <v-col>
                <h4>Point de retrait :</h4>
                <v-sheet  color="white"
                class="mt-4"
                min-height="100"
                elevation="2"  >
                <v-row>
                    <v-col cols="2">
                    </v-col>
                    <v-col cols="5">
                    <h3>{{order.boutique.enseigne}}</h3>
                    {{order.boutique.adresse_magasin}}
                    </v-col>
                    <v-col cols="4">
                        <v-btn small>Consulter ce catalogue</v-btn>
                    </v-col>
                </v-row>
                </v-sheet>
            </v-col>
            <v-col >
                <h4>Facturation :</h4>
                <v-sheet  color="white"
                class="mt-4"
                min-height="100"
                elevation="2">
                    <v-row> 
                        <v-col cols="2">
                        </v-col>
                        <v-col cols="5" v-if="order.factures.length > 0">
                            Tout ce qui concerne la facturation
                        </v-col>
                        <v-col cols="5"  else>
                            Pas encore de facture pour cette commande.
                        </v-col>
                   </v-row>
                </v-sheet>
            </v-col>
        </v-row>

        </v-container>
        
    <v-divider/>
    </v-container>
</template>

<script>
export default {
    props:{
    order: Object
    }, 

    data () {
      return {
          display:false
      }
    },

    computed:{
        stateOrder(){
            console.log(this.order.statut)
            switch(this.order.statut)
            {
                case "Preperation":
                    return "En préparation"
                case "Ready":
                    return "¨Prête à être retirée"
                case "TookOf":
                    return " Retirée"
                case "Cancelled":
                    return "Commande annulée"
                case "BackInStore":
                    return "Commande annulée"
            }
        },
        buttonDisplay(){
            return this.display == false ? "mdi-plus": "mdi-minus"
        }
    },

    methods: { 

        toogleDisplay()
        {
            this.display == false ? this.display = true: this.display = false;
        }
    }
}
</script>