<template>  
    <v-row>
        <v-col cols="12" md="3">
            
            <settings-menu :menu_item_selected="menu_item_selected"></settings-menu>
        </v-col>
        
        <v-col cols="12" md="9">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Editer le site </v-card-title>

                <v-card> 
                    <v-textarea class="mx-10 mt-2 mb-0" background-color="grey lighten-3" label="Description" placeholder="Description" solo :value="description"
                    color="teal">
                            </v-textarea >
                    <v-row  class="text-right">
                        <v-col>
                            <v-btn color="primary" class="mb-2 mr-10" >
                                <v-icon class="mr-2">mdi-update</v-icon>
                                Sauvegarder
                            </v-btn>
                        </v-col>
                    </v-row> 
                </v-card>
                <v-card class="pa-5 ma-5">
                    <v-row>
                        <v-col cols="4" md="4" >
                        <v-img class=" rounded-lg" height="160px"
                            elevation="12" contains src="/ecommerce.jpg"> </v-img>
                        </v-col>

                        <v-col cols="8" md="8" >
                            <v-card-title> Nous ouvrons notre solution d'E commerce </v-card-title>

                            <v-card-text class="">
                                Nous sommes heureux de vous annoncer que Verre Tech a ouvert une boutique E-commerce ! 
                                Vous pouvez ici passer des commandes en Click&collect et ainsi profiter de nos services.
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <v-btn color="primary" class="ma-1" @click="download_save(recent_save.name)"><v-icon class="mr-2">mdi-download</v-icon>Modifier</v-btn>
                    <v-btn color="red lighten-1" class="ma-1" @click="delete_save(recent_save.name)"><v-icon class="mr-2">mdi-delete</v-icon>Supprimer</v-btn>

                </v-card>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'WebsiteEdit',
    layout: 'adminlayout',
    data() {
        return {
            menu_item_selected: 'edit_website',

            description: '',
        }
    },

    created() {
        
        // Retrieve description
        this.description = "Le Groupe Verre-Tech est un groupe 100% familial créé en 1955 par M. Emile Dupont, qui reste,"+
            "encore aujourd’hui le PDG de l’entreprise."+
           " Depuis son origine Verre-tech est spécialisée et leader dans la fabrication et la distribution en" +
           " magasins de produits en verre techniques et décoratifs.";
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