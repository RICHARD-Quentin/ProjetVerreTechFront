<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      extended
    >
      <v-img src="LogoVerreTech.jpg" height="9vh" width="0vw" contain class="absolute left" aspect-ratio="1.2" style="margin-left: -150px"></v-img>
      <v-toolbar-title v-text="title" style="margin-left: -150px"/>
      <span v-if="getLoggedIn" v-text="$auth.user.nickname"></span>
      <v-spacer />
      <v-btn class="mr-2"> Pannier
        <v-icon> mdi-cart </v-icon>
      </v-btn>

      <v-btn @click="login" v-if="!getLoggedIn" class="mr-2"> Connexion </v-btn>
      <v-btn v-if="getLoggedIn" class="mr-2"> Mon compte </v-btn>
      <v-btn @click="logout" v-if="getLoggedIn"> Deconnexion </v-btn>

      <template v-slot:extension class="px-0">
        <v-toolbar dense flat short color="#f5f5f5" width="100%">
          <v-toolbar-items v-for="item in items" :key="item.to">
            <v-btn small plain text nuxt :to="item.to">
              <v-icon v-if="item.icon"> {{ item.icon }} </v-icon>
              {{ item.title }}
            </v-btn>

          </v-toolbar-items>
        </v-toolbar>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <v-card flat width="100%" color="#f5f5f5">
        <v-card-text>
          <v-row justify="space-between" align="center" class="px-10">
            <v-col cols="3" v-for="footerItem in footerItems" :key="footerItem.to">
              <v-row>
                <v-col cols="4">
                  <v-img  width="60px" height="60px" :src="footerItem.img"></v-img>
                </v-col>

                <v-col cols="8">
                  <div class="font-weight-bold"> {{ footerItem.title }} </div>
                  <div class="text-caption"> {{ footerItem.subtitle }} </div>
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
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Catalogue',
          to: '/catalog'
        },
        {
          icon: 'mdi-apps',
          title: 'A propos',
          to: '/apropos'
        },
        {
          icon: 'mdi-apps',
          title: 'Points de retraits',
          to: '/retreat'
        },
      ],

      footerItems: [
        {
          img: 'lock.png',
          title: 'Paiement sécurisé',
          subtitle: '/'
        },
        {
          img: 'cartonEmballage.jpg',
          title: 'Catalogue',
          subtitle: '/catalog'
        },
        {
          img: 'chrono.png',
          title: 'Retrait en 2h',
          subtitle: '/apropos'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Boutique VerreTech'
    }
  },

  methods: {
    login() {
      this.$auth.loginWith('auth0')
    },

    logout(){
      this.$auth.logout()
    }
  },

  computed: {
    getLoggedIn(){
      return this.$auth.loggedIn
    }
  }
}
</script>
