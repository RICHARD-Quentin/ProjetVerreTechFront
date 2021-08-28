<template>
  <v-stepper v-model="e1">
    <h2 class="d-flex justify-center align-center ma-5">Passer une commande</h2>

    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Récapitulatif
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Identification
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"> Facturation </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4"> Validation </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <h3 class="d-flex justify-center align-center ma-5">
          Récapitulatif de mon panier
        </h3>

        <v-row>
          <v-col cols="7"> La j'attends Quentin </v-col>
          <v-col>
            <v-row class="full-height pa-2 d-flex flex-column">
              <v-col>
                <v-card elevation="2">
                  <v-card-text>
                    <v-row>
                      <v-col cols="8">
                        Nombre d'articles :
                      </v-col>
                      <v-col>
                        2
                      </v-col>
                    </v-row>
                   
                    <v-row >
                      <v-col cols="8" class="py-0">
                        Frais de livraison :
                      </v-col>
                      <v-col  class="py-0">
                      0 € (Click & Collect)
                      </v-col>
                    </v-row>                 
                    <v-row >
                      <v-col cols="8">
                        Total hors taxe :
                      </v-col>
                      <v-col>
                        50 €
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row class="my-3">
                      <v-col cols="8" class="font-weight-black">
                        TOTAL TTC:
                      </v-col>
                      <v-col class="font-weight-black">
                        50 €
                      </v-col>
                    </v-row>
                    <v-btn
                    block
                    large
                    @click="e1 = 2"
                    color="primary"
                    :disabled ="!boutique"
                    elevation="2">Continuer
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>Point de retrait</v-card-title>                          
                  <v-card-text>
                    <v-row align="center" justify="center">
                      <v-col cols="1">
                        <v-icon aria-hidden="false" large>
                          mdi-map-marker
                          </v-icon>
                      </v-col>
                      <v-col  v-if="!boutique" >
                        <v-btn text > Sélectionnez une boutique </v-btn>
                      </v-col>
                      <v-col  v-else >
                          boutique...
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col>               
              <v-card>
                <v-card-text class="font-weight-black text-md-center">
                  Une question ? <br />
                  Contactez-nous au <a href="callto:0387696910">0387696910</a>
                </v-card-text>
              </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn text @click="e1 = 1"> Retour </v-btn>

        <v-btn color="primary" @click="e1 = 3"> Suivant </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn text @click="e1 = 2"> Retour </v-btn>

        <v-btn color="primary" @click="e1 = 4"> Suivant </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-btn text @click="e1 = 3"> Retour </v-btn>
        <v-btn color="primary" @click="e1 = 1"> Valider ma commande ! </v-btn>
      </v-stepper-content>
      
    </v-stepper-items>
    <SelectShop />
  </v-stepper>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      e1: 1,
      boutique:null,
      fakeArticles: [
        {
          name: "Insert de cheminée badass",
          quantity: 1,
          image_url:
            "https://www.mypoele.com/2937-large_default/insert-cheminee-bois-nordica-inserto-70h49-ventilato.jpg",
          prix: 200,
        },
      ],
    };
  },
  mounted() {},
  computed: {
    ...mapGetters("cart", ["getNumberOfArticles", "getArticlesList"]),
  },
};
</script>

<style scoped>
</style>
