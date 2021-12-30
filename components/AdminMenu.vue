<template>
    <div id="menu">
        <v-card v-bind:class="[(menu_item_selected == 'overview') ? 'menu_item_selected' : 'menu_item']"
            @click="RouteTo('/admin')">
            <v-card-text class="text-center text-subtitle-2 pa-0 pt-3">
                Vue d'ensemble
            </v-card-text>
        </v-card>


    </div>
</template>

<script>

export default {
    name: 'MenuAdminComponent',

    props: {
        menu_item_selected: {
            type: String,
            default: '',
        },
    },

    methods: {
        displayMessage(text)
        {
            console.log(text);
        },

        RouteTo(route)
        {
            this.$router.push(route);
        }
    }
}
</script>


<style scoped>
#menu
{
    height:400px;
    /* background-color:yellow; */
    flex-direction: column;
    padding:3px;
}
.menu_item
{
    min-height: 40px;
    /* background-color: blue; */
    margin-top:7px;
    margin-bottom: 8px;
    border-radius: 5px;
}

.menu_item_selected
{
    min-height: 40px;
    background-color: rgb(190,190,190);
    margin-top:7px;
    margin-bottom: 8px;
    border-radius: 5px;
}
</style>

