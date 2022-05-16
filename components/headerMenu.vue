<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
    dense
  >
    <v-toolbar-title> Boutique <br v-if="$vuetify.breakpoint.xsOnly"/> Verre-Tech </v-toolbar-title>
      <v-spacer/>

      <v-menu
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            overlap
            color="red"
            class="mr-5"
            :content="getNumberOfArticles"
            :value="getNumberOfArticles"
          >
            <v-btn v-on="on" v-bind="attrs" text icon small class="px-0 ">
              <v-icon> mdi-cart </v-icon>
            </v-btn>
          </v-badge>
        </template>

        <articles-list :showFooter="true"/>

      </v-menu>

      <v-btn @click="login" v-if="!getLoggedIn" text>
        <v-icon> mdi-account</v-icon>
        <span v-if="$vuetify.breakpoint.smAndUp">Connexion</span>
      </v-btn>

      <v-menu offset-y v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="px-0"
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="mr-2"> mdi-account</v-icon>
            {{ $auth.user.nickname }}
            <v-icon> mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item class="px-0">
            <v-btn text nuxt to="/account">
              <v-icon class="mr-2"> mdi-account-circle</v-icon>
              Mon compte
            </v-btn>
          </v-list-item>

          <v-list-item class="px-0">
            <v-btn text  :to="getUrlOrderID">
              <v-icon class="mr-2"> mdi-package-variant-closed</v-icon>
              Mes commandes
            </v-btn>
          </v-list-item>

          <v-list-item class="px-0">
            <v-btn @click="logout" text>
              <v-icon class="mr-2"> mdi-account-cancel</v-icon>
              Deconnexion
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>

    <template v-slot:extension class="px-0">
        <v-slide-group show-arrows>
          <v-slide-item v-for="item in items" :key="item.to">
            <v-btn small plain text nuxt :to="item.to">
              <v-icon v-if="item.icon"> {{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import articlesList from "./articlesList";
export default {
  components: {
    articlesList
  },
  name: "headerMenu",
  props: ['items', 'title'],
  data() {
    return {
      clipped: false,
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('auth0')
    },
    logout() {
      this.$auth.logout()
  }
  },
  computed: {
    ...mapGetters('cart', ['getNumberOfArticles', 'getArticlesList']),
    getLoggedIn() {
      return this.$auth.loggedIn
    },
    getAlignButton() {
      return this.$vuetify.breakpoint.xsOnly ? 'left' : 'right'
    },
    getUrlOrderID(){
      return "/orders/myorders"
    }
  },
}
</script>

<style scoped>
</style>
