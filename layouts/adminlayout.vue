<template>
  <v-app dark>

    <header-menu :items="items" :title="title" :admin="true"></header-menu>

    <v-main id="main">
      <v-container style="min-height: 100vh">
        <nuxt />
      </v-container>
    </v-main>

    <v-footer>
        <v-card-text>
          <v-row align="center" justify="center">
            <span>&copy; {{ new Date().getFullYear() }} - Copyright</span>
          </v-row>
        </v-card-text>
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
          icon: 'mdi-view-list',
          title: 'Admin',
          to: '/admin'
        },
        {
          icon: 'mdi-shopping',
          title: 'Magasins',
          to: '/admin/shops'
        },
        {
          icon: 'mdi-package-variant-closed',
          title: 'Articles',
          to: '/admin/products'
        },
        {
          icon: 'mdi-chart-pie',
          title: 'statistiques',
          to: '/admin/statistics'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Utilisateurs',
          to: '/admin/users'
        },
        // {
        //   icon: 'mdi-settings',
        //   title: 'Paramètres',
        //   to: '/admin/shopsettings'
        // },
        {
          icon: 'mdi-keyboard-return',
          title: 'Retourner à la boutique ',
          to: '/'
        },
      ],

      title: 'Boutique VerreTech'
    }
  },
}
</script>
