<template>
  <v-row>
      <v-col cols="12">
        <v-text-field label="Adresse" v-model="adresse.adresse"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-autocomplete label="Code postal" v-model="adresse.code_postal"
          :items="codePostalEntries" item-text="codePostal" return-object hide-no-data
          :search-input.sync="codePostalSearch" @input="setValuesFromCodePostal"
        ></v-autocomplete>
      </v-col>
      <v-col cols="4">
        <v-autocomplete label="Ville" v-model="adresse.ville"
          :items="villeEntries" item-text="nom" return-object hide-no-data
          :search-input.sync="villeSearch" @input="setValuesFromVille"
        ></v-autocomplete>
      </v-col>
      <v-col cols="4">
        <v-text-field label="Pays" v-model="adresse.pays"></v-text-field>
      </v-col>

  </v-row>
</template>

<script>
import {isNull} from "lodash";

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
        code_postal: '',
        ville: '',
        pays: ''
      },

      villeSearch: '',
      villeEntries: [],

      updateVille: true,
      updateCodePostal: true,

      codePostalSearch: '',
      codePostalEntries: []
    }
  },

  watch: {
    adressData: {
      handler(val) {
        this.adresse = val
        this.initValues(val.code_postal)
      },
      deep: true,
      immediate: true

    },

    async villeSearch(val) {
      if (!isNull(val) && this.updateVille) {
        const url = "https://geo.api.gouv.fr/communes?nom=" + val + "&fields=nom,codesPostaux&limit=5"
        const result = await this.$axios.$get(url)
        this.villeEntries = result.map(entry => {
          return {
            ...entry,
            codePostal: val
          }
        })
      }
    },

    async codePostalSearch(val) {
      if (!isNull(val) && this.updateCodePostal) {
        const url = "https://geo.api.gouv.fr/communes?codePostal=" + val + "&fields=nom,codesPostaux&limit=5"
        const result = await this.$axios.$get(url)
        this.codePostalEntries = result.map(entry => {
          return {
            ...entry,
            codePostal: val
          }
        })
      }
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

    setValuesFromVille(payload) {
      this.updateCodePostal = false
      this.codePostalEntries = payload.codesPostaux.map(codePostal => {
        return {
          codePostal: codePostal,
          code: payload.code,
          nom: payload.nom
        }
      })
      this.adresse.code_postal = payload.codesPostaux.length === 1
        ? payload.codesPostaux[0]
        : null
      this.adresse.ville = payload.nom
      this.adresse.pays = "France"
      this.updateCodePostal = true

    },

    setValuesFromCodePostal(payload) {
      console.log(payload)
      this.updateVille = false
      this.villeEntries = [payload]
      this.adresse.code_postal = payload.codePostal
      this.adresse.ville = payload.nom
      this.adresse.pays = "France"
      this.updateVille = true
    }
  },
}
</script>

<style scoped>

</style>
