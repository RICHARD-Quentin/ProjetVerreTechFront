<template>
  <v-container>
  <v-stepper v-if="offline==false" v-model="e1">
    <h2 class="d-flex justify-center align-center ma-5">Passer une commande</h2>

    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Récapitulatif</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Identification</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3"> Facturation </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 == 4" step="4"> Validation </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <h3 class="d-flex justify-center align-center ma-5">
          Récapitulatif de votre panier
        </h3>

        <v-row class=" ma-2 flex ">
          <v-col cols="7"> 
            <v-card elevation="4" height="100%">
              <v-card-title>
                Articles dans le panier :
              </v-card-title>
                  <v-card-text>
                    <v-container style="overflow-y: scroll;">
                    <articlesList v-if="getNumberOfArticles>0"/> 
                      <div v-else>Vous n'avez pas encore d'articles dans votre panier, consultez <NuxtLink to="catalog"> notre catalogue ! </NuxtLink></div>
                    </v-container>
                  </v-card-text>
            </v-card>           
          </v-col>
          <v-col class="d-flex ">
            <v-row class="full-height  flex-column">
              <v-col>
                <v-card elevation="2" >
                  <v-card-text>
                    <v-row>
                      <v-col cols="8">
                        Nombre d'articles :
                      </v-col>
                      <v-col>
                        {{getNumberOfArticles}}
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
                        {{getTotalPrice}} €
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row class="my-3">
                      <v-col cols="8" class="font-weight-black">
                        TOTAL TTC:
                      </v-col>
                      <v-col class="font-weight-black">
                        {{ getTotalPrice }} €
                      </v-col>
                    </v-row>
                    <v-btn
                    block
                    large
                    @click="e1 = 2"
                    color="primary"
                    :disabled ="!shopSelected || getArticlesList == 0"
                    elevation="2">Continuer
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card >
                  <v-card-title>Point de retrait</v-card-title>                          
                  <v-card-text>
                    <v-row align="center" justify="center">
                      <v-col cols="1">
                        <v-icon aria-hidden="false" large>
                          mdi-map-marker
                          </v-icon>
                      </v-col>
                      <v-col  v-if="!shopSelected" >
                        <v-btn text @click="dialogSelectorShop=true"> Sélectionnez une boutique </v-btn>
                      </v-col>
                      <v-col  v-else >
                          {{shopSelected.name}}
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col>               
              <v-card >
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
        <h3 class="d-flex justify-center align-center ma-5">
          S'identifier avec son compte
        </h3>
        <div class="mb-12 d-flex flex-column justify-center align-center" height="200px" v-if="!getLoggedIn" max-width="300px" >        
            <div class="flex">Vous devez être connecté pour continuer...</div>
            <v-btn @click="$auth.loginWith('auth0')" class="flex" text>
              <v-icon> mdi-account</v-icon>
              <span v-if="$vuetify.breakpoint.smAndUp">Connexion</span>
            </v-btn>        
        </div>
        <div v-else class="mb-12 d-flex flex-column justify-center align-center">
            <div class="flex">Vous êtes connecté en tant que {{$auth.user.nickname}}</div>
            <v-btn @click="e1 = 3" class="flex" text>
              <v-icon> mdi-arrow-right</v-icon>
              <span v-if="$vuetify.breakpoint.smAndUp" >Continuer avec ce compte</span>
            </v-btn> 
        </div>
        
      </v-stepper-content>
      <v-stepper-content step="3">
         <h3 class="d-flex justify-center align-center ma-5">Facturation</h3>
         <v-row class="ma-2">
           <v-col>
        <v-card class="mb-12" height="100%">
          <v-card-title>Adresse de facturation</v-card-title>
          <v-card-text>
            <v-row > 
              <v-col>
                <v-text-field label="Prénom" />
              </v-col>
              <v-col>
                <v-text-field label="Nom" />
              </v-col>
            </v-row>
            Adresse :
            <v-row>
              <v-col>
                <v-text-field label="Adresse" />              
              </v-col>
              <v-col>
                <v-text-field label="Code postale" />
              </v-col>
            </v-row>          
            <v-text-field label="Ville" />
          </v-card-text>
          </v-card>
          </v-col>
          <v-col cols="5">
            <v-row class="flex-column">
              <v-col>
                <v-card>
              <v-card-title>Modes de paiements disponible</v-card-title>
              <v-card-text>
                <v-btn
                @click="payementMethod = 'Paypal'"
                ><v-img  max-height="100" max-width="100" src="/paypal.png"/>
                </v-btn>
                <v-btn
                @click="payementMethod = 'Paiement sur place'"
                >Paiement sur place
                </v-btn>
              </v-card-text>
                </v-card>
              </v-col>
              <v-col >
                <v-card>
              <v-card-title>Informations</v-card-title>
              <v-card-text>                               
                    <v-row>
                      <v-col>
                        Mode de paiement sélectionné:
                      </v-col>
                      <v-col>
                        {{payementMethod == null ? "Pas de paiement sélectionné":payementMethod}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        A payer sur le site:
                      </v-col>
                      <v-col>
                        <div v-if="payementMethod != 'Paiement sur place'">
                          {{getTotalPrice}} € TTC
                        </div>
                        <div v-else>
                          0 € TTC
                        </div>
                      </v-col>
                    </v-row> 
                    <v-row>
                      <v-col>
                        A payer sur place :
                      </v-col>
                      <v-col>
                        <div v-if="payementMethod == 'Paiement sur place'">
                          {{getTotalPrice}} € TTC
                        </div>
                        <div v-else>
                          0 € TTC
                        </div>                       
                      </v-col>
                    </v-row>               
              </v-card-text>
            </v-card>
              </v-col>
              <v-col>
                <!-- notify-url="<your-ipn-url>"  à placer pour vérifier la transaction coté back...-->
                   <no-ssr>
                <AdvancedPayPal             
                v-if="payementMethod == 'Paypal'"
                :amount="getTotalPrice.toString()"
                currency="EUR"
                env="sandbox"
                :commit="false"
                :button-style="{
                  label: 'checkout',
                    size:  'responsive',
                    shape: 'pill',
                    color: 'gold'
                    }"              
                :client="paypal"
                :experience="experienceOptions"
                @payment-authorized="paypal_autorize"
                @payment-completed="payment_completed_cb">
                </AdvancedPayPal>
                </no-ssr>
                <v-btn 
                v-if="payementMethod == 'Paiement sur place'"
                @click = "validatePayment"
                block
                >
                  Valider ma commande et payer sur place
                </v-btn>

                <v-btn 
                v-if="payementMethod == null"
                disabled
                block
                >
                  Sélectionnez un moyen de paiement...
                </v-btn>
              </v-col>
              
            </v-row>
            
          </v-col>
        
         </v-row>
      </v-stepper-content>

      <v-stepper-content step="4">

        <v-row align="center"  justify="center" style="height:50vh">
          <v-col class="d-flex flex justify-center align-center">
        <v-card max-width="450" v-if="newOrder!=null" >
          <v-card-title>Votre commande a été validée !</v-card-title>
          <v-card-subtitle>Référence de commande: n° <b>{{getOrderNumber}}</b></v-card-subtitle>
          <v-card-text class="flex-column">
            <p>Vous allez recevoir un e-mail concernant les informations de votre commande ! Vous pouvez aussi consulter à tout moment son état, directement sur la page de vos commandes.</p>
            <p>Votre commande est disponible au plus tard dans <span class="text-bold">2h</span>. </p>
            <p>Un e-mail vous sera envoyé pour vous avertir quand elle sera prête!</p>
            <p>La boutique ou retirer votre commande est :</p>
            <v-card>
              <v-card-text>
                {{ shopSelected == null ? "":shopSelected.name}}
              </v-card-text>
              
            </v-card>
          </v-card-text>
        </v-card>
        <v-card max-width="450" v-else>
          <v-card-title class="red">Erreur interne!</v-card-title>
          <v-card-text class="flex-column red lighten-5 pa-4">
            <p>Une erreure s'est produite lors de la création de votre commande.</p>
            <p>Si vous avez effectuez un paiement, celui-ci à directement été annulé.
            <p>Veuillez nous excuser pour ce désagrément et merci de rééssayer plus tard. </p>
            <nuxt-link to="/">Retour à l'acceuil du site</nuxt-link>
       
          </v-card-text>
        </v-card>
          </v-col>
        </v-row>
     
      </v-stepper-content>
      
    </v-stepper-items>
    <v-dialog v-model="dialogSelectorShop" max-width="1000px">
      <SelectShop @Selected="shopSelectedEvent" :showTheMap="dialogSelectorShop"/>
    </v-dialog>
    <!--  -->
  </v-stepper>
  <UnvailableServiceCard serviceName="Commandes" v-else />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import 'leaflet/dist/leaflet.css';
import AdvancedPayPal  from 'vue-paypal-checkout'
import UnvailableServiceCard from '../../components/UnvailableServiceCard.vue';

//test@verretech.com
//verretech1234567

export default {

  components: {
    AdvancedPayPal
     
  },
  data() {
    return {
      validationErrors:null,
      offline:false,
      newOrder:null,
      e1: 1,
      dialogSelectorShop:false,
      payementMethod:null,
      paypal: {
      sandbox: 'AXLIGXzwkNRHVe4HCW4sv0EkMq33O7OKybb6hhRrdj2NCP4HG3CPTmCsqOcJamaiKGgXz83w68tJbWni',
      production: ''
    },
    experienceOptions: {
        input_fields: {
          no_shipping: 1
        }
      }
    };
  },
  created(){
    this.$axios.$get('/api/logistic/order').catch(() => this.offline = true)
  },
  mounted() {
   
  },
  computed: {
    ...mapGetters('cart', ['getArticlesList', 'getTotalPrice', 'getNumberOfArticles','shopSelected']),

  getOrderNumber() {
    return this.newOrder == null ? 0 : this.newOrder.n_commande;
  },

  getLoggedIn() {
      return this.$auth.loggedIn
    }
  },
  methods: {
    async validatePayment()
    {
      this.$axios.$post('/api/logistic/order',
        { 
          payment: 
          {
            method:"None",
            params:{}           
          },
          date_retrait:"2021-10-03T18:39:04.911Z",
          id_boutique: this.shopSelected.id,
          contents: this.getArticlesList.map(val=>{return {code_article:val.id,quantité:val.quantity}}),
          id_client:1
        }).then(result =>{this.newOrder = result.message;})
      .catch(err => this.validationErrors = err.response.data.response)
       this.e1 = 4;
    },
    async paypal_autorize(e)
    {        
  
      this.$axios.$post('/api/logistic/order',
        { 
          payment: 
          {
            method:"Paypal",
            params:
            {
              payerID:e.payerID,
              paymentID: e.paymentID
            }           
          },
          date_retrait:"2021-10-03T18:39:04.911Z",
          id_boutique: this.shopSelected.id,
          contents: this.getArticlesList.map(val=>{return {code_article:val.id,quantité:val.quantity}}),
          id_client:1
        }).then(result =>{console.log(result);this.newOrder = result.message;})
      .catch(err => {
        this.validationErrors = err.response
      })
      this.e1 = 4;
         
     console.log(e)
     
    },
    orderValidate()
    {
      this.$refs.paypal.$el.click()
    },
    createOrder()
    {
      this.e1 = 4;
    },
    shopSelectedEvent(val)
    {    
      this.dialogSelectorShop = false;
      if(val)
      {
        this.$store.commit('cart/setShop',val)
      }   
    },
    payment_completed_cb(res)
    {
      if(res.state == "approved")
      {      
        this.createOrder();
      }
      
    }
  }
};
</script>

<style scoped>
</style>
