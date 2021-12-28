<template>  
    <v-row>
        <v-col cols="3">
            
            <admin-menu :menu_item_selected="menu_item_selected"></admin-menu>
        </v-col>
        <v-col cols="9">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Analyse du site </v-card-title>

                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-select
                                :items="sections"
                                item-text="name"
                                item-value="tab"
                                label="Selectionner une vue"
                                outlined
                                dense
                                v-model="current_section"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-tabs-items  v-model="current_section">
                                <v-tab-item>
                                    <client-only>
                                        <line-chart :width="300" :height="300" :data="chartData_connexions" ></line-chart>
                                    </client-only>
                                </v-tab-item>
                                <v-tab-item>
                                    <client-only>
                                        <line-chart :width="300" :height="300" :data="chartData_orders" ></line-chart>
                                    </client-only>
                                </v-tab-item>
                                <v-tab-item>
                                    <client-only>
                                        <line-chart :width="300" :height="300" :data="chartData_visitors" ></line-chart>
                                    </client-only>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'DataAnalysis',
    layout: 'adminlayout',
    data() {
        return {
            menu_item_selected: 'data_analysis',

            sections: [
                {
                    name: 'Analyse des Connexions',
                    tab: 0,
                },
                {
                    name: 'Analyse des Commandes',
                    tab: 1,
                },{
                    name: 'Analyse des Visiteurs',
                    tab: 2,
                }
            ],
            current_section : 0,

            chartData_connexions: {
            labels : ["19/08","20/08","21/08","22/08","23/08"],
                datasets: [{
                    label: 'Nombre de connexions journalières',
                    data: [45, 55, 48, 35, 12]
                }]
            },

            chartData_orders: {
            labels : ["19/08","20/08","21/08","22/08","23/08"],
                datasets: [{
                    label: 'Nombre de connexions journalières',
                    data: [45, 55, 48, 35, 12]
                }]
            },

            chartData_visitors: {
            labels : ["19/08","20/08","21/08","22/08","23/08"],
                datasets: [{
                    label: 'Nombre de connexions journalières',
                    data: [45, 55, 48, 35, 12]
                }]
            },


        }
    },

    methods: {
        displayMessage(text)
        {
            console.log(text);
        }
    }
}
</script>


<style scoped>


#main_content
{
    min-height: 400px;
    /* background-color: yellow; */
}

</style>