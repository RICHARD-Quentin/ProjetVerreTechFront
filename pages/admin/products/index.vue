<template>
    <v-row>
        <v-col cols="12">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Articles </v-card-title>
                <v-divider  class="mx-16 my-4"></v-divider>

                <v-container class=" mt-4 d-flex flex-wrap" >
                    <ProductCard v-for="prod in products" :product="prod" :key="prod.code_article"></ProductCard>
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
            offline : false,
            image: null,
        }
    },

    created() {
        this.$axios.get('/api/catalog/article')
            .then(response => {
                this.products = response.data.response;
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

    methods: {

        fetchArticles() {
            this.$http.get('/api/catalog').then(response => {
                this.products = response.data;
            });
        },

        getJsonImage: function(image) {
            this.image = image;
        },
    },
    

}

</script>
