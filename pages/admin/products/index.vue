<template>
    <v-row>
        <v-col v-if="!this.loading" cols="12">
            <v-card v-if="this.serviceonline" id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Articles </v-card-title>
                <v-divider  class="mx-16 my-4"></v-divider>

                
                <v-btn color="primary" class="my-1 mx-8" @click="gotoCreateProduct()">
                    <v-icon class="mr-2">mdi-plus</v-icon>
                    Ajouter un article
                </v-btn>

                <v-row class="mx-auto d-block">
                    <v-col cols="12" class="mx-auto d-block">
                        <v-row>
                            <v-col cols="12" class="mx-auto d-block">
                                <v-text-field
                                    v-model="search"
                                    label="Rechercher"
                                    single-line
                                    hide-details
                                    prepend-inner-icon="mdi-magnify"
                                    @keyup.enter="filterproducts()"
                                    class="mx-auto d-block"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <v-divider  class="mx-16 my-4"></v-divider>

                <v-container class=" mt-4 d-flex flex-wrap justify-center" >
                    <ProductCard v-for="prod in filtered_products" :product="prod" :key="prod.code_article"></ProductCard>
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
    name: 'AdminProducts',
    layout: 'adminlayout',
    
    data() {
        return {
            products: [],
            filtered_products: [],
            image: null,

            search: '',
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
        this.$axios.get('/api/catalog/article')
            .then(response => {
                this.products = response.data.response.rows;
                this.filtered_products = this.products;
                this.serviceonline = true;
                this.loading = false;
            })
            .catch(error => {
                this.serviceonline = false;
                
                this.checkServices();
                this.loading = false;
            });
    },

    methods: {

        fetchArticles() {
            this.$http.get('/api/catalog').then(response => {
                this.products = response.data;
            });
        },

        getJsonImage: function(image) {
            this.image = image;
        },

        gotoCreateProduct() {
            this.$router.push('/admin/products/create');
        },

        filterproducts() {

            if(this.search.length > 0)
            {
                let thesearch = this.search.toLowerCase();
                this.filtered_products = this.products.filter(function(product) {
                    return product.intitule_article.toLowerCase().includes(thesearch);
                });

            }
            else
            {
                this.filtered_products = this.products;
            }
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


    },
    

}

</script>
