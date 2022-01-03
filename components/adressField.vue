<template>
  <v-row>
      <v-col cols="12">
        <v-text-field label="Adresse" v-model="adresse.adresse" @change="$emit('input', adresse)"></v-text-field>
      </v-col>
      <v-col >
        <v-autocomplete label="Ville - Code postal"
          :items="villeEntries" item-text="label" item-value="id_ville" v-model="adresse.id_ville"
          :search-input.sync="villeSearch"
          @input="setValues"
          clearable
          :loading="loading"
        >
        </v-autocomplete>
      </v-col>
      <v-col  >
        <v-select label="Pays" v-model="adresse.id_pays"
        :items="paysEntries" item-text="pays" item-value="id_pays"
        disabled></v-select>
      </v-col>
  </v-row>
</template>

<script>
import {isEmpty, isNull} from "lodash";

export default {
  name: "adressField",
  props: {
    adressData: {
      type: Object,
    }
  },
  data() {
    return {
      adresse: {
        adresse:'',
        id_ville: '',
        id_pays: '',
        is_facturation: false
      },
      loading: false,
      fetching: false,
      villeSearch: '',
      villeEntries: [],
      paysEntries: []
    }
  },

  watch: {
    adressData: {
      async handler(val) {
        if (!isEmpty(val)){
          this.fetching = true
          this.adresse = val
          const ville = (await this.$axios.$get('/api/user/villes/' + val.id_ville)).data
          this.villeEntries = [{
            ...ville,
            label: ville.ville + ' - ' + ville.code_postal
          }]
        }
      },
      deep: true,
      immediate: true
    },

    async villeSearch(val) {
      if (!isNull(val) && !this.fetching) {
        this.loading = true
        try {
          const result = await this.$axios.$get('/api/user/villes', {params: {search: val}})
          if (result.data.length > 0) {
            this.villeEntries = result.data.map(entry => {
              return {
                id_ville: entry.id_ville,
                id_pays: entry.id_pays,
                label: entry.ville + ' - ' + entry.code_postal
              }
            })
          }
        } catch (e) {
          console.error(e)
        }
        this.loading = false
      }
      this.fetching = false
    },
  },

  computed: {

  },

  methods: {
    async initValues(codePostal) {
      const url = "https://geo.api.gouv.fr/communes?codePostal=" + codePostal + "&fields=nom,codesPostaux&limit=5"
      const result = await this.$axios.$get(url)
      this.villeEntries = result.data
    },

    async fetchVilles(val) {
        this.villeSearch = val
    },

    async setValues(payload){
      if (!isNull(payload)) {
        // this.adresse.id_ville = payload
        const ville = (await this.$axios.$get('/api/user/villes/' + payload)).data
        this.adresse.id_pays = ville.id_pays
      } else {
        this.adresse.id_pays = null
        // this.adresse.id_ville = null
      }
      this.$emit('input', this.adresse)
    },
  },

  async mounted() {
    const result = await this.$axios.$get('/api/user/pays')
    this.paysEntries = result.data
  }
}
</script>

<style scoped>

</style>
