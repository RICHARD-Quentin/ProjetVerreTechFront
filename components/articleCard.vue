<template>
  <v-card max-width="344" outlined>
    <nuxt-link :to="'/catalog/' + article.id">
      <v-img height="150" :src="article.img"></v-img>
    </nuxt-link>

    <v-row class="mt-2 mb-1">
      <v-col class="ml-2">
        <div class="text-h7 font-weight-bold">
          {{article.name}}
        </div>

        <div class="ml-4 text-h7">
          {{article.price}}€
        </div>
      </v-col>

      <v-col cols="3" class="mt-1 mr-2">
        <v-btn color="yellow" @click="increment">
          <v-icon>
            mdi-cart
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
    increment() {
      this.$emit('increment');
    },
  },
}
</script>