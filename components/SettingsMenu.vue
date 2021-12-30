<template>
    <div id="menu">
        <v-card  v-bind:class="[(menu_item_selected == 'shop_settings') ? 'menu_item_selected' : 'menu_item']"
            @click="RouteTo('/admin/shopsettings')">
            <v-card-text class="text-center text-subtitle-2 pa-0 pt-3">
                Paramètres de la boutique
            </v-card-text>
        </v-card>

        <v-card v-bind:class="[(menu_item_selected == 'account_settings') ? 'menu_item_selected' : 'menu_item']"
            @click="RouteTo('/admin/accountsettings')">
            <v-card-text class="text-center text-subtitle-2 pa-0 pt-3">
                Paramètres du compte
            </v-card-text>
        </v-card>

        
        <v-card v-bind:class="[(menu_item_selected == 'edit_website') ? 'menu_item_selected' : 'menu_item']"
            @click="RouteTo('/admin/editwebsite')">
            <v-card-text class="text-center text-subtitle-2 pa-0 pt-3">
                Modifier le site internet
            </v-card-text>
        </v-card>

        
        <v-card v-bind:class="[(menu_item_selected == 'saves_backups') ? 'menu_item_selected' : 'menu_item']"
            @click="RouteTo('/admin/savesbackups')">
            <v-card-text class="text-center text-subtitle-2 pa-0 pt-3">
                Sauvegardes et backups
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
            default: 'shop_settings',
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

