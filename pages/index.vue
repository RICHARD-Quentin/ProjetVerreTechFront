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
          <v-card-title> Nos adresses </v-card-title>
          <v-row>
            <v-col cols="12" md="2" >
            <img
              src="location.svg"
              alt="un triangle aux trois côtés égaux"
              height="50px"
              width="50px" />
            </v-col>
            <v-col cols="12" md="9" 
              justify="center"
              align="left"
              class="px-0"

              >
              <v-card-text class="adresses">
                  Toulouse
              </v-card-text>
            </v-col>

          </v-row>

          <v-row height="40px" no-gutters>
            <v-col cols="12" md="2" >
            <img
              src="location.svg"
              alt="un triangle aux trois côtés égaux"
              height="50px"
              width="50px" />
            </v-col>
            <v-col cols="12" md="9" 
              justify="center"
              align="left"
              class="px-0"

              >
              <v-card-text class="adresses">
                  Paris
              </v-card-text>
            </v-col>

          </v-row>

          <v-row height="30px" no-gutters>
            <v-col cols="12" md="2" >
            <img
              src="location.svg"
              alt="un triangle aux trois côtés égaux"
              height="50px"
              width="50px" />
            </v-col>
            <v-col cols="12" md="9" 
              justify="center"
              align="left"
              class="px-0"

              >
              <v-card-text class="adresses">
                  Nancy
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
