<template>
    <v-hover v-slot="{ hover }">
        <v-card class="shopcard"  :class="{ 'on-hover': hover }" :elevation="hover ? 12 : 2">
            <div  class="logoshopcard d-block mx-auto">
                <!-- <v-btn right small color="primary" dark @click.stop="RouteTo('/admin/shops/')">
                        <v-icon dark  right small> mdi-pencil </v-icon>
                    </v-btn> -->
                <v-icon  class=" d-block mx-auto text-center"
                    color="green darken-2"> mdi-cart </v-icon>
                    
            </div>
            

            <v-card-title> {{shop.enseigne}} </v-card-title>
            <v-card-subtitle> {{shop.adresse_magasin}} </v-card-subtitle>
            <v-card-text class="ma-0 py-0"> Latitude : {{shop.lat}} </v-card-text>
            <v-card-text class="ma-0 py-0"> Longitude : {{shop.lng}} </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>
import about from '../pages/about.vue'

export default {
  components: { about },
    name: "ShopCard",
    props: {
        shop: {
            type: Object,
            required: true
        }
    },
}

</script>


<style scoped>

.shopcard
{
    margin:8px;
    width:250px;
    min-height:70px;
    background-color: rgb(240,240,240);
}

.logoshopcard
{
    width:100%;
}

.v-card {
  transition: opacity .4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.6;
 }
</style>