<template>  
    <v-row>
        <v-col cols="3">
            
            <admin-menu :menu_item_selected="menu_item_selected"></admin-menu>
        </v-col>
        <v-col cols="9">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Gérer les comptes </v-card-title>

                <v-container>
                    <v-row>
                        <v-col cols="2">
                        <div>
                            <p class="pa-1"> Trier par : </p>
                            
                        </div>
                        </v-col>
                        <v-col cols="8">
                            <v-tabs class="d-inline-block" height="35"
                                v-model="current_filter">
                                <v-tab class="mx-1">Magasins</v-tab>
                                <v-tab class="mx-1">Rôles</v-tab>
                                <v-tab class="mx-1">Date création</v-tab>
                            </v-tabs>
                        </v-col>
                    </v-row>
                    <v-row> 
                    <v-divider> </v-divider> 
                    </v-row>

                    <v-tabs-items v-model="current_filter">
                        <v-tab-item> magasins </v-tab-item>
                        <v-tab-item>
                            <v-row>
                                <div class="ma-2 d-flex flex-wrap">
                                    <div style="height:30px;" class="d-inline-block">
                                        
                                        
                                        <v-checkbox class="d-inline-block pl-1" v-model="checkbox_roles.admin"
                                            label="Préparateurs" dense
                                            color="orange darken-3"
                                        ></v-checkbox>

                                        <v-checkbox class="d-inline-block pl-1"   v-model="checkbox_roles.manager"
                                            label="Responsable PDV" dense
                                            color="orange darken-3"
                                        ></v-checkbox>

                                        <v-checkbox  class="d-inline-block pl-1" v-model="checkbox_roles.seller"
                                            label="Editeur" dense
                                            color="orange darken-3"
                                        ></v-checkbox>

                                        <v-checkbox  class="d-inline-block pl-1" v-model="checkbox_roles.customer"
                                            label="Admin" dense
                                            color="orange darken-3"
                                        ></v-checkbox>

                                    </div>
                                </div>
                            </v-row>

                            <v-row>
                                <v-col  cols="12">
                                    <v-container class="mt-4 d-flex flex-wrap" >
                                        <template v-for="user in filtered_users">
                                            <v-card class="usercard" >
                                                <span class="text-body-2 d-block ml-2 mt-4">
                                                    <v-icon>mdi-account</v-icon>
                                                    {{user.name}} </span>
                                                    <div class="d-flex ml-2 mt-1">
                                                        <v-icon v-if="user.roles.admin" small color="green darken-1"> mdi-account</v-icon>
                                                        <v-icon v-else disabled small color="green darken-1"> mdi-account</v-icon>

                                                        <v-icon v-if="user.roles.manager" small color="green darken-1"> mdi-account</v-icon>
                                                        <v-icon v-else disabled small color="green darken-1"> mdi-account</v-icon>

                                                        <v-icon v-if="user.roles.seller" small color="green darken-1"> mdi-account</v-icon>
                                                        <v-icon v-else disabled small color="green darken-1"> mdi-account</v-icon>
                                                        
                                                        <v-icon v-if="user.roles.customer" small color="green darken-1"> mdi-account</v-icon>
                                                        <v-icon v-else disabled small color="green darken-1"> mdi-account</v-icon>
                                                    </div>
                                            </v-card>
                                        </template>
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        
                        <v-tab-item> datecreation </v-tab-item>
                    </v-tabs-items>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'AccountManager',
    layout: 'adminlayout',
    data() {
        return {
            current_filter: null,

            checkbox_roles : {
                admin : false,
                manager : true,
                seller : false,
                customer : false,
            },
            menu_item_selected: 'manage_accounts',

            users: [
                {
                    id: 1,
                    name: 'John Doe',
                    roles: {
                        admin: false,
                        manager: true,
                        seller: true,
                        customer: true,
                    }
                },
                {
                    id: 2,
                    name: 'Jane Doe',
                    roles: {
                        admin: true,
                        manager: false,
                        seller: false,
                        customer: false,
                    }
                },
                {
                    id: 3,
                    name: 'Jean Mathieu',
                    roles: {
                        admin: true,
                        manager: true,
                        seller: false,
                        customer: false,
                    }
                },
                {
                    id:4,
                    name: 'Leonard DaVinci',
                    roles: {
                        admin: true,
                        manager: false,
                        seller: true,
                        customer: true,
                    }
                },
                {
                    id:5,
                    name: 'Leonard DaVinci',
                    roles: {
                        admin: true,
                        manager: false,
                        seller: true,
                        customer: true,
                    }
                },
                {
                    id:6,
                    name: 'Leonard DaVinci',
                    roles: {
                        admin: true,
                        manager: false,
                        seller: true,
                        customer: true,
                    }
                }
            ],

            filtered_users: [],
        }
    },

    watch: {
        checkbox_roles: {
            handler: function(newValue, oldValue) {
                this.filter_users();
            },
            deep: true
        },

    },

    mounted: function() {
        this.filter_users();
    },

    methods: {
        displayMessage(text)
        {
            console.log(text);
        },

        filter_users()
        {
            this.filtered_users = [];

            // no filter activated 
            if(this.checkbox_roles.admin == false
            && this.checkbox_roles.manager == false 
            && this.checkbox_roles.seller == false 
            && this.checkbox_roles.customer == false) this.filtered_users = this.users;
            else{
                this.users.forEach(user => {
                    if(this.checkbox_roles.admin && user.roles.admin)
                    {
                        this.filtered_users.push(user);
                    }
                    else if(this.checkbox_roles.manager && user.roles.manager)
                    {
                        this.filtered_users.push(user);
                    }
                    else if(this.checkbox_roles.seller && user.roles.seller)
                    {
                        this.filtered_users.push(user);
                    }
                    else if(this.checkbox_roles.customer && user.roles.customer)
                    {
                        this.filtered_users.push(user);
                    }
                });
            }
        }
    }
}
</script>


<style scoped>
.usercard
{
    margin:8px;
    width:250px;
    min-height:70px;
    background-color: rgb(240,240,240);
}

#main_content
{
    min-height: 400px;
    /* background-color: yellow; */
}

</style>