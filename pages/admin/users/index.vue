<template>
    <v-row>
        <v-col cols="12">
            <v-card id="main_content">
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
                <v-row>
                    <div class="ma-2 d-flex flex-wrap">
                        <div style="height:30px;" class="d-inline-block ml-8">
                            
                            
                            <v-checkbox class="d-inline-block pl-1" v-model="checkbox_roles.admin"
                                label="Préparateurs" dense
                                color="orange darken-3"
                            ></v-checkbox>

                            <v-checkbox class="d-inline-block pl-1"   v-model="checkbox_roles.manager"
                                label="Responsable PDV" dense
                                color="orange darken-3"
                            ></v-checkbox>

                            <v-checkbox  class="d-inline-block pl-1" v-model="checkbox_roles.seller"
                                label="Editeur" dense
                                color="orange darken-3"
                            ></v-checkbox>

                            <v-checkbox  class="d-inline-block pl-1" v-model="checkbox_roles.customer"
                                label="Admin" dense
                                color="orange darken-3"
                            ></v-checkbox>

                        </div>
                    </div>
                </v-row>

                <v-container class=" mt-4 d-flex flex-wrap" >
                    <UserCard v-for="user in users" :user="user" :key="user.id_client"></UserCard>
                </v-container>
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
            offline : false,
            image: null,

            checkbox_roles : {
                admin : false,
                manager : true,
                seller : false,
                customer : false,
            },
        }
    },

    created() {

        let res = this.getLoggedIn();
        this.$axios.get('/api/user')
            .then(response => {
                this.users = response.data.data;
                this.offline = false;
                
                this.lastusercreated = this.getLastCreatedUser();
            })
            .catch(error => {
                this.offline = true;
            });
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
