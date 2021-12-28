<template>  
    <v-row>
        <v-col cols="3">
            
            <admin-menu :menu_item_selected="menu_item_selected"></admin-menu>
        </v-col>
        <v-col cols="9">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Paramètre du compte </v-card-title>

                <v-container class="mt-8">
                    <v-row>
                        <v-col cols="12">
                            <v-row style="height:45px;"> 
                                <v-col cols="4">
                                    <p class="text-right font-weight-light" style=";color:rgb(130,130,130);"> Identifiant: </p>
                                </v-col>
                                <v-col cols="4">
                                    <p class="text-center  font-weight-medium"  > {{ this.account_data.id}} </p>
                                </v-col>
                                <v-col cols="4">

                                </v-col>
                            </v-row>

                            <v-row style="height:45px;">
                                <v-col cols="4">
                                    <p class="text-right font-weight-light"> Adresse email associé: </p>
                                </v-col>
                                <v-col cols="4">
                                    <p class="text-center font-weight-medium"  > {{ this.account_data.email}} </p>
                                </v-col>
                                <v-col cols="4">
                                    <v-btn color="primary" height="28" @click="modify_email()">
                                            <v-icon left>mdi-pencil</v-icon>
                                            Modifier
                                    </v-btn>
                                </v-col>
                            </v-row>
                            
                            <v-row style="height:45px;">
                                <v-col cols="4">
                                    <p class="text-right font-weight-light"> Mot de passe: </p>
                                </v-col>
                                <v-col cols="4">
                                    <p class="text-center font-weight-medium"  > ************ </p>
                                </v-col>
                                <v-col cols="4">
                                    <v-btn color="primary" height="28" @click="modify_email()">
                                            <v-icon left>mdi-pencil</v-icon>
                                            Modifier
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <v-row style="height:45px;"> 
                                <v-col cols="4">
                                    <p class="text-right font-weight-light" style=";color:rgb(130,130,130);"> Rôle: </p>
                                </v-col>
                                <v-col cols="4">
                                    <p class="text-center  font-weight-medium"  > {{ this.account_data.role}} </p>
                                </v-col>
                                <v-col cols="4">

                                </v-col>
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
    name: 'AccountSettings',
    layout: 'adminlayout',
    data() {
        return {
            menu_item_selected: 'account_settings',

            account_data: {
                id: 'AXZIAEXJA4X574A5',
                username: 'Joseph',
                email: 'monemail@email.fr',
                role: 'Admin'
            }
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