<template>
    <v-row>
        <v-col cols="12">
            <v-card id="main_content">
                <v-card-title class="text-center mx-auto d-block"> Création d'article</v-card-title>

                <v-container class="mt-8">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-row>
                                <span class="ml-10  font-weight-bold" style="color:rgb(100,100,150)" > Choisissez une image </span>
                                <v-img class="d-block mx-2" v-if="!this.imagefile" src="/example.png" height="240px" width="240px" contain v-on:click="SelectImage()" ></v-img>
                                <v-img class="d-block mx-2" v-else :src="this.imagefile" height="240px" width="240px" contain v-on:click="SelectImage()" ></v-img>

                                        <v-btn class="ml-auto mr-auto my-2" color="gray"  @click="SelectImage()">
                                                <v-icon left>mdi-pencil</v-icon>
                                                Modifier
                                        </v-btn>
                                <v-row>
                                    <v-col cols="12">
                                        <!-- select color -->
                                        <v-select
                                            v-model="formcolor"
                                            :items="colors"
                                            label="Color"
                                            class="ma-3"
                                        ></v-select>
                                    </v-col>
                                </v-row>

                                <input type="file" id="imageselecter" @change="onFileChange" style="display:none" />
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="8">
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
                            <v-btn class="mx-auto d-block" color="primary" @click="CreateProduct()" > Créer l'article </v-btn>
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
    middleware: 'admin',
    data() {
        return {

            imagefile: null,

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

    created()
    {
        this.formcolor = this.colors[0];
    },

    methods: {
        displayMessage(text)
        {
            console.log(text);
        },

        SelectImage()
        {
            document.getElementById('imageselecter').click();
        },

        onFileChange(e)
        {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },

        createImage(file)
        {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                this.imagefile = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        async CreateProduct() {
          var vm = this;
          // let jsonobject = {
          //     intitule_article: this.formname,
          //     description: this.formdesc,
          //     prix_achat: this.formprix,
          //     commandable: this.formdispo,
          //     dimension_1: this.formdimx,
          //     dimension_2: this.formdimy,
          //     dimension_3: this.formdimz,
          //     couleur: this.formcolor,
          //     image: this.imagefile,
          //     note_moyenne: 0,
          //     commentaires: []
          // };
          let formcommandable = 0;
          if (this.formdispo)
            formcommandable = 1;

          let stringprix = this.formprix.toString();
          let stringdim1 = this.formdimx.toString();
          let stringdim2 = this.formdimy.toString();
          let stringdim3 = this.formdimz.toString();
          let stringnote = "0";

          // imageto base64
          let image64 = this.imagefile.split(',')[1];

          try {
            await this.$axios.post('/api/catalog/article',
              {
                intitule_article: this.formname,
                dimension_1: stringdim1,
                dimension_2: stringdim2,
                dimension_3: stringdim3,
                couleur: this.formcolor,
                prix_achat: stringprix,
                commandable: formcommandable,
                note_moyenne: stringnote,
                description: this.formdesc,
                image: image64
              })
            await this.$dialog.notify.success("Informations enregistrées",
              {
                position: "top-right",
                timeout: 2000
              }
            )
            await this.$router.push('/admin/products')
          } catch (e) {
            await this.$dialog.notify.error(e.message,
              {
                position: "top-right",
                timeout: 2000
              }
            )
          }
          // this.$axios.post('/api/catalog/article',
          //   {
          //     intitule_article: this.formname,
          //     dimension_1: stringdim1,
          //     dimension_2: stringdim2,
          //     dimension_3: stringdim3,
          //     couleur: this.formcolor,
          //     prix_achat: stringprix,
          //     commandable: formcommandable,
          //     note_moyenne: stringnote,
          //     description: this.formdesc,
          //     image: image64
          //   })
          //   .then(function (response) {
          //     vm.displayMessage(response.data);
          //   })
          //   .catch(function (error) {
          //     vm.displayMessage(error);
          //   });
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
