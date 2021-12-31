<template>

        <v-card class="shopcard">
            <div  class="logoshopcard d-block mx-auto">
                <!-- <v-btn right small color="primary" dark @click.stop="RouteTo('/admin/shops/')">
                        <v-icon dark  right small> mdi-pencil </v-icon>
                    </v-btn> -->
                <v-icon  class=" d-block mx-auto text-center"
                    color="green darken-2"> mdi-cart </v-icon>
                    
            </div>
            

            <v-card-title> {{shop.enseigne}} </v-card-title>
            <v-card-subtitle> {{shop.adresse_magasin}} </v-card-subtitle>
        </v-card>
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

</style>