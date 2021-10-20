<template>  
    <v-row>
        <v-col cols="3">
            
            <admin-menu :menu_item_selected="menu_item_selected"></admin-menu>
        </v-col>
        <v-col cols="9">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Sauvegardes et backups </v-card-title>
                
                <v-container class="mt-8">
                    <v-row>
                        <v-col cols="12">
                            <v-btn class="ml-8 d-block" color="green lighten-2" @click="save_backup()"> Sauvegarder </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-card-text class="text-h6 font-weight-light font-italic">
                                Dernière sauvegarde
                            </v-card-text>
                            <v-card color="grey lighten-2" class="mt-2 d-block mb-2">
                                <v-row>
                                    <v-col cols="4" >
                                    <p class="pa-2 ma-0 text-h5"> {{recent_save.name}} </p>       
                                    <p class="pa-2 ma-0"> {{recent_save.date}} </p>      
                                    </v-col>
                                    <v-col cols="4" >
                                        <p style="color:rgb(120,200,150);"> <i>Comprend :</i> </p>
                                        <ul>
                                            <li v-if="recent_save.has.users" class="text-body-2"> Utilisateurs </li>
                                            <li v-if="recent_save.has.articles" class="text-body-2"> Articles </li>
                                            <li v-if="recent_save.has.settings" class="text-body-2"> Paramètrage du site </li>
                                        </ul>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn color="primary" class="ma-1" @click="download_save(recent_save.name)">
                                            <v-icon class="mr-2">mdi-download</v-icon>
                                            Télécharger
                                        </v-btn>
                                        <v-btn color="primary" class="ma-1" @click="restore_save(recent_save.name)">
                                            <v-icon class="mr-2">mdi-restore</v-icon>
                                            Restaurer
                                        </v-btn>
                                        <v-btn color="red lighten-1" class="ma-1" @click="delete_save(recent_save.name)">
                                            <v-icon class="mr-2">mdi-delete</v-icon>
                                            Supprimer
                                        </v-btn>
                                    </v-col>
                                </v-row>
                   
                            </v-card>
                        </v-col>
                    </v-row>


                    <v-row>
                        <v-col cols="12">
                            <v-card-text class="text-h6 font-weight-light font-italic">
                                Autres sauvegardes
                            </v-card-text>
                            <v-card v-for="(save,i) in other_saves" :key="i" color="grey lighten-2" class="mt-2 d-block mb-6">
                                <v-row>
                                    <v-col cols="4" >
                                    <p class="pa-2 ma-0 text-h5"> {{save.name}} </p>       
                                    <p class="pa-2 ma-0"> {{save.date}} </p>      
                                    </v-col>
                                    <v-col cols="4" >
                                        <p style="color:rgb(120,200,150);"> <i>Comprend :</i> </p>
                                        <ul>
                                            <li v-if="save.has.users" class="text-body-2"> Utilisateurs </li>
                                            <li v-if="save.has.articles" class="text-body-2"> Articles </li>
                                            <li v-if="save.has.settings" class="text-body-2"> Paramètrage du site </li>
                                        </ul>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn color="primary" class="ma-1" @click="download_save(save.name)">
                                            <v-icon class="mr-2">mdi-download</v-icon>
                                            Télécharger
                                        </v-btn>
                                        <v-btn color="primary" class="ma-1" @click="restore_save(save.name)">
                                            <v-icon class="mr-2">mdi-restore</v-icon>
                                            Restaurer
                                        </v-btn>
                                        <v-btn color="red lighten-1" class="ma-1" @click="delete_save(save.name)">
                                            <v-icon class="mr-2">mdi-delete</v-icon>
                                            Supprimer
                                        </v-btn>
                                    </v-col>
                                </v-row>
                   
                            </v-card>
                        </v-col>
                    </v-row>


                    <v-row>
                        <v-col cols="12">
                            
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'SavesBackups',
    layout: 'adminlayout',
    data() {
        return {
            menu_item_selected: 'saves_backups',

            recent_save: {
                name: 'Version 2.0',
                date: '18/08/2021',
                has: {
                    users: true,
                    articles: true,
                    settings: true
                }
            },

            other_saves: [
                {
                    name: 'Version 1.1',
                    date: '10/08/2020',
                    has: {
                        users: true,
                        articles: true,
                        settings: true
                    }
                },
                {
                    name: 'Base utilisateurs',
                    date: '10/08/2020',
                    has: {
                        users: true,
                        articles: false,
                        settings: false
                    }
                },
                {
                    name: 'Données articles',
                    date: '10/08/2020',
                    has: {
                        users: false,
                        articles: true,
                        settings: false
                    }
                },
            ]
        }
    },

    methods: {
        displayMessage(text)
        {
            console.log(text);
        },

        download_save(name)
        {
            this.displayMessage('Téléchargement de la sauvegarde ' + name);
        },

        restore_save(name)
        {
            this.displayMessage('Restaure de la sauvegarde ' + name);
        },

        delete_save(name)
        {
            this.displayMessage('Suppression de la sauvegarde ' + name);
        },

        save_backup()
        {
            // TODO création d'un menu hovered
            this.displayMessage('Sauvegarde du site');
        },


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