<template>
    <v-row>
        <v-col cols="12">
            <v-card id="main_content">
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

                <v-container class=" mt-4 d-flex flex-wrap" >
                    <ProductCard v-for="prod in filtered_products" :product="prod" :key="prod.code_article"></ProductCard>
                </v-container>
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
            offline : false,
            image: null,

            search: ''
        }
    },

    created() {
        this.$axios.get('/api/catalog/article')
            .then(response => {
                this.products = response.data.response;
                this.filtered_products = this.products;
                this.offline = false;
            })
            .catch(error => {
                this.offline = true;
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

    },
    

}

</script>
