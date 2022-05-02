<template>
  <v-container>
    <v-row justify="center" align="center">
      <AccParallax />
    </v-row>
    <v-row>
      <v-col cols="12" md="7" >
        <v-card color="grey lighten-3">
            <v-carousel cycle height="300px" color="grey darken-3">
              <v-carousel-item>
                <v-img src="/acceuil/cloisonverre.jpg" height="300px">
                  <v-card-title class="carrousel_title"> Cloisons</v-card-title>
                </v-img>
              </v-carousel-item>
              <v-carousel-item>
                <v-img src="/acceuil/paredouche.jpeg" height="300px">
                  <v-card-title class="carrousel_title"> Pare-douche </v-card-title>
                </v-img>
              </v-carousel-item>
              <v-carousel-item>
                <v-img src="/acceuil/insertcheminee.jpg" height="300px">
                  <v-card-title class="carrousel_title"> Insert de cheminée</v-card-title>
                </v-img>
              </v-carousel-item>
            </v-carousel>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" height="300px">
        <v-card id="verretech_intro">
          <v-card-text>
            <b> Bienvenue sur la solution E-Commerce de Verre-Tech. </b>
          </v-card-text>
          <v-card-text>
            Le Groupe Verre-Tech est un groupe 100% familial créé en 1955 par M. Emile Dupont, qui reste,
            encore aujourd’hui le PDG de l’entreprise.
            Depuis son origine Verre-tech est spécialisée et leader dans la fabrication et la distribution en
            magasins de produits en verre techniques et décoratifs.
          </v-card-text>

        </v-card>

      </v-col>
    </v-row>

    <v-row>
        <v-card class="pa-5 ma-1">
          <v-row>
            <v-col cols="4" md="4" >
              <v-img class=" rounded-lg" height="160px"
                elevation="12" contains src="/ecommerce.jpg"> </v-img>
            </v-col>

            <v-col cols="8" md="8" >
              <v-card-title> Nous ouvrons notre solution d'E commerce </v-card-title>

              <v-card-text class="">
                Nous sommes heureux de vous annoncer que Verre Tech a ouvert une boutique E-commerce !
                Vous pouvez ici passer des commandes en Click&collect et ainsi profiter de nos services.
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="pa-5 ma-1">
          <v-row>
            <v-col cols="4" md="4" >
              <v-img class=" rounded-lg" height="160px"
                elevation="12" contains src="/sale.jpg"> </v-img>
            </v-col>

            <v-col cols="8" md="8" >
              <v-card-title> C'est Noël chez Verre-tech !</v-card-title>

              <v-card-text class="">
                Profitez de nos offres exclusives, c'est Noël chez Verre-Tech !
                Allez vite consulter nos articles en promotion.
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>

    </v-row>



  </v-container>

</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active
{
  transition: opacity .5s;
}

.carrousel_title
{
  background-color: rgb(255, 255, 255, 0.12);
  border: 1px solid rgb(255, 255, 255, 0.12);
  border-radius: 50px;
  position: absolute;
  bottom: 60px;
  left:20px;
  color: rgb(200,255,200);
  font-size: 1.5em;
}

#verretech_intro
{
  height: 300px;
}
</style>
