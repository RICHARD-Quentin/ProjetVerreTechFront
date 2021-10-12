<template>
    <v-card>
        
        
        <v-img src="/chair.jpg" class="mx-auto" height="200px" alt=""> 
        <v-card-title>
            <span class="pa-5 headline text-center mx-auto grey--text text--lighten-5 text-h1" >Gestion des magasins</span>
        </v-card-title>
        </v-img>

        <v-toolbar class="ma-4"
            dense
            floating
            >
            <v-text-field v-model="search" label="Recherche"  class="ma-2" @keyup.enter="trouverMagasin"
                hide-details
                prepend-icon="mdi-magnify"
                single-line
            ></v-text-field>
            <v-spacer class="mx-4 text-h5">|</v-spacer>
            <v-btn color="green"> Ajouter un nouveau magasin</v-btn>
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
                            <v-card-subtitle> Un magasin proche de chez vous ? </v-card-subtitle>
                            <v-card-text class="text-center grey--text text--lighten-5 ">{{item.description}}</v-card-text>
                            <v-card-actions>
                                <v-btn color="green" @click="modifierMagasins(item)">Modifier</v-btn>
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
    name: 'admin_shops',
    layout: 'adminlayout',

    data() {
        return {
            search: '',
            items: [
                {
                    name: 'Magasin 1',
                    description: 'Magasin 1',
                    image: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                    id: '1'
                },
                {
                    name: 'Magasin 2',
                    description: 'Magasin 2',
                    image: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                    id: '2'
                },
                {
                    name: 'Magasin 3',
                    description: 'Magasin 3',
                    image: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                    id: '3'
                },
                {
                    name: 'Magasin 4',
                    description: 'Magasin 4',
                    image: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                    id: '4'
                },
            ]
        }
    },

    methods: {
        trouverMagasin() {
            console.log(this.search);
        }
    }
}
</script>
