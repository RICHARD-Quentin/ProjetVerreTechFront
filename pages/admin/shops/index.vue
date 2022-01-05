<template>
    <v-row>
        <v-col v-if="!this.loading" cols="12">
            <v-card v-if="this.serviceonline" id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Magasins </v-card-title>

                <!-- modifier -->

                <v-divider  class="mx-16 my-4"></v-divider>
                    
                    <v-btn color="primary" class="my-1 mx-8" @click="gotoCreateShop()">
                        <v-icon class="mr-2">mdi-plus</v-icon>
                        Ajouter une boutique
                    </v-btn>


                <v-divider  class="mx-16 my-4"></v-divider>

                <v-container class=" mt-4 d-flex flex-wrap justify-center " >
                    <ShopCard v-for="shop in shops" :shop="shop" :key="shop.id_boutique"></ShopCard>
                </v-container>
            </v-card>
            <v-card v-else>
                <v-card-title class="text-center mx-auto d-block"> Le service est indisponible </v-card-title>
                <v-card-subtitle class="text-center mx-auto d-block"> Veuillez contacter votre administrateur réseau </v-card-subtitle>

                <!-- veritcal flex -->
                <v-container>
                    <v-row>
                        <v-col>
                             <span class="mx-auto font-weight-bold text-center justify-center d-block" style="color:rgb(100,100,150)" > Disponibilité des services </span>
                                <v-card-text align="center" class="d-inline-block pa-0"> Service Utilisateur  <b>{{service_user}}</b> </v-card-text>
                                <v-card-text align="center" class="d-inline-block  pa-0"> Service Catalogue  <b>{{service_catalog}}</b> </v-card-text>
                                <v-card-text align="center" class="d-inline-block pa-0 "> Service de commande  <b>{{service_logistic}}</b> </v-card-text>
                        </v-col>
                    </v-row>
                </v-container>

            </v-card>
        </v-col>
        <v-col v-else cols="12" class="pa-16">
            <v-card elevation=0>
                <v-card-title class="mx-auto font-weight-bold text-center justify-center d-block" > Chargement .. </v-card-title>
                <v-progress-circular
                class="justify-center mx-auto d-block"
                indeterminate
                :size="70"
                color="primary"
                ></v-progress-circular>
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
            serviceonline : false,
            loading: true,

            services_availables: {
                catalog: false,
                users: false,
                logistic: false,
            }
        }
    },

    computed: {

        service_user() {
            if(this.services_availables.users) {
                return 'ONLINE'
            } else {
                return 'OFFLINE'
            }
        },

        service_catalog() {
            if(this.services_availables.catalog) {
                return 'ONLINE'
            } else {
                return 'OFFLINE'
            }
        },

        service_logistic() {
            if(this.services_availables.logistic) {
                return 'ONLINE'
            } else {
                return 'OFFLINE'
            }
        }
    },

    created() {

        this.$axios.get('/api/catalog/shop')
            .then(response => {
                this.shops = response.data.response;
                this.serviceonline =  true;
                this.loading =false;
            }).catch(error => {
                console.log("Checking services..");
                this.checkServices();
                this.loading = false;
            });
    },

    methods:
    {
        gotoCreateShop()
        {
            this.$router.push('/admin/shops/create');
        },

        async checkServices()
        {
            try
            {
                // this.$axios.get('/api/catalog/')
                // .then(response => {
                //     this.services_availables.catalog = true;
                // })

                this.$axios.get('/api/user')
                .then(response => {
                    this.services_availables.users = true;
                })

                this.$axios.get('/api/logistic/order')
                .then(response => {
                    this.services_availables.logistic = true;
                })

            }catch(error)
            {
                console.log("failed");
            }
        }
    }

}

</script>
