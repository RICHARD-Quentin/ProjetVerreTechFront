<template>  
    <v-row>
        <v-col  cols="12">
            <v-card  id="main_content" class="ma-5">
                <v-card-title class="text-center mx-auto d-block" > Statistiques </v-card-title>
                
                <v-tabs
                    v-model="tab"
                    background-color="primary"
                    dark
                >
                    <v-tab>Tri par unité</v-tab>
                    <v-tab>Tri par période</v-tab>
                </v-tabs>
                
                <v-tabs-items v-model="tab" class="ma-1">
                <v-tab-item>
                    <v-select v-model="stats_CurrentOptionDate" :items="this.stats_ArrayOptionsDate"  label="Unité" class="px-6"></v-select>
                <v-text-field class="px-16" v-on:blur="updateInput()" id="inputdate"
                 type="number" v-model="stats_NumberOfPeriods" label="Nombre de période (2-10)" outlined  dense  color="primary" 
                max="10" min="2"> </v-text-field>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-menu
                                ref="menudeb"
                                v-model="menudeb" :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="datedeb"
                                    type="date"
                                    label="Date de début"
                                    hint="DD/MM/YYYY"
                                    persistent-hint
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="datedeb"
                                    no-title
                                    @input="menudeb = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-menu
                                ref="menufin"
                                v-model="menufin" :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    type="date"
                                    v-model="datefin"
                                    label="Date de fin"
                                    hint="DD/MM/YYYY"
                                    persistent-hint
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="datefin"
                                    no-title
                                    @input="menufin = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>

                        <v-col cols="12">
                            <v-text-field class="px-16" v-on:blur="updateInput()" id="inputdate" type="number" 
                            v-model="stats_NumberOfPeriods" label="Nombre de période (2-10)" outlined  dense  color="primary" 
                max="10" min="2"> </v-text-field>
                        </v-col>
                    </v-row>
                    
                </v-tab-item>
                </v-tabs-items>
                <!-- BUTTON -->
                <v-btn class="mx-auto d-block" color="primary" @click="updateStats()" > Mettre à jour </v-btn>

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
            orders: [],

            tab: 0,
            
            menudeb: false,
            menufin: false,
            datedeb: null,
            datefin: null,

            stats_CurrentOptionDate : "Semaine",
            stats_ArrayOptionsDate : [ "Semaine","Mois", "Jour"],
            stats_NumberOfPeriods : 10,

            serviceonline : false,
            loading: true,

            services_availables: {
                catalog: false,
                users: false,
                logistic: false,
            },

            chart_orders: null,
            chart_orderssum: null, 
            chart_ordersaverage: null,
            chart_accounts: null,
            chart_accountstotal: null,
            chart_customeraverageage: null,

        }
    },

    watch: {
    },

    created()
    {
        this.$axios.get('/api/logistic/order')
        .then(response => {
            this.serviceonline =  true;
            this.generateStatistics_for_globale();
            this.generateStatistics_for_command(response.data.response);
            this.lastorders = response.data.response;
            this.lastorders.sort(function(a, b){ return new Date(b.date_retrait) - new Date(a.date_retrait);});
            this.lastorders = this.lastorders.slice(0,10);
            this.orders = response.data.response;
            
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

        parseDate (date) {
            if (!date) return null;

            const [jour, mois, annee] = date.split('/')
            return `${jour.padStart(2, '0')}-${mois.padStart(2, '0')}-${annee}`
        },

        updateInput() {
            let value = document.getElementById('inputdate').value;
            if(value > 10) {
                document.getElementById('inputdate').value = 10;
                this.stats_NumberOfPeriods = 10;
            } else if(value < 2) {
                document.getElementById('inputdate').value = 2;
                this.stats_NumberOfPeriods = 2;
            }

        },

        

        updateStats() {
            if(this.tab == 0) { // if premier tri
                this.generateStatistics_for_globale();
                this.generateStatistics_for_command(this.orders);
            } else if(this.tab == 1) {
                // if dates
                if((this.datefin && this.datedeb)) {
                    // date format : YYYY-MM-DD

                    let db = new Date(this.datedeb);
                    let df = new Date(this.datefin);
                    if(( db.getTime() < df.getTime()))
                    {
                        this.generateStatistics_for_globale();
                        this.generateStatistics_for_command(this.orders);
                    }else
                    {
                        alert("La date de début doit être antérieure à la date de fin");
                    }
                }else
                {
                    alert("Veuillez choisir une date de début et une date de fin correctes");
                }
            }
        },

        generateStatistics_for_command(orders)
        {
            try
            {
                this.constructChart_orders(orders);
                this.constructChart_orderssum(orders);
                this.constructChart_orderaverage(orders);

            }catch(e)
            {
                console.log(e);
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
        
        calculateDate(date,i)
        {
            let today = new Date();
            if(this.stats_CurrentOptionDate == "Semaine")
            {
                date = new Date(today.getTime() - (i*7*24*60*60*1000));
            }else if(this.stats_CurrentOptionDate == "Mois")
            {
                date = new Date(today.getTime() - (i*30*24*60*60*1000));
            }else if(this.stats_CurrentOptionDate == "Jour")
            {
                date = new Date(today.getTime() - (i*24*60*60*1000));
            }
            return date;
        }, 

        fillChartArrayDate(date,array)
        {
            if(this.stats_CurrentOptionDate == "Semaine")
            {
                array.push(date.getDate()+"/"+(date.getMonth()+1));
            }else if(this.stats_CurrentOptionDate == "Mois")
            {
                array.push(date.getMonth()+1 + "/" + date.getFullYear());
            }else if(this.stats_CurrentOptionDate == "Jour")
            {
                array.push(date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear());
            }
            return array;

        },
        
        // If mode == 1 Give date with hour : ex : 12/12/2019 12:00
        // If mode == 2 Give date with day : ex : 12/12/2019
        calculateDatePeriod(date,mode)
        {
            if(mode == 1)
            {
                return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
            }else if(mode == 2)
            {
                return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
            }
        },

        calculateDates(datedeb,datefin, numberofperiod, arraydate)
        {
            // chess if time between periods is less than 20 hours (ptit décalage pour l'ergonomie)
            let timebetweenperiods = (datefin.getTime() - datedeb.getTime())/(numberofperiod);
            if(timebetweenperiods < 20*60*60*1000) // < 20 heures
            {
                for(let i = 0; i < numberofperiod; i++)
                {
                    let date = new Date(datedeb.getTime() + (i*timebetweenperiods));
                    arraydate.push(this.calculateDatePeriod(date,1));
                }
            }else
            {
                for(let i = 0; i < numberofperiod; i++)
                {
                    let date = new Date(datedeb.getTime() + (i*timebetweenperiods));
                    arraydate.push(this.calculateDatePeriod(date,2));
                }
            }
            return arraydate;
        },


        constructChart_orders(orders)
        {
            let arraydate = []; let datarray = [];

            if(this.tab == 0) // Tri par unité
            {
                for(let i=0; i<this.stats_NumberOfPeriods; i++)
                {
                    let date = null;
                    date = this.calculateDate(date,i);
                    arraydate = this.fillChartArrayDate(date,arraydate);
                    let nborders = 0;
                    for(let j=0; j<orders.length; j++)
                    {
                        let orderdate = new Date(orders[j].date_commande);
                        if(this.stats_CurrentOptionDate == "Semaine")
                        {
                            let borne = new Date(date.getTime() + (7*24*60*60*1000));
                            if(orderdate >= date && orderdate < borne) nborders++;
                        }else if(this.stats_CurrentOptionDate == "Mois")
                        {
                            let borne = new Date(date.getTime() + (30*24*60*60*1000));
                            if(orderdate >= date && orderdate < borne) nborders++;
                        }else if(this.stats_CurrentOptionDate == "Jour")
                        {
                            let borne = new Date(date.getTime() + (24*60*60*1000));
                            if(orderdate >= date && orderdate < borne) nborders++;
                        }
                    }
                    datarray.push(nborders);
                }
                let ctx = document.getElementById("canvas_orders").getContext('2d');
                if(this.chart_orders != null) this.chart_orders.destroy();
                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arraydate.reverse(),
                        datasets: [{ label: 'Nombre de commandes', data: datarray.reverse(), borderColor: 'rgb(100,100,150)', }]
                    }
                });
                chart.update();
                this.chart_orders = chart;
                
            }else // Tri par période
            {
                let datedeb = new Date(this.datedeb);
                let datefin = new Date(this.datefin);
                let numberofperiod = this.stats_NumberOfPeriods;
                // on calculate les dates (remplie arraydate)
                arraydate = this.calculateDates(datedeb,datefin,numberofperiod,arraydate);
                // on calcule le temps entre les dates pour déterminer les bornes
                let timebetweenperiod = (datefin.getTime() - datedeb.getTime())/(numberofperiod);
                for(let i=0; i<numberofperiod; i++)
                {
                    let nborders = 0;
                    let borninf = datedeb.getTime() + (i*timebetweenperiod);
                    let bornesup = new Date(datedeb.getTime() + ((i+1)*timebetweenperiod));

                    for(let j=0; j<orders.length; j++)
                    {
                        let orderdate = new Date(orders[j].date_commande);
                        if(orderdate >= borninf && orderdate < bornesup) nborders++;
                    }


                    datarray.push(nborders);
                }

                let ctx = document.getElementById("canvas_orders").getContext('2d');
                if(this.chart_orders != null) this.chart_orders.destroy();
                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arraydate,
                        datasets: [{ label: 'Nombre de commandes', data: datarray, borderColor: 'rgb(100,100,150)', }]
                    }
                });
                chart.update();
                this.chart_orders = chart;
                }
            
            

        },

        constructChart_orderssum(orders)
        {
            // Calcul pour les 10 dernières semaines
            let arraydate = []; let datarray = [];

            if(this.tab == 0) // Tri par unité
            {
                for(let i=0; i<this.stats_NumberOfPeriods; i++)
                {
                    
                    let date = null;
                    date = this.calculateDate(date,i);
                    arraydate = this.fillChartArrayDate(date,arraydate);

                    let montant = 0;
                    for(let j=0; j<orders.length; j++)
                    {
                        let orderdate = new Date(orders[j].date_commande);
                        if(this.stats_CurrentOptionDate == "Semaine")
                        {
                            let borne = new Date(date.getTime() + (7*24*60*60*1000));
                            if(orderdate >= date && orderdate < borne)
                            {
                                montant += parseInt(orders[j].montant);
                            }
                        }else if(this.stats_CurrentOptionDate == "Mois")
                        {
                            let borne = new Date(date.getTime() + (30*24*60*60*1000));
                            if(orderdate >= date && orderdate < borne)
                            {
                                montant += parseInt(orders[j].montant);
                            }
                        }else if(this.stats_CurrentOptionDate == "Jour")
                        {
                            let borne = new Date(date.getTime() + (24*60*60*1000));
                            if(orderdate >= date && orderdate < borne)
                            {
                                montant += parseInt(orders[j].montant);
                            }
                        }

                    }
                    datarray.push(montant);
                } // fin for
                let ctx = document.getElementById("canvas_orderssum").getContext('2d');
                if(this.chart_orderssum != null) this.chart_orderssum.destroy();

                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arraydate.reverse(),
                        datasets: [{label: 'Revenu cumulé des commandes (en euros)', data: datarray.reverse(),borderColor: 'rgb(150,100,100)'}]
                    }
                });
                chart.update();
                this.chart_orderssum = chart;
            }else
            {
                let datedeb = new Date(this.datedeb);
                let datefin = new Date(this.datefin);
                let numberofperiod = this.stats_NumberOfPeriods;
                // on calculate les dates (remplie arraydate)
                arraydate = this.calculateDates(datedeb,datefin,numberofperiod,arraydate);
                // on calcule le temps entre les dates pour déterminer les bornes
                let timebetweenperiod = (datefin.getTime() - datedeb.getTime())/(numberofperiod);

                for(let i=0; i<numberofperiod; i++)
                {
                    let montant = 0;
                    let borninf = datedeb.getTime() + (i*timebetweenperiod);
                    let bornesup = new Date(datedeb.getTime() + ((i+1)*timebetweenperiod));

                    for(let j=0; j<orders.length; j++)
                    {
                        let orderdate = new Date(orders[j].date_commande);
                        if(orderdate >= borninf && orderdate < bornesup)
                        {
                            montant += parseInt(orders[j].montant);
                        }
                    }

                    datarray.push(montant);
                }

                let ctx = document.getElementById("canvas_orderssum").getContext('2d');
                if(this.chart_orderssum != null) this.chart_orderssum.destroy();

                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arraydate,
                        datasets: [{label: 'Revenu cumulé des commandes (en euros)', data: datarray,borderColor: 'rgb(150,100,100)'}]
                    }
                });
                chart.update();
            }
        },

        constructChart_orderaverage(orders)
        {
            // Calcul pour les 10 dernières semaines
            let arraydate = []; let datarray = [];

            if(this.tab == 0)
            {
                for(let i=0; i<this.stats_NumberOfPeriods; i++)
                {
                    let date = null;
                    date = this.calculateDate(date,i);
                    arraydate = this.fillChartArrayDate(date,arraydate);

                    let montant = 0;
                    let nborders = 0;
                    for(let j=0; j<orders.length; j++)
                    {
                        let orderdate = new Date(orders[j].date_commande);
                        if(this.stats_CurrentOptionDate == "Semaine")
                        {
                            let borne = new Date(date.getTime() + (7*24*60*60*1000));
                            if(orderdate >= date && orderdate < borne)
                            {
                                montant += parseInt(orders[j].montant);
                                nborders++;
                            }
                        }else if(this.stats_CurrentOptionDate == "Mois")
                        {
                            let borne = new Date(date.getTime() + (30*24*60*60*1000));
                            if(orderdate >= date && orderdate < borne)
                            {
                                montant += parseInt(orders[j].montant);
                                nborders++;
                            }
                        }else if(this.stats_CurrentOptionDate == "Jour")
                        {
                            let borne = new Date(date.getTime() + (24*60*60*1000));
                            if(orderdate >= date && orderdate < borne)
                            {
                                montant += parseInt(orders[j].montant);
                                nborders++;
                            }
                        }

                    }

                    datarray.push(montant/nborders);
                }
                let ctx = document.getElementById("canvas_orderaverage").getContext('2d');

                if(this.chart_orderaverage != null)
                {
                    this.chart_orderaverage.destroy();
                }

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

                this.chart_orderaverage = chart;
            }else
            {
                let datedeb = new Date(this.datedeb);
                let datefin = new Date(this.datefin);
                let numberofperiod = this.stats_NumberOfPeriods;
                // on calculate les dates (remplie arraydate)
                arraydate = this.calculateDates(datedeb,datefin,numberofperiod,arraydate);
                // on calcule le temps entre les dates pour déterminer les bornes
                let timebetweenperiod = (datefin.getTime() - datedeb.getTime())/(numberofperiod);

                for(let i=0; i<numberofperiod; i++)
                {
                    let montant = 0;
                    let nborders = 0;
                    let borninf = datedeb.getTime() + (i*timebetweenperiod);
                    let bornesup = new Date(datedeb.getTime() + ((i+1)*timebetweenperiod));

                    for(let j=0; j<orders.length; j++)
                    {
                        let orderdate = new Date(orders[j].date_commande);
                        if(orderdate >= borninf && orderdate < bornesup)
                        {
                            montant += parseInt(orders[j].montant);
                            nborders++;
                        }
                    }

                    datarray.push(montant/nborders);
                }

                let ctx = document.getElementById("canvas_orderaverage").getContext('2d');
                if(this.chart_orderaverage != null) this.chart_orderaverage.destroy();

                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arraydate,
                        datasets: [{
                            label: 'Moyenne des montants des commandes (en euros)',
                            data: datarray,
                            borderColor: 'rgb(100,150,100)',
                        }]
                    }
                });
                chart.update();

                this.chart_orderaverage = chart;
            }
        },

        constructChart_accounts()
        {
            this.$axios.get('/api/user')
            .then(response => {
                let arraydate = []; let datarray = [];

                if(this.tab == 0)
                {
                    for(let i=0; i<this.stats_NumberOfPeriods; i++)
                    {
                        
                        let date = null;
                        date = this.calculateDate(date,i);
                        arraydate = this.fillChartArrayDate(date,arraydate);


                        let nbaccounts = 0;
                        for(let j=0; j<response.data.data.length; j++)
                        {
                            let accountdate = new Date(response.data.data[j].d_crea_compte);
                            if(this.stats_CurrentOptionDate == "Semaine")
                            {
                                let borne = new Date(date.getTime() + (7*24*60*60*1000));
                                if(accountdate >= date && accountdate < borne)
                                {
                                    nbaccounts++;
                                }
                            }else if(this.stats_CurrentOptionDate == "Mois")
                            {
                                let borne = new Date(date.getTime() + (30*24*60*60*1000));
                                if(accountdate >= date && accountdate < borne)
                                {
                                    nbaccounts++;
                                }
                            }else if(this.stats_CurrentOptionDate == "Jour")
                            {
                                let borne = new Date(date.getTime() + (24*60*60*1000));
                                if(accountdate >= date && accountdate < borne)
                                {
                                    nbaccounts++;
                                }
                            }

                        }
                        datarray.push(nbaccounts);
                    }
                    let ctx = document.getElementById("canvas_accounts").getContext('2d');

                    if(this.chart_accounts != null)
                    {
                        this.chart_accounts.destroy();
                    }

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

                    this.chart_accounts = chart;
                }else
                {
                    let datedeb = new Date(this.datedeb);
                    let datefin = new Date(this.datefin);
                    let numberofperiod = this.stats_NumberOfPeriods;
                    // on calculate les dates (remplie arraydate)
                    arraydate = this.calculateDates(datedeb,datefin,numberofperiod,arraydate);
                    // on calcule le temps entre les dates pour déterminer les bornes
                    let timebetweenperiod = (datefin.getTime() - datedeb.getTime())/(numberofperiod);

                    for(let i=0; i<numberofperiod; i++)
                    {
                        let nbaccounts = 0;
                        let borninf = datedeb.getTime() + (i*timebetweenperiod);
                        let bornesup = new Date(datedeb.getTime() + ((i+1)*timebetweenperiod));

                        for(let j=0; j<response.data.data.length; j++)
                        {
                            let accountdate = new Date(response.data.data[j].d_crea_compte);
                            if(accountdate >= borninf && accountdate < bornesup)
                            {
                                nbaccounts++;
                            }
                        }
                        datarray.push(nbaccounts);
                    }

                    let ctx = document.getElementById("canvas_accounts").getContext('2d');

                    if(this.chart_accounts != null)
                    {
                        this.chart_accounts.destroy();
                    }

                    let chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: arraydate,
                            datasets: [{
                                label: 'Nombre de comptes créés',
                                data: datarray,
                                borderColor: 'rgb(100,150,150)',
                                tension: 0
                            }]
                        }
                    });

                    chart.update();
                    this.chart_accounts = chart;
                }
            })
            .catch(error => {
                // console.log(error);
            });
        },

        constructChart_accountstotal()
        {
            this.$axios.get('/api/user')
            .then(response => {
                let arraydate = []; let datarray = [];
                
                if(this.tab == 0)
                {
                    for(let i=0; i<this.stats_NumberOfPeriods; i++)
                    {
                            
                        let date = null;
                        date = this.calculateDate(date,i);
                        arraydate = this.fillChartArrayDate(date,arraydate);


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

                    if(this.chart_accountstotal != null)
                    {
                        this.chart_accountstotal.destroy();
                    }

                    let chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: arraydate.reverse(),
                            datasets: [{
                                label: 'Nombre total de comptes',
                                data: datarray.reverse(),
                                borderColor: 'rgb(150,150,100)',
                                tension: 0
                            }]
                        }
                    });
                    chart.update();
                    
                    this.chart_accountstotal = chart;
                }else
                {
                    let datedeb = new Date(this.datedeb);
                    let datefin = new Date(this.datefin);
                    let numberofperiod = this.stats_NumberOfPeriods;
                    // on calculate les dates (remplie arraydate)
                    arraydate = this.calculateDates(datedeb,datefin,numberofperiod,arraydate);
                    // on calcule le temps entre les dates pour déterminer les bornes
                    let timebetweenperiod = (datefin.getTime() - datedeb.getTime())/(numberofperiod);

                    for(let i=0; i<numberofperiod; i++)
                    {
                        let nbaccounts = 0;
                        let borninf = datedeb.getTime() + (i*timebetweenperiod);

                        for(let j=0; j<response.data.data.length; j++)
                        {
                            let accountdate = new Date(response.data.data[j].d_crea_compte);
                            if(accountdate >= borninf)
                            {
                                nbaccounts++;
                            }
                        }
                        datarray.push(nbaccounts);
                    }
                }

                let ctx = document.getElementById("canvas_accountstotal").getContext('2d');

                if(this.chart_accountstotal != null)
                {
                    this.chart_accountstotal.destroy();
                }

                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arraydate,
                        datasets: [{
                            label: 'Nombre total de comptes',
                            data: datarray.reverse(),
                            borderColor: 'rgb(150,150,100)',
                            tension: 0
                        }]
                    }
                });

                chart.update();

                this.chart_accountstotal = chart;
                
            })
            .catch(error => {
                // console.log(error);
            });
        },

        constructChart_customeraverageage()
        {
            this.$axios.get('/api/user')
            .then(response => {
                let arraydate = []; let datarray = [];
                
                if(this.tab == 0)
                {
                        let today = new Date();  
                    for(let i=0; i<this.stats_NumberOfPeriods; i++)
                    {
                        let date = null;
                        date = this.calculateDate(date,i);
                        arraydate = this.fillChartArrayDate(date,arraydate);

                        let agesum = 0;
                        let nbaccounts = 0;
                        for(let j=0; j<response.data.data.length; j++)
                        {
                            let accountdate = new Date(response.data.data[j].d_crea_compte);
                            let datenaissance = new Date(response.data.data[j].date_naissance);
                            let age = today.getFullYear() - datenaissance.getFullYear();
                            if(this.stats_CurrentOptionDate == "Semaine")
                            {
                                let borne = new Date(date.getTime() + (7*24*60*60*1000));
                                if(accountdate < borne)
                                {
                                    agesum += age;
                                    nbaccounts++;
                                }
                            }else if(this.stats_CurrentOptionDate == "Mois")
                            {
                                let borne = new Date(date.getTime() + (30*24*60*60*1000));
                                if(accountdate < borne)
                                {
                                    agesum += age;
                                    nbaccounts++;
                                }
                            }else if(this.stats_CurrentOptionDate == "Jour")
                            {
                                let borne = new Date(date.getTime() + (24*60*60*1000));
                                if(accountdate < borne)
                                {
                                    agesum += age;
                                    nbaccounts++;
                                }
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

                    // delete current chart 

                    if(this.chart_customeraverageage != null)
                    {
                        this.chart_customeraverageage.destroy();
                    }

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

                    this.chart_customeraverageage = chart;
                }else
                {

                    let datedeb = new Date(this.datedeb);
                    let datefin = new Date(this.datefin);
                    let numberofperiod = this.stats_NumberOfPeriods;
                    // on calculate les dates (remplie arraydate)
                    arraydate = this.calculateDates(datedeb,datefin,numberofperiod,arraydate);
                    // on calcule le temps entre les dates pour déterminer les bornes
                    let timebetweenperiod = (datefin.getTime() - datedeb.getTime())/(numberofperiod);

                    for(let i=0; i<numberofperiod; i++)
                    {
                        let agesum = 0;
                        let nbaccounts = 0;
                        let bornsup = datedeb.getTime() + (i*timebetweenperiod);

                        for(let j=0; j<response.data.data.length; j++)
                        {
                            let accountdate = new Date(response.data.data[j].d_crea_compte);
                            let datenaissance = new Date(response.data.data[j].date_naissance);
                            let today = new Date();  
                            let age = today.getFullYear() - datenaissance.getFullYear();
                            if(accountdate < bornsup)
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

                    if(this.chart_customeraverageage != null)
                    {
                        this.chart_customeraverageage.destroy();
                    }

                    let chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: arraydate,
                            datasets: [{
                                label: 'Age moyen des utilisateurs',
                                data: datarray,
                                borderColor: 'rgb(150,150,100)',
                            }]
                        }
                    });

                    chart.update();
                    this.chart_customeraverageage = chart;
                }

            })
            .catch(error => {
                console.log(error);
            });
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