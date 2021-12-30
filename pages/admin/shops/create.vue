<template>  
    <v-row>
        <v-col cols="12">
            <v-card id="main_content">
                <span class="ma-3 font-weight-light" @click="ReturnToIndex()">
                        <v-icon @click="ReturnToIndex()" large>mdi-arrow-left</v-icon>
                </span>



                <v-card-title class="text-center mx-auto d-block"> Création de boutique</v-card-title>

                <v-container class="mt-8">
                    <v-row>
                        <v-col cols="12">
                            <v-row> 
                                <v-col cols="12">
                                    <v-row>
                                        <span class="mx-auto font-weight-bold text-center" style="color:rgb(100,100,150)" > Données</span>
                                    </v-row>

                                    <v-row> 
                                        <v-col cols="2"> <p class="text-right font-weight-light justify-center mt-2" style=";color:rgb(130,130,130);"> Nom de la boutique: </p></v-col>
                                        <v-col cols="10"> <v-text-field v-model="form_intitule"  label="Nom de la boutique" outlined  dense  color="primary" required> </v-text-field></v-col>
                                    </v-row>

                                    <v-row> 
                                        <v-col cols="2"> <p class="text-right font-weight-light justify-center mt-2" style=";color:rgb(130,130,130);"> Enseigne: </p></v-col>
                                        <v-col cols="10"> <v-text-field v-model="form_enseigne"  label="Enseigne" outlined  dense  color="primary" required> </v-text-field></v-col>
                                    </v-row>

                                    <v-row> 
                                        <v-col cols="2"> <p class="text-right font-weight-light justify-center mt-2" style=";color:rgb(130,130,130);"> Adresse magasin: </p></v-col>
                                        <v-col cols="10"><v-textarea v-model="form_adressemagasin" label="Adresse" outlined  dense  color="primary" required> </v-textarea> </v-col>
                                    </v-row>

                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn class="mx-auto d-block" color="primary" @click="CreateProduct()" > Ajouter la boutique </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'AccountSettings',
    layout: 'adminlayout',
    data() {
        return {

            imagefile: null,

            form_adressemagasin: '',
            form_enseigne: '',
            form_intitule: ''

        }
    },

    created()
    {
    },

    methods: {
        ReturnToIndex()
        {
            this.$router.push('/admin/shops');
        },
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