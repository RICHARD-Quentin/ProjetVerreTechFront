<template>
    <v-container>
         <v-container v-if="offlineMode == false">
        <h2 class="d-flex ma-5">Mes commandes</h2>
        <v-tabs  v-model="tab" v-if="getOrders">
            <v-tab v-for="(item,idx) in stateOrder" :key="idx">{{item}}</v-tab>
            <v-tabs-items v-model="tab" >
                <v-tab-item v-for="(state,index) in stateOrder" :key="index" >
                    <OrderCard :order="ordersFiltered"  v-for="(ordersFiltered,orderID) in getFilteredListOrder(index)" :key="orderID"  />
                </v-tab-item>
            </v-tabs-items>

        </v-tabs>
        <v-container v-else>
                Vous n'avez pas encore de commande sur votre compte.
        </v-container>

         </v-container>
    <v-container v-else>
        <v-container>
        <UnvailableServiceCard serviceName="commandes" />
        </v-container>
    </v-container>
    </v-container>
</template>

<script>

export default {
  middleware: 'connected',
  data () {
      return {
        offlineMode:false,
        orders: [
        ],
        tab: null,
        stateOrder: { All: "Toutes mes commandes", TookOf: "Retirée", Preperation:"En préparation",Ready: "Prête à être retirée"  }
        }
    },
    mounted() {

        this.$axios.$get(`/api/logistic/order/client/${this.$auth.user.id_client}`).then(result =>
        {
            if(result.success == true){
                this.orders = result.response

            }
            }).catch(err =>{
                this.offlineMode=true
                console.log(err)
            })
    },

    computed:{
        getOrders()
        {
            return this.orders.length > 0 ? true : false;
        }
    },

    methods: {

        getFilteredListOrder(tab)
        {
            return tab == "All" ? this.orders: this.orders.filter(e => e.statut == tab );
        }
    }
  }
</script>
