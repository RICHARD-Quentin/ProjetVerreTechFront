<template>
  <v-footer
    :absolute="!fixed"
    app
  >
    <v-card flat width="100%" color="#f5f5f5">

      <v-card-text>
        <v-row justify="space-between" align="center" class="px-10">
          <v-col cols="3" v-for="item in items" :key="item.to">
            <v-row>
              <v-col cols="4">
                <v-img  width="60px" height="60px" :src="item.img"></v-img>
              </v-col>

              <v-col cols="8">
                <div class="font-weight-bold"> {{ item.title }} </div>
                <div class="text-caption"> {{ item.subtitle }} </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        <v-row align="center" justify="center">
          <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-row>
      </v-card-text>

    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "MainFooter",
  props: ['items'],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
    }
  }
}
</script>

<style scoped>

</style>
