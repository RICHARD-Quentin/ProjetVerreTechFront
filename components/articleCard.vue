<template>
  <v-card max-width="344" outlined elevation="4">
    <nuxt-link :to="'/catalog/' + article.code_article">
      <v-img height="150" :src="getUrlImage(article.image)"></v-img>
    </nuxt-link>

    <v-row class="mt-2 mb-1">
      <v-col class="ml-2">
        <div class="text-h7 font-weight-bold">
          {{article.intitule_article}}
        </div>

        <div class="ml-4 text-h7">
          {{article.prix_achat}}€
        </div>
      </v-col>

      <v-col cols="3" class="mt-1 mr-2">
        <v-btn color="yellow" :to="'/catalog/' + article.code_article">
          <v-icon>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
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
  methods: {
    linkToArticle(id)
    {
      console.log("test")
      return '/catalog/' + id
    },
    getUrlImage(base64)
    {
      return base64 != undefined ? "data:image/jpeg;base64,"+base64 : "/image_not_found.png"
    }
  },
}
</script>