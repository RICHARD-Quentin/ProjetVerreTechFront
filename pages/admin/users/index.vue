<template>
    <v-row>
        <v-col v-if="!this.loading" cols="12">
            <v-card v-if="this.serviceonline" id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Les utilisateurs </v-card-title>
                <v-divider  class="mx-16 my-4"></v-divider>
                <v-row class="mx-10 my-4">
                    <v-col v-if="this.users.length > 0" cols="12">
                        <v-row>
                            <h3 id="userstats_title" class=" ml-10" > Statistiques </h3>
                        </v-row>
                        <v-row class="flex-row">
                            <p class="ma-auto" > <b> Nombre d'utilisateurs:  </b> {{users.length}}</p>
                            <p class="ma-auto" v-if="lastusercreated"> <b> Dernier utilisateur créé : </b>  {{lastusercreated.prenom}} {{lastusercreated.nom}} </p>
                        </v-row>
                    </v-col>

                </v-row>
                <v-divider  class="mx-16 my-4"></v-divider>

                <v-container class=" mt-4 d-flex flex-wrap justify-center" >
                    <UserCard v-for="user in users" :user="user" :key="user.id_client"></UserCard>
                </v-container>
            </v-card>
            <v-card v-else>
                <v-card-title class="text-center mx-auto d-block"> Le service est indisponible </v-card-title>
                <v-card-subtitle class="text-center mx-auto d-block"> Veuillez contacter votre admnistrateur réseau </v-card-subtitle>

                <!-- veritcal flex -->
                <v-container>
                    <v-row>
                        <v-col>
                             <span class="mx-auto font-weight-bold text-center justify-center d-block" style="color:rgb(100,100,150)" > Disponibilité des services </span>
                                <v-card-text align="center" class="d-inline-block pa-0"> Service Utilisateur  <b>{{service_user}}</b> </v-card-text>
                                <v-card-text align="center" class="d-inline-block  pa-0"> Service Catalogue  <b>{{service_catalog}}</b> </v-card-text>
                                <v-card-text align="center" class="d-inline-block pa-0 "> Service de commande  <b>{{service_logistic}}</b> </v-card-text>
                        </v-col>
                    </v-row>
                </v-container>

            </v-card>

        </v-col>
        <v-col v-else cols="12" class="pa-16">
            <v-card elevation=0>
                <v-card-title class="mx-auto font-weight-bold text-center justify-center d-block" > Chargement .. </v-card-title>
                <v-progress-circular
                class="justify-center mx-auto d-block"
                indeterminate
                :size="70"
                color="primary"
                ></v-progress-circular>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'AdminUsers',
    layout: 'adminlayout',
    
    data() {
        return {
            users: [],
            lastusercreated: null,
            serviceonline : false,
            loading: true,

            services_availables: {
                catalog: false,
                users: false,
                logistic: false,
            },
            image: null,

        }
    },

    created() {

        let res = this.getLoggedIn();
        this.$axios.get('/api/user')
            .then(response => {
                this.users = response.data.data;
                this.serviceonline =  true;
                this.loading =false;
                
                this.lastusercreated = this.getLastCreatedUser();
            })
            .catch(error => {
                this.checkServices();
                this.loading = false;
            });
    },

    computed: {

        service_user() {
            if(this.services_availables.users) {
                return 'ONLINE'
            } else {
                return 'OFFLINE'
            }
        },

        service_catalog() {
            if(this.services_availables.catalog) {
                return 'ONLINE'
            } else {
                return 'OFFLINE'
            }
        },

        service_logistic() {
            if(this.services_availables.logistic) {
                return 'ONLINE'
            } else {
                return 'OFFLINE'
            }
        }
    },


    methods: {
        getLoggedIn() {
            return this.$auth.loggedIn
        },

        fetchUsers() {
            this.$http.get('/api/users').then(response => {
                this.users = response.data;
            });
        },

        getLastCreatedUser()
        {
            let userres = null;
            let registereddate= new Date("01/01/0000");   
            for(let i = 0; i <this.users.length ; i++)
            {
                let datecreation = new Date(this.users[i].d_crea_compte);

                if(datecreation > registereddate)
                {
                    registereddate = datecreation;
                    userres = this.users[i];
                }
            }
            return userres;
        },

        async checkServices()
        {
            try
            {
                this.$axios.get('/api/catalog/')
                .then(response => {
                    this.services_availables.catalog = true;
                })

                this.$axios.get('/api/user')
                .then(response => {
                    this.services_availables.users = true;
                })

                this.$axios.get('/api/logistic/order')
                .then(response => {
                    this.services_availables.logistic = true;
                })

            }catch(error)
            {
                console.log("failed");
            }
        }
    },
    

}

</script>

<style scoped>
#userstats_title
{
    font-weight: bold;
    color: rgb(150,150,150);
}
</style>
