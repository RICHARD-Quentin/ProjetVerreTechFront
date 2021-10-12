<template>
    <v-card>
        
        
        <v-img src="/chair.jpg" class="mx-auto" height="200px" alt=""> 
        <v-card-title>
            <span class="pa-5 headline text-center mx-auto grey--text text--lighten-5 text-h1" >Gestion des articles</span>
        </v-card-title>
        </v-img>

        <v-toolbar class="ma-4"
            dense
            floating
            >
            <v-text-field v-model="search" label="Recherche"  class="ma-2" @keyup.enter="trouverProduit"
                hide-details
                prepend-icon="mdi-magnify"
                single-line
            ></v-text-field>

            <v-spacer class="mx-4 text-h5">|</v-spacer>

            <v-btn color="green"> Ajouter un nouvel article</v-btn>


            </v-toolbar>

            <div class="ma-8">
                <template v-if="items.length > 0">
                    <v-card v-for="item in items" :key="item.id" color="grey" class="ma-4" >
                        <v-row> 
                            <v-col cols="12" sm="4" md="4" color="white">
                                <v-img :src="item.image" height="200px"  width="200px" class="mx-auto rounded-lg" alt="">
                                </v-img>
                            </v-col>
                            <v-col cols="12" sm="8" md="8">
                                <v-card-title class="text-center  grey--text text--lighten-5 " >{{item.name}} </v-card-title>
                                <v-card-subtitle> {{item.price}} </v-card-subtitle>
                                <v-card-text class="text-center grey--text text--lighten-5 ">{{item.description}}</v-card-text>
                                <v-card-actions>
                                    <v-btn color="green" @click="modifierArticle(item)">Modifier</v-btn>

                                    <v-btn v-if="item.active" color="red" @click="desactiverArticle(item)">Désactiver</v-btn>
                                    <v-btn v-else color="green" @click="activerArticle(item)">Activer</v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-card>
                </template>
                <template v-else>
                    <v-card-text> Aucun article trouvé</v-card-text>
                </template>
            </div>
    </v-card>
</template>

<script>

export default {
    name: 'admin_products',
    layout: 'adminlayout',

    data() {
        return {
            search: '',
            items: [
                {
                    name: 'Chair',
                    price: '$100',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.',
                    image: '/chair.jpg',
                    id: 1,
                    active : true,
                },
                {
                    name: 'ss',
                    price: '$100',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.',
                    image: '/chair.jpg',
                    id: 2,
                    active : true,
                },
                {
                    name: 'aaaa',
                    price: '$100',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.',
                    image: '/chair.jpg',
                    id: 3,
                    active : true,
                },
                {
                    name: 'azvea',
                    price: '$100',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.',
                    image: '/chair.jpg',
                    id: 4,
                    active : false,
                },
            ]
        }
    },

    methods: {
        trouverProduit() {
            console.log(this.search);
        },
        modifierArticle(item) {
            // TODO
        },

        activerArticle(item) {
            item.active = true;
        },

        desactiverArticle(item) {
            item.active = false;
        }

    }
}
</script>
