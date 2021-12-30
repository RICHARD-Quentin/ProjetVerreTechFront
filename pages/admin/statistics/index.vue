<template>  
    <v-row>
        <v-col cols="12">
            <v-card id="main_content" class="ma-5">
                <v-card-title class="text-center mx-auto d-block" > Statistiques </v-card-title>

                
                <div id="container_ordersumchart" ><canvas class="chart d-none" id="ordersumchart" ></canvas>  </div>


                <v-row>
                    <v-col cols="12" md="6">
                        <div class="mx-1 px-4 py-1" >
                            <h3 class="text-center ma-2" style="color:rgb(100,100,150)" > Globales </h3>
                            
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <canvas id="canvas_accountstotal" class="chart"  ></canvas>
                                        <canvas id="canvas_accounts" class="chart" ></canvas>
                                        <canvas id="canvas_customeraverageage" class="chart" ></canvas>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                        
                    </v-col>

                    <v-col cols="12" md="6">
                        <div class="mx-1 pa-4" >
                            <h3 class="text-center ma-2" style="color:rgb(100,100,150)" > Commandes </h3>
                            
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <canvas id="canvas_orders" class="chart" ></canvas>
                                        <canvas id="canvas_orderssum" class="chart" ></canvas>
                                        <canvas id="canvas_orderaverage" class="chart" ></canvas>

                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <h3 class="text-center ma-2" style="color:rgb(100,100,150)" > Les 10 dernières commandes </h3>
                        <AdminOrderCard v-for="order in lastorders" :order="order" :key="order.id" ></AdminOrderCard>

                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'admin',
    layout: 'adminlayout',
    data() {
        return {
            menu_item_selected: "statistics",
            lastorders: [],
        }
    },
            

    created()
    {
        this.$axios.get('/api/logistic/order')
        .then(response => {
            this.generateStatistics_for_command(response.data.response);
            this.generateStatistics_for_globale();
            this.lastorders = response.data.response;
            this.lastorders.sort(function(a, b){ return new Date(b.date_retrait) - new Date(a.date_retrait);});
            this.lastorders = this.lastorders.slice(0,10);
            
        })
        .catch(error => {
        });
    },

    methods: {

        generateStatistics_for_command(orders)
        {
            try
            {
                this.constructChart_orders(orders);
                this.constructChart_orderssum(orders);
                this.constructChart_orderaverage(orders);

            }catch(e)
            {
                // console.log(e);
            }

        },

        generateStatistics_for_globale()
        {
            try
            {
                this.constructChart_accountstotal();
                this.constructChart_accounts();
                this.constructChart_customeraverageage();
            }catch(e)
            {
                // console.log(e);
            }
        },

        constructChart_orders(orders)
        {
            // Calcul pour les 10 dernières semaines
            let arraydate = [];
            let today = new Date();
            let datarray = [];
            for(let i=0; i<10; i++)
            {
                // Décalé d'une semaine par rapport à aujourd'hui
                let date = new Date(today.getTime() - (i*7*24*60*60*1000));
                arraydate.push(date.getDate()+"/"+(date.getMonth()+1));

                let nborders = 0;
                for(let j=0; j<orders.length; j++)
                {
                    let orderdate = new Date(orders[j].date_commande);
                    if(orderdate >= date && orderdate < new Date(date.getTime() + (7*24*60*60*1000)))
                    {
                        nborders++;
                    }
                }

                datarray.push(nborders);
            }
            let ctx = document.getElementById("canvas_orders").getContext('2d');
            let chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: arraydate.reverse(),
                    datasets: [{
                        label: 'Nombre de commandes hebdomadaires',
                        data: datarray.reverse(),
                        borderColor: 'rgb(100,100,150)',
                    }]
                }
            });
            chart.update();

        },

        constructChart_orderssum(orders)
        {
            // Calcul pour les 10 dernières semaines
            let arraydate = [];
            let today = new Date();
            let datarray = [];
            for(let i=0; i<10; i++)
            {
                // Décalé d'une semaine par rapport à aujourd'hui
                let date = new Date(today.getTime() - (i*7*24*60*60*1000));
                arraydate.push(date.getDate()+"/"+(date.getMonth()+1));

                let montant = 0;
                for(let j=0; j<orders.length; j++)
                {
                    let orderdate = new Date(orders[j].date_commande);
                    if(orderdate >= date && orderdate < new Date(date.getTime() + (7*24*60*60*1000)))
                    {
                        montant += parseInt(orders[j].montant);
                    }
                }
                datarray.push(montant);
            }
            let ctx = document.getElementById("canvas_orderssum").getContext('2d');
            let chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: arraydate.reverse(),
                    datasets: [{
                        label: 'Revenu cumulé des commandes (en euros)',
                        data: datarray.reverse(),
                        borderColor: 'rgb(150,100,100)',
                    }]
                }
            });
            chart.update();
        },

        constructChart_orderaverage(orders)
        {
            // Calcul pour les 10 dernières semaines
            let arraydate = [];
            let today = new Date();
            let datarray = [];
            for(let i=0; i<10; i++)
            {
                // Décalé d'une semaine par rapport à aujourd'hui
                let date = new Date(today.getTime() - (i*7*24*60*60*1000));
                arraydate.push(date.getDate()+"/"+(date.getMonth()+1));

                let montant = 0;
                let nborders = 0;
                for(let j=0; j<orders.length; j++)
                {
                    let orderdate = new Date(orders[j].date_commande);
                    if(orderdate >= date && orderdate < new Date(date.getTime() + (7*24*60*60*1000)))
                    {
                        montant += parseInt(orders[j].montant);
                        nborders++;
                    }
                }

                datarray.push(montant/nborders);
            }
            let ctx = document.getElementById("canvas_orderaverage").getContext('2d');
            let chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: arraydate.reverse(),
                    datasets: [{
                        label: 'Moyenne des montants des commandes (en euros)',
                        data: datarray.reverse(),
                        borderColor: 'rgb(100,150,100)',
                    }]
                }
            });
            chart.update();
        },

        constructChart_accounts()
        {
            this.$axios.get('/api/user')
            .then(response => {
                let arraydate = [];
                let today = new Date();
                let datarray = [];
                for(let i=0; i<10; i++)
                {
                    // Décalé d'une semaine par rapport à aujourd'hui
                    let date = new Date(today.getTime() - (i*7*24*60*60*1000));
                    arraydate.push(date.getDate()+"/"+(date.getMonth()+1));

                    let nbaccounts = 0;
                    for(let j=0; j<response.data.data.length; j++)
                    {
                        let accountdate = new Date(response.data.data[j].d_crea_compte);
                        if(accountdate >= date && accountdate < new Date(date.getTime() + (7*24*60*60*1000)))
                        {
                            nbaccounts++;
                        }
                    }
                    datarray.push(nbaccounts);
                }
                let ctx = document.getElementById("canvas_accounts").getContext('2d');
                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arraydate.reverse(),
                        datasets: [{
                            label: 'Nombre de comptes créés',
                            data: datarray.reverse(),
                            borderColor: 'rgb(100,150,150)',
                            tension: 0
                        }]
                    }
                });
                chart.update();
            })
            .catch(error => {
                // console.log(error);
            });
        },

        constructChart_accountstotal()
        {
            this.$axios.get('/api/user')
            .then(response => {
                let arraydate = [];
                let today = new Date();
                let datarray = [];

                for(let i=0; i<10; i++)
                {
                    // Décalé d'une semaine par rapport à aujourd'hui
                    let date = new Date(today.getTime() - (i*7*24*60*60*1000));
                    arraydate.push(date.getDate()+"/"+(date.getMonth()+1));

                    // Nombre total de comptes depuis le début
                    let nbaccounts = 0;
                    for(let j=0; j<response.data.data.length; j++)
                    {
                        let accountdate = new Date(response.data.data[j].d_crea_compte);
                        if(accountdate >= date)
                        {
                            nbaccounts++;
                        }
                    }
                    datarray.push(nbaccounts);
                }
                let ctx = document.getElementById("canvas_accountstotal").getContext('2d');
                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arraydate.reverse(),
                        datasets: [{
                            label: 'Nombre total de comptes',
                            data: datarray,
                            borderColor: 'rgb(150,150,100)',
                            tension: 0
                        }]
                    }
                });
                chart.update();
            })
            .catch(error => {
                // console.log(error);
            });
        },

        constructChart_customeraverageage()
        {
            this.$axios.get('/api/user')
            .then(response => {
                let arraydate = [];
                let today = new Date();
                let datarray = [];
                for(let i=0; i<10; i++)
                {
                    // Décalé d'une semaine par rapport à aujourd'hui
                    let date = new Date(today.getTime() - (i*7*24*60*60*1000));
                    arraydate.push(date.getDate()+"/"+(date.getMonth()+1));

                    let agesum = 0;
                    let nbaccounts = 0;
                    for(let j=0; j<response.data.data.length; j++)
                    {
                        let accountdate = new Date(response.data.data[j].d_crea_compte);
                        let datenaissance = new Date(response.data.data[j].date_naissance);
                        let age = today.getFullYear() - datenaissance.getFullYear();
                        if(accountdate < new Date(date.getTime() + (7*24*60*60*1000)))
                        {
                            agesum += age;
                            nbaccounts++;
                        }
                    }
                    if(nbaccounts > 0)
                    {
                        datarray.push(agesum/nbaccounts);
                    }
                    else
                    {
                        datarray.push(0);
                    }

                }
                let ctx = document.getElementById("canvas_customeraverageage").getContext('2d');
                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arraydate.reverse(),
                        datasets: [{
                            label: 'Age moyen des utilisateurs',
                            data: datarray,
                            borderColor: 'rgb(150,150,100)',
                        }]
                    }
                });
                chart.update();
            })
            .catch(error => {
                // console.log(error);
            });
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

.chart
{
    width:300px;
    height:300px;
}

</style>