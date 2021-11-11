<template>
    <v-container>
        <h2 class="d-flex ma-5">Mes commandes</h2>
        <v-tabs  v-model="tab" v-if="getOrders">
            <v-tab v-for="item in stateOrder" :key="item">{{item}}</v-tab>          
            <v-tabs-items v-model="tab">
                <v-tab-item v-for="(state,index) in stateOrder" :key="state">  
                    <OrderCard :order="ordersFiltered"  v-for="ordersFiltered in getFilteredListOrder(index)"/>
                </v-tab-item>                          
            </v-tabs-items>
            
        </v-tabs>
        <v-container v-else>
                Vous n'avez pas encore de commande sur votre compte.
            </v-container>
    </v-container>
</template>

<script>

export default {
    data () {
      return {
        orders: [
                      
        ],
        tab: null,
        stateOrder: { All: "Toutes mes commandes", TookOf: "Retirée", Preperation:"En préparation",Ready: "Prête à être retirée"  }
        }
    },
    mounted() {
        
        this.$axios.$get('http://localhost:3001/order/client/1').then(result => {console.log(result);this.orders = result})
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
        },  
        async validatePayment()
        {
            this.$axios.$get('http://localhost:3001/order/client/1',
            { 

            })
          
        }  
    }
  }
</script>