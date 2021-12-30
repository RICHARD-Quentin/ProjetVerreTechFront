<template>
        <v-card class="productcard">
            <v-row>
                <v-col cols="8">
                     <span class=" font-weight-bold d-block text-center ">
                    <v-icon> mdi-package-variant-closed </v-icon>
                    {{product.intitule_article}}  
                    </span>
                </v-col>
                <v-col cols="4">
                    <v-btn color="primary" dark @click.stop="RouteTo('/admin/products/' + product.code_article)">
                        <v-icon dark  right small> mdi-pencil </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
           
            <div class="d-flex ml-2 mt-1 font-weight-light text-center">
                code_article: {{product.code_article}}
            </div>
            <!-- image -->
            <v-img
                :src="'data:image/jpeg;base64,' + product.image"
                aspect-ratio="1"
                contain
                class="mx-auto d-block"
            ></v-img>
        </v-card>
</template>

<script>

export default {
    name: "ProductCard",
    props: {
        product: {
            type: Object,
            required: true
        }
    },

    methods: 
    {
        RouteTo(url) {
            this.$router.push(url);
        }
    }
}

</script>


<style scoped>

.productcard
{
    margin:8px;
    width:250px;
    min-height:70px;
    background-color: rgb(240,240,240);
}


</style>