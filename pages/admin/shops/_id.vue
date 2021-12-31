<template>
    <v-row>
        <v-col  v-if="this.product" cols="12" >
            <v-row>
                
                <v-card id="main_content" class="text-center mx-auto my-10">
                <span class="ma-3 font-weight-light" @click="ReturnToIndex()">
                        <v-icon @click="ReturnToIndex()" large>mdi-arrow-left</v-icon>
                </span>
                    <v-card-title class="text-center mx-auto d-block"> {{this.product.intitule_article}} </v-card-title>
                    <v-card-subtitle class="text-center mx-auto d-block"> Code : {{product.code_article}}  </v-card-subtitle>
                </v-card>
            </v-row>
            <v-row>
            
                <v-col cols="3">
                        <span class="ml-10  font-weight-bold" style="color:rgb(100,100,150)" > Image de l'article</span>
                        <v-img
                        :src="'data:image/jpeg;base64,' + product.image"
                        aspect-ratio="1"
                        contain
                        class="mx-auto d-block"
                        width="250"
                        height="250"
                    ></v-img>
                </v-col>


                <v-col cols="9">
                    <v-row> 
                        <v-col cols="12">
                            <v-row>
                                <span class="mx-auto font-weight-bold text-center" style="color:rgb(100,100,150)" > Données de l'article</span>
                            </v-row>

                            <v-row> 
                                <v-col cols="4"> <p class="text-right font-weight-light justify-center mt-2" style=";color:rgb(130,130,130);"> Intitulé: </p></v-col>
                                <v-col cols="8"> <v-text-field v-model="formname"  label="Intitule de l'article" outlined  dense  color="primary" required> </v-text-field></v-col>
                            </v-row>

                            <v-row> 
                                <v-col cols="4"> <p class="text-right font-weight-light justify-center mt-2" style=";color:rgb(130,130,130);"> Description: </p></v-col>
                                <v-col cols="8"> <v-textarea v-model="formdesc" label="Description de l'article" outlined  dense  color="primary" required> </v-textarea></v-col>
                            </v-row>

                            <v-row> 
                                <v-col cols="4"> <p class="text-right font-weight-light justify-center mt-2" style=";color:rgb(130,130,130);"> Dimensions (mm): </p></v-col>
                                <v-col cols="8"> 
                                    <v-row>
                                        <v-col cols="4"> <v-text-field type="number" v-model="formdimx" label="Longueur" outlined  dense  color="primary" required> </v-text-field></v-col>
                                        <v-col cols="4"> <v-text-field type="number" v-model="formdimy" label="largeur" outlined  dense  color="primary" required> </v-text-field></v-col>
                                        <v-col cols="4"> <v-text-field type="number" v-model="formdimz" label="hauteur" outlined  dense  color="primary" required> </v-text-field></v-col>
                                    </v-row>
                                </v-col>
                            </v-row>

                            <v-row> 
                                <v-col cols="4"> <p class="text-right font-weight-light justify-center mt-2" style=";color:rgb(130,130,130);"> Prix d'achat: </p></v-col>
                                <v-col cols="8"> <v-text-field v-model="formprix" label="Prix d'achat" type="number" outlined  dense  color="primary" required> </v-text-field></v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4"> <p class="text-right font-weight-light justify-center mt-2" style=";color:rgb(130,130,130);"> Disponible à la commande </p></v-col>
                                <v-col cols="8"> <v-switch v-model="formdispo" label="Disponible à la commande" color="primary" ></v-switch></v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn class="mx-auto d-block" color="primary" @click="ModifyProduct()" > Modifier l'article </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'AdminProducts',
    layout: 'adminlayout',
    
    data() {
        return {
            product: null,
            
            colors: [
                "blue",
                "red",
                "green",
            ],

            formname: '',
            formdesc: '',
            formprix: '',
            formdispo: false,
            formdimx: '',
            formdimy: '',
            formdimz: '',
            formcolor: '',

        }
    },

    created() {
        let id = this.$route.params.id;
        this.$axios.get('/api/catalog/article/'+id)
            .then(response => {
                this.product = response.data.response;
                console.log(this.product);

                this.formname = this.product.intitule_article;
                this.formdesc = this.product.description;
                this.formprix = this.product.prix_achat;
                this.formdispo = this.product.commandable
                this.formdimx = this.product.dimension_1;
                this.formdimy = this.product.dimension_2;
                this.formdimz = this.product.dimension_3;
                this.formcolor = this.product.couleur;


            })
            .catch(error => {
                this.offline = true;
            });
    },

    methods: {

        ModifyProduct()
        {
            console.log("MODIFYPRODUCT TODO");
        }
    },
    

}

</script>
