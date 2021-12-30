<template>
    <v-row class="mt-2 ml-2">
        <v-col cols="6">
            <v-img width="800" height="400" :src="img"></v-img>
        </v-col>

        <v-col cols="6" class="text-h4">
            <div>
                {{name}}
            </div>

            <div class="mt-4">
                {{price}}€
            </div>

            <div class="mt-6 mb-16 text-subtitle-2 text-justify">
                {{description}}
            </div>

            <v-select v-model="select" :items="quantite" label="Quantité" x-large></v-select>

            <v-btn color="yellow" x-large @click="increment">
                Ajouter au panier
            </v-btn>
        </v-col>

        <v-divider inset class="mt-6"></v-divider>

        <v-col cols="12" class="mt-6 text-body-1 text-justify">
            {{detail}}
        </v-col>
    </v-row>
</template>

<script>
export default {
    data(){
        return {
            id: '',
            name: 'Insert à granulé MTUI 700',
            price: 40,
            item: 'mdi-card',
            img:'../article1.jpg',
            description: 'Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet.',
            detail:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus.',
            quantite:[ 1,
                2,
                3,
                4,
                5
            ]
        }
    },

    mounted() {
        this.id = this.$route.params.id
    },

    methods: {
    increment() {
      this.$store.dispatch('basket/addArticle', {article: this.article});
    },
  },
}
</script>