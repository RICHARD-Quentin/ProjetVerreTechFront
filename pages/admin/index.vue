<template>  
    <v-card>
        <v-card-title>
            <span class="pa-5 headline text-center mx-auto">Administration de la boutique</span>
        </v-card-title>

        <v-container>
            <v-card-text>
                Bienvenue dans la partie administration de la boutique. Vous pouvez ici consulter et gérer les produits, les magasins, les commandes et les Utilisateurs.
                Vous pouvez également consulter les statistiques dans la partie "statistiques" située ci-dessus dans la navigation.
            </v-card-text>
        </v-container>

        <v-card-text> Ci-dessous, vous pouvez gérer les actualités et en publier en quelques clics : </v-card-text>

        <v-card class="pb-10"> 
            <v-card-text>
                <v-btn color="primary" @click="displayMessage('AjouterUneActualite') ">Ajouter une actualité</v-btn>
            </v-card-text>

            <template v-if="actualites.length > 0" v-for="(item,i) in actualites">
                <v-card color="grey" class="ma-5 pa-5  ">

                    <v-row>
                        <v-col cols="4" md="4" >
                            <v-card elevation="12">
                            <v-img class=" rounded-lg"
                            elevation="12" contains src="/datamock/flower5.jpg"> </v-img>
                            </v-card>
                        </v-col>
                        <v-col cols="8" md="8" >
                            <v-card-title class="text-h4"> {{item.title}} </v-card-title>
                            <v-card-subtitle class="text-h5"> {{item.date}} </v-card-subtitle>

                            <v-card-text>
                                {{item.content}}
                            </v-card-text>

                            <v-card-actions>
                                <v-btn color="primary" @click="modifyActualite(item.id)">Modifier</v-btn>
                                <v-btn color="error" @click="deleteActualite(item.id)">Supprimer</v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card>
            </template>
            <template v-else>
                <v-card-text> Vous n'avez pas d'actualité ! Pensez à en créer, elles apparaitront ici ! </v-card-text>
            </template>

        </v-card>

        


    </v-card>
</template>

<script>

export default {
    name: 'admin',
    layout: 'adminlayout',

    data() {
        return {
            actualites: [
                {
                    id: 1,
                    src: '/datamock/flower5.jpg',
                    title: 'Nouveau produit',
                    content: 'Lorem ipsum ipsum le lorem',
                    date: '2020-10-01'
                },
                {
                    id: 2,
                    src: '/datamock/flower5.jpg',
                    title: 'Nouveau cazecazc',
                    content: 'Lorem ipsum ipsum le lorem',
                    date: '2020-06-01'
                },
                {
                    id: 3,
                    src: '/datamock/flower5.jpg',
                    title: 'Nouveau veve',
                    content: 'Lorem aaaaaaaaaa ipsum le lorem',
                    date: '2020-01-20'
                },
                {
                    id: 4,
                    src: '/datamock/flower5.jpg',
                    title: 'sss produit',
                    content: 'qqqqqqqqqq ipsum ipsum le lorem',
                    date: '2020-01-01'
                },
            ]
        }
    },

    methods: {
        modifyActualite(id) {
            console.log(id);
            console.log('modify');
        },

        deleteActualite(id) {
            console.log(id);
            console.log('delete');
        },

        displayMessage(text)
        {
            console.log(text);
        }
    }
}
</script>
