<template>
    <v-row>
        <v-col cols="12">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Magasins </v-card-title>
                <v-divider  class="mx-16 my-4"></v-divider>
                    
                    <v-btn color="primary" class="my-1 mx-8" @click="gotoCreateShop()">
                        <v-icon class="mr-2">mdi-plus</v-icon>
                        Ajouter une boutique
                    </v-btn>


                <v-divider  class="mx-16 my-4"></v-divider>

                <v-container class=" mt-4 d-flex flex-wrap" >
                    <ShopCard v-for="shop in shops" :shop="shop" :key="shop.id_boutique"></ShopCard>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'AdminShops',
    layout: 'adminlayout',
    
    data() {
        return {
            shops: [],
            offline : false,
        }
    },

    created() {
        this.$axios.get('/api/catalog/shop')
            .then(response => {
                this.shops = response.data.response;
                this.offline = false;
                
                console.log("azeaze");
                console.log(response.data);
                for(let i = 0; i < this.products.length ; i++)
                {
                    console.log(this.products[i]);
                }
            })
            .catch(error => {
                this.offline = true;
            });
    },

    methods:
    {
        gotoCreateShop()
        {
            this.$router.push('/admin/shops/create');
        }
    }

}

</script>
