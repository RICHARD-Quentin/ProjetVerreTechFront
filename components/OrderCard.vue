<template>
    <v-container class="lighten-5">
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
         <v-col class="ma-4">Montant total TTC: {{order.montant}} € </v-col>
         <v-col class="ma-4">Etat de la commande : {{stateOrder}} </v-col>
        </v-row>

        <v-container v-if="display==true">
        <v-row >
            <v-col v-for ="(content,idx) in order.contenus" cols="3" :key="idx">
               
            <v-sheet              
                color="white"
                elevation="2"           
                >              
                <v-img
                   
                    v-if="content.article.image == undefined"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="150"
                    max-width="250"
                    src="https://picsum.photos/id/11/500/300"
                ></v-img>
                <v-img v-else v-bind:src="'data:image/jpeg;base64,'+content.article.image" />
                <div class="flex flex-column ma-2">
                <h3>{{content.article.intitule_article}}</h3>
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
                min-height="180"
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
                min-height="180"
                elevation="2">
                    <v-row class="pa-2">                       
                        <v-col  v-if="order.factures.length > 0">
                            <v-list class="ma-0 pa-0">
                            <v-list-item>Numéro de facture :{{order.factures[0].no_facture}}</v-list-item>
                            <v-list-item>Numéro de commande :{{order.factures[0].n_commande}}</v-list-item>
                            <v-list-item>Réglé le : {{order.factures[0].date_facture}}</v-list-item>
                            </v-list>
                        </v-col>
                        <v-col  v-else>
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
                    return "Commande retourné en stock"
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
