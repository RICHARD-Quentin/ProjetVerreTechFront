<template>     
        <v-card class="ordercard">
            <v-row>
                <v-col cols="4">
                    <span v-if="order.date_retrait" class="ml-2 font-weight-bold" style="color:rgb(100,100,150)" > Retirée </span>
                    <span v-else class="ml-2 font-weight-bold" style="color:rgb(150,100,100)" > Non retirée </span>
                    <span class="text-body-2 d-block ml-2 mt-4 hover:bg-red-400">
                    <v-icon> mdi-archive-outline </v-icon>
                    {{this.date}}
                    </span>
                </v-col>
                <v-col cols="4">
                    <v-row class="d-flex flex-column justify-center mt-auto"> 
                        <div> {{this.fullName}} </div>
                    </v-row>
                </v-col>
                <v-col cols="4">
                    <v-row class="d-flex flex-column justify-center ml-2 mt-1" > 
                        <div class="ml-2"> {{this.order.montant}} € </div>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
</template>

<script>

export default {
    name: "AdminOrderCard",

    data: function() {
        return {
            client: null,
            date: null,
        }
    },
    props: {
        order: {
            type: Object,
            required: true
        },
    },

    computed: {
        fullName() {
            if (this.client) {
                return this.client.prenom + ' ' + this.client.nom;

            }
        },
    },

    created()
    {
        this.RetrieveUser(this.order.id_client)
        
        let date = new Date(this.order.date_commande);
        this.date = date.toLocaleDateString();
    },

    methods: 
    {
        RouteTo(url) {
            this.$router.push(url);
        },

        RetrieveUser(id) {
            this.$axios.get('/api/user/' + id)
                .then(response => {
                    this.client = response.data.data;
                    this.$forceUpdate();
                })
                .catch(error => {
                    this.offline = true;
                });
        },

    }
}

</script>


<style scoped>

.ordercard
{
    margin:10px;
    min-height:70px;
    background-color: rgb(240,240,240);
}


</style>