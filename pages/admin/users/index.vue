<template>
    <v-row>
<<<<<<< HEAD
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

                <v-container class=" mt-4 d-flex flex-wrap" >
                <UserCard v-for="user in users" :user="user" :key="user.id_client"></UserCard>
                </v-container>
            </v-card>
        </v-col>
=======
>>>>>>> 9ac48612f500a137227c4aa2249e7f1f4a8805e9
    </v-row>
</template>

<script>

export default {
    name: 'AdminUsers',
    layout: 'adminlayout',
    
    data() {
        return {
            users: [],
<<<<<<< HEAD
            lastusercreated: null,
            offline : false,
            image: null,
=======
            offline : false,
>>>>>>> 9ac48612f500a137227c4aa2249e7f1f4a8805e9
        }
    },

    created() {

        let res = this.getLoggedIn();
<<<<<<< HEAD
        this.$axios.get('/api/user')
            .then(response => {
                this.users = response.data.data;
                this.offline = false;
                
                this.lastusercreated = this.getLastCreatedUser();
            })
            .catch(error => {
=======
        console.log("l'utilisateur est connecté ?", res);
        // check if api is online with Auth token this.$auth
        this.$axios.get('http://localhost:3003')
            .then(response => {
                console.log("API is online");
                this.offline = false;
            })
            .catch(error => {
                console.log("API is offline");
>>>>>>> 9ac48612f500a137227c4aa2249e7f1f4a8805e9
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

<<<<<<< HEAD
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
    
=======
        deleteUser(user) {
            this.$http.delete('/api/users/' + user.id).then(response => {
                this.fetchUsers();
            });
        }
    }
>>>>>>> 9ac48612f500a137227c4aa2249e7f1f4a8805e9

}

</script>
<<<<<<< HEAD

<style scoped>
#userstats_title
{
    font-weight: bold;
    color: rgb(150,150,150);
}
</style>
=======
>>>>>>> 9ac48612f500a137227c4aa2249e7f1f4a8805e9
