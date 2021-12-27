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
        this.$axios.get('http://localhost:3003/user')
            .then(response => {
                console.log("oui");
                this.offline = false;
            })
            .catch(error => {
                console.log("non");
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
