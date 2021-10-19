<template>  
    <v-row>
        <v-col cols="3">
            
            <admin-menu :menu_item_selected="menu_item_selected"></admin-menu>
        </v-col>
        <v-col cols="9">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Paramètre du compte </v-card-title>

            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'AccountSettings',
    layout: 'adminlayout',
    data() {
        return {
            menu_item_selected: 'account_settings',
        }
    },

    methods: {
        displayMessage(text)
        {
            console.log(text);
        }
    }
}
</script>


<style scoped>


#main_content
{
    min-height: 400px;
    /* background-color: yellow; */
}

</style>