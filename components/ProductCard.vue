<template>
        <v-card class="productcard">
            <span class="text-body-2 d-block ml-2 mt-4 hover:bg-red-400">
            <v-icon> mdi-package-variant-closed </v-icon>
            {{product.intitule_article}}  </span>
            <div class="d-flex ml-2 mt-1">
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