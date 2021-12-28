<template>
        <v-card class="usercard">
            <span class="text-body-2 d-block ml-2 mt-4 hover:bg-red-400">
            <v-icon>mdi-account</v-icon>
            {{shop}} </span>
            <div class="d-flex ml-2 mt-1">

            </div>
        </v-card>
</template>

<script>

export default {
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

.usercard
{
    margin:8px;
    width:250px;
    min-height:70px;
    background-color: rgb(240,240,240);
}


</style>