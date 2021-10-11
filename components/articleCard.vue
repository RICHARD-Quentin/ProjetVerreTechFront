<template>
    <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item-title class="text-h6 items-center mb-2 container justify-center">
        {{article.name}}
    </v-list-item-title>

    <v-img width="300" height="150" :src="article.img" class="flex items-center mb-2 container justify-center"></v-img>

    <div class="text-h6 items-center mb-2 container justify-center">
        {{article.price}}

        <v-card-actions>
        <v-btn rounded color="yellow" class="flex items-center mb-2 container justify-center">
            AJOUTER
            <v-icon right>
            {{article.items}}
            </v-icon>
        </v-btn>

        <v-btn rounded color="grey" class="flex items-center mb-2 container justify-center">
            VOIR L'ARTICLE
        </v-btn>
        </v-card-actions>
    </div>
    </v-card>
</template>

<script>
export default {
  name: "articleCard",
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
    }
  },
  props: [
      "article"
    ],
}
</script>