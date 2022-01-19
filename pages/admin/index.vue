<template>
    <v-row>
        <v-col cols="12">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Bienvenue dans la partie Administration </v-card-title>

                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-card-text>
                                <p>
                                    Vous pouvez ici gérer les différents paramètres de votre boutique, afficher des messages personnalisés, gérer les commandes, les clients, les produits, les catégories, les promotions, les utilisateurs, etc.
                                </p>

                                <h4> Vous pouvez télécharger la doc client en cliquant ici : </h4>
                                <a href="DocumentationClientVerreTech.pdf"  download=""> Documentation client </a>

                            </v-card-text>
                        </v-col>
                    </v-row>
                    <v-row> <v-divider> </v-divider> </v-row>

                    <v-row>
                        <v-container class="ma-4">
                            <span class="text-h5 text-center mx-auto d-block"> Services disponibles</span>

                            <div  class="ma-7 pa-2">
                                <template v-for="(service,i) in services" >
                                    <div class="entry" :key="i"> <b>{{service.nom}}  </b>- {{service.description}} </div>
                                </template>
                            </div>
                        </v-container>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'admin',
    layout: 'adminlayout',
    middleware: 'admin',
    data() {
        return {

            services : [
                {
                    nom: "Magasins",
                    description: "Consulter et créer des magasins"
                },
                {
                    nom: "Articles",
                    description: "Consulter, créer et modifier des articles"
                },
                {
                    nom: "Statistiques",
                    description: "Statistiques globales du site"
                },
                {
                    nom: "Utilisateurs",
                    description: "Visualiser la liste des utilisateurs"
                },
                {
                    nom: "Paramètres",
                    description: "Modifier vos paramètres de paiement, la page d'accueil, sauvegardes, etc."
                },


            ]
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

.entry
{
    background-color:white;
    border-radius:5px;
    padding:5px;
    margin-bottom:5px;
}

#main_content
{
    min-height: 400px;
    /* background-color: yellow; */
}

</style>
