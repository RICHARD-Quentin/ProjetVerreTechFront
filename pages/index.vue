<template>
  <v-container>
    <v-row justify="center" align="center">
      <AccParallax />
    </v-row>
    <v-row>
      <v-col cols="12" md="7" >
        <v-card>
          <v-card-title>
            <v-carousel
              cycle
              height="400px"
            >
              <v-carousel-item>
                <v-img
                  src="/woman.jpg"
                height="400px"
                >
                <v-card-title class="carrousel_title"> Achète mon parpaing. </v-card-title>
                </v-img>
              </v-carousel-item>

              <v-carousel-item>
                <v-img
                  src="/pink.jpg"
                  height="400px"
                >
                <v-card-title class="carrousel_title"> Je mange des frites des fois le soir </v-card-title>
                </v-img>
              </v-carousel-item>
            </v-carousel>

          </v-card-title>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="5" >
        <v-card>
          <v-card-title class="text-h5"> Nos adresses </v-card-title>
          
          <v-row class="mx-10 py-4">
            <v-btn
              block
              elevation="2"
              large
              small
              class="py-9"
              style="width:200px;"
            >
              <v-col cols="2" md="2" >
              
              <img
                src="location.svg"
                alt="Symbole_localisation"
                height="50px"
                width="50px" />
              </v-col>
              <v-col cols="9" md="9" 
                justify="center"
                align="left"
                class="px-0"

                >
                <v-card-text class="adresses">
                    Nancy
                </v-card-text>
              </v-col>
            </v-btn>
          </v-row>

          <v-row class="mx-10 py-4">
            <v-btn
              block
              elevation="2"
              large
              small
              class="py-9"
              style="width:200px;"
            >
              <v-col cols="2" md="2" >
              
              <img
                src="location.svg"
                alt="Symbole_localisation"
                height="50px"
                width="50px" />
              </v-col>
              <v-col cols="9" md="9" 
                justify="center"
                align="left"
                class="px-0"

                >
                <v-card-text class="adresses">
                    Toulouse
                </v-card-text>
              </v-col>
            </v-btn>
          </v-row>

          <v-row class="mx-10 py-4">
            <v-btn
              block
              elevation="2"
              large
              small
              class="py-9"
              style="width:200px;"
            >
              <v-col cols="2" md="2" >
              
              <img
                src="location.svg"
                alt="Symbole_localisation"
                height="50px"
                width="50px" />
              </v-col>
              <v-col cols="9" md="9" 
                justify="center"
                align="left"
                class="px-0"

                >
                <v-card-text class="adresses">
                    Paris
                </v-card-text>
              </v-col>
            </v-btn>
          </v-row>
        </v-card>

      </v-col>
    </v-row>

    <v-row>
      
      <v-col cols="12" md="12" >
      <v-sheet
    class="mx-auto pa-5"
    elevation="3"
    
  >
      <v-card-title class="text-h4"> Nos articles populaires </v-card-title>        

    <v-slide-group
      v-model="model"
      class="pa-4"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="n in 15"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <v-card
          class="ma-2"
          height="220"
          width="200"
          elevation="4"
          x-large
          @click="toggle"
        >

        <v-img contain src="/datamock/flower4.jpg"></v-img>
        <v-card-title>
          <v-rating
              background-color="grey"
              color="teal"
              length="5"
              size="19"
              value="4.5"
              readonly
              half-increments
              
            ></v-rating>

          <v-card-title-text>
            <v-spacer>FleurumSpectrum</v-spacer>
            
          </v-card-title-text>
        </v-card-title>

        



        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
      </v-col>      
    </v-row>

    <v-row>
      <v-col cols="12" md="12" >
        <v-card class="pa-5">
        <v-card-title class="text-h4"> Nos actualités </v-card-title>


        <v-row>
          <v-col cols="4" md="4" >
            <v-card elevation="12">

            <v-img class=" rounded-lg"
               elevation="12" contains src="/datamock/flower5.jpg"> </v-img>
            </v-card>
          </v-col>
          <v-col cols="8" md="8" >
            <v-card-title class="text-h4"> Nous ne vendons pas de fleur ! </v-card-title>

            <v-card-text class="text-h6 text--lighten-1 grey--text">
              Je ne sais pas qui est l'énergue humaine qui a trouvé intelligent de mettre des femmes et des fleurs sur ce site, c'est une honte ! 
              En attendant sachez que si je le trouve, je lui fais manger la définition d'une vitre et la définition d'une fleur. Bon le texte n'est toujours pas assez grand,
              alors je cause un peu plus comme ça, ça remplit bien la case. N'est ce pas merveilleux ?
            </v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" md="4" >
            <v-card elevation="12">

            <v-img class=" rounded-lg"
               elevation="12" contains src="/datamock/flower1.jpg"> </v-img>
            </v-card>
          </v-col>
          <v-col cols="8" md="8" >
            <v-card-title class="text-h4"> Non très sérieusement </v-card-title>

            <v-card-text class="text-h6 text--lighten-1 grey--text">
              Va falloir faire quelque chose, parce que là c'est très grave.
            </v-card-text>
          </v-col>
        </v-row>




        </v-card>
      </v-col>
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
  position: absolute;
  bottom: 40px;
}

.adresses {
    font-size: 1.2em;
}
</style>
