<template>
    <v-row>
    </v-row>
</template>

<script>

export default {
    name: 'AdminUsers',
    layout: 'adminlayout',
    
    data() {
        return {
            users: [],
            offline : false,
        }
    },

    created() {

        let res = this.getLoggedIn();
        console.log("l'utilisateur est connecté ?", res);
        // check if api is online with Auth token this.$auth
        this.$axios.get('http://localhost:3003')
            .then(response => {
                console.log("API is online");
                this.offline = false;
            })
            .catch(error => {
                console.log("API is offline");
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

        deleteUser(user) {
            this.$http.delete('/api/users/' + user.id).then(response => {
                this.fetchUsers();
            });
        }
    }

}

</script>
