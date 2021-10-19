<template>  
    <v-row>
        <v-col cols="3">
            
            <admin-menu :menu_item_selected="menu_item_selected"></admin-menu>
        </v-col>
        <v-col cols="9">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Vue d'ensemble </v-card-title>

                <v-container>
                    <v-row>
                        <v-col cols="12">
                    <div style="height:300px;">
                    <client-only>
                        <line-chart :width="300" :height="300" :data="chartData" ></line-chart>
                    </client-only>
                    </div>
                        </v-col>
                    </v-row>
                    <v-row> <v-divider> </v-divider> </v-row>

                    <v-row>
                        <v-container class="ma-4">
                            <span class="text-h5 text-center mx-auto d-block"> Journal d'événements </span>
                            
                            <div style="background-color:grey;" class="ma-7 pa-2">
                                <template v-for="(entry,i) in entries" >
                                    <div class="entry"> {{entry.date}} - {{entry.event}} </div>
                                </template>
                            </div>
                        </v-container>
                    </v-row>
                </v-container>
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
            menu_item_selected: 'overview',
            chartData: {
            labels : ["19/08","20/08","21/08","22/08","23/08"],
                datasets: [{
                    label: 'Nombre de connexions journalières',
                    data: [45, 55, 48, 35, 12]
                }]
            },

            entries : [
                {
                    date: "12/08/2021",
                    event: "John est tombé dans les toilettes"
                },
                {
                    date: "15/08/2021",
                    event: "John est ressorti des toilettes"
                },
                {
                    date: "20/08/2021",
                    event: "Les oiseaux volent "
                },
                {
                    date: "30/08/2021",
                    event: "Fin du monde - selon ma grand mère"
                },

            ]
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

</style>