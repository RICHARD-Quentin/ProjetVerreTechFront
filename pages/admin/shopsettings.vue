<template>  
    <v-row>
        <v-col cols="12" md="3">
            
            <settings-menu :menu_item_selected="menu_item_selected"></settings-menu>
        </v-col>
        <v-col cols="12" md="9">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block mb-10"> Paramètres de la boutique </v-card-title>
                
                <v-container>

                    <v-row>
                        <v-col cols="12" md="4"> 
                            <p class="text-center mb-0"> Mode de maintenance </p>
                        </v-col>
                        <v-col cols="12" md="4">
                            <input class="d-block mx-auto justify-center align-center " v-if="this.maintenance_mode" type="checkbox" checked />
                            <input class="d-block mx-auto justify-center align-center " v-else type="checkbox"  />
                        </v-col>
                    </v-row>


                    <v-row>
                        <v-col cols="12" md="4">
                            <p class="text-center"> Paramètres de connexion Paypal : </p>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                dense
                                label="Nom d'utilisateur"
                                placeholder="Nom d'utilisateur"
                                solo
                                type='text'
                            ></v-text-field>
                            <v-text-field
                                dense
                                label="Mot de passe"
                                placeholder="Mot de passe"
                                solo
                                type='password'
                            ></v-text-field>
                        </v-col>
                    </v-row>


                    <v-row>
                        <v-col cols="12" md="4">
                            <p class="text-center"> Paramètres de connexion Stripe : </p>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                dense
                                label="Nom d'utilisateur"
                                placeholder="Nom d'utilisateur"
                                solo
                                type='text'
                            ></v-text-field>
                            <v-text-field
                                dense
                                label="Mot de passe"
                                placeholder="Mot de passe"
                                solo
                                type='password'
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="4" justify="center"> 
                            <v-row align="baseline" justify="center" style="height: 100%;align-content: end;}">
                                <p > Images par défaut des articles :  </p>

                            </v-row>    
                                
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-file-input
                                counter
                                show-size
                                truncate-length="15"
                            ></v-file-input>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-row align="baseline" justify="center" style="height: 100%;align-content: end;}">
                                <v-btn color="blue lighten-2 mt-6"> Modifier l'image</v-btn>

                            </v-row>   
                        </v-col>

                        

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
            menu_item_selected: 'shop_settings',

            maintenance_mode: true,
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
    padding:20px;
    /* background-color: yellow; */
}

</style>