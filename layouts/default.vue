<template>
  <v-app dark>

    <header-menu :items="items" :title="title"></header-menu>

    <v-main id="main">
      <v-container style="min-height: 100vh">
        <nuxt />
      </v-container>
    </v-main>

    <v-footer>
      <v-card flat width="100%" color="#f5f5f5" class="mt-3">
        <v-card-text>
          <v-row justify="space-between" align="center" class="px-10">
            <v-col cols="12" sm="4" v-for="footerItem in footerItems" :key="footerItem.to">
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
            <span>&copy; {{ new Date().getFullYear() }} - Copyright</span>
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
          icon: 'mdi-home',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Catalogue',
          to: '/catalog'
        },
        {
          icon: 'mdi-map-marker',
          title: 'Points de retraits',
          to: '/shops'
        },
        {
          icon: 'mdi-fountain-pen-tip',
          title: 'A propos',
          to: '/about'
        },
      ],
      footerItems: [
        {
          img: '/lock.png',
          title: 'Paiement sécurisé',
          subtitle: 'Tout vos paiements sur le site sont sécurisés'
        },
        {
          img: '/cartonEmballage.jpg',
          title: 'Catalogue',
          subtitle: 'Le catalogue complet des produits disponibles dans votre magasin'
        },
        {
          img: '/chrono.png',
          title: 'Retrait en 2h',
          subtitle: 'Retrait dans le points de retrait de votre choix dans les 2 heures'
        },
      ],
      title: 'Boutique VerreTech'
    }
  },

  async mounted() {
    if (this.$auth.loggedIn) {
      const authId = this.$auth.user.sub
      try {
        const user = await this.$axios.$get('/api/user/auth/' + authId)
        this.$auth.setUser({
          ...this.$auth.user,
          id_client: user.client.id_client
        })
      } catch (e) {
        const data = {
            client: {
              id_client: null,
              nom: this.$auth.user.family_name || '',
              prenom: this.$auth.user.given_name || '',
              date_naissance: "",
              telephone_f: "",
              telephone_p: "",
              mail: this.$auth.user.email,
              authId: this.$auth.user.sub
            },
            adresses: [],
            deletedAdresses: []
          }
        try {
          const newUser = await this.$axios.$post('/api/user', data)
          const user = await this.$axios.$get('/api/user/auth/' + authId)
          this.$auth.setUser({
            ...this.$auth.user,
            id_client: user.client.id_client
          })
        } catch (e) {
          console.error(e)
        }
      }
    }

    if(typeof this.$cookies.get('sessionId') === 'undefined') {
      const sessionId = [...crypto.getRandomValues(new Uint8Array(20))].map(m=>('0'+m.toString(16)).slice(-2)).join('')
      this.$cookies.set('sessionId', sessionId)
    }
    try {
      await this.$store.dispatch('cart/initArticles')
      await this.$store.dispatch('cart/initShop')
    } catch (e) {
      console.error('Service de cache indisponible')
    }


  }
}
</script>
