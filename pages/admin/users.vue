<template>
    <v-card>
        <v-img src="/chair.jpg" class="mx-auto" height="200px" alt=""> 
        <v-card-title>
            <span class="pa-5 headline text-center mx-auto grey--text text--lighten-5 text-h1" >Gestion des utilisateurs</span>
        </v-card-title>
        </v-img>

        <v-card-text>
            <v-btn color="primary" class="mx-auto" @click="dialogdisplayed = true">Ajouter un utilisateur</v-btn>
        </v-card-text>



        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="users"
            :single-select="false"
            item-key="iduser"
            show-select
            class="elevation-1"
        >
        </v-data-table>

        <v-dialog v-model="dialogdisplayed" max-width="500px">
            <v-card>
                <v-card-title class="headline">Ajouter un utilisateur</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                    v-model="newUser.username"
                                    label="Nom d'utilisateur"
                                    required
                                    color="primary"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                    v-model="newUser.name"
                                    label="Nom"
                                    required
                                    color="primary"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                    v-model="newUser.surname"
                                    label="Prénom"
                                    required
                                    color="primary"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                    v-model="newUser.password"
                                    label="Mot de passe"
                                    required
                                    color="primary"
                                    type="password"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                <v-text-field
                                    v-model="newUser.password_confirmation"
                                    label="Confirmation du mot de passe"
                                    required
                                    color="primary"
                                    type="password"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialogdisplayed = false">Annuler</v-btn>
                    <v-btn color="primary" @click="addUser">Ajouter</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
 
        <template v-if="selected.length > 0">
            
            <v-card-actions>
                <v-btn color="primary" @click="confirmDialogDisplayed = true" >Supprimer</v-btn>
                
            </v-card-actions>
        </template>

        <v-dialog v-model="confirmDialogDisplayed" max-width="400px">
            <v-card>
                <v-card-title class="headline">Supprimer un utilisateur</v-card-title>
                <v-card-text>
                    Voulez-vous vraiment supprimer cet utilisateur ?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" @click="confirmDialogDisplayed = false">Annuler</v-btn>
                    <v-btn color="primary" @click="deleteUser">Supprimer</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-card>
</template>

<script>

export default {
    name: 'admin_users',
    layout: 'adminlayout',

    data () {
      return {
          newUser: {
              username: '',
              name: '',
              surname: '',
              password: '',
              password_confirmation: ''
          },
        dialogdisplayed: false,
        confirmDialogDisplayed: false,
        singleSelect: false,
        selected: [],
        headers: [
          { text: 'Utilisateur', value: 'username' },
          { text: 'ID', value: 'iduser' },
          { text: 'Catégorie', value: 'category' },
          { text: 'Nom', value: 'name' },
          { text: 'Prenom', value: 'surname' },
        ],
        users: [
          {
            username: 'manu',
            iduser: 1,
            category: "Random",
            name: "Emmanuel",
            surname: "Bigeon",
          },
          {
            username: 'PtitJésus',
            iduser: 2,
            category: "Messi",
            name: "Jésus",
            surname: "Christ",
          },
          {
            username: 'Ohpapa',
            iduser: 3,
            category: "Légende",
            name: "René",
            surname: "Malleville",
          },
          {
            username: 'Les gateaux',
            iduser: 4,
            category: "Legende",
            name: "Monplacar",
            surname: "Aivid",
          },
        ],
      }
    },

    methods: {
        addUser() {
            this.users.push(this.newUser);
            this.dialog = false;
        },

        deleteUser() {

            for(let user in this.selected) {
                this.users.splice(this.users.indexOf(this.selected[user]), 1);
            }

            this.selected = [];
            this.confirmDialogDisplayed = false;
        }
    },
    
}
</script>
