<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Modifier vous informations</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="success" :disabled="!valid" @click="save"> mdi-content-save </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="error" @click="confirmLeave"> mdi-arrow-left </v-icon>
        </v-btn>
    </v-toolbar>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="Nom" prepend-icon="mdi-account-details"  v-model="data.client.nom"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Prenom" prepend-icon="mdi-account-details"  v-model="data.client.prenom"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-menu
              ref="datePicker"
              v-model="datePicker"
              :close-on-content-click="false"
              persistant
              :return-value.sync="data.client.date_naissance"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="data.client.date_naissance"
                  label="Date de naissance" type="date" min="1970-01-01" max="2999-01-01"
                  v-bind="attrs" v-on="$listeners"
                  class="unstyled"
                  prepend-icon="mdi-calendar" @click:prepend="datePicker = true"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="fr"
                min="1970-01-01"
                max="2999-01-01"
                v-model="data.client.date_naissance"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="datePicker = false"
                >
                  Fermer
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.datePicker.save(data.client.date_naissance)"
                >
                  Valider
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Telephone fixe" prepend-icon="mdi-phone"  v-model="data.client.telephone_f"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Telephone portable" prepend-icon="mdi-cellphone"  v-model="data.client.telephone_p"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field label="Email" prepend-icon="mdi-mail" v-model="data.client.mail"></v-text-field>
          </v-col>
        </v-row>

        <v-toolbar class="mb-5">
          <v-toolbar-title>Adresses</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text @click="addAdress">Ajouter une adresse</v-btn>
        </v-toolbar>
        <v-row v-for="(adresse, index) in data.adresses" :key="index" class="px-4">
<!--          <v-row>-->
<!--            <v-col cols="12">-->
<!--              <v-text-field label="Adresse" v-model="data.adresses[index].adresse"></v-text-field>-->
<!--            </v-col>-->
<!--            <v-col cols="12" md="4">-->
<!--              <v-text-field label="Ville" v-model="data.adresses[index].ville"></v-text-field>-->
<!--            </v-col>-->
<!--            <v-col cols="12" md="4">-->
<!--              <v-text-field label="Code postal" v-model="data.adresses[index].code_postal"></v-text-field>-->
<!--            </v-col>-->
<!--            <v-col cols="12" md="4">-->
<!--              <v-text-field label="Pays" v-model="data.adresses[index].pays"></v-text-field>-->
<!--            </v-col>-->
<!--            <hr>-->
<!--          </v-row>-->
          <adress-field :adressData="adresse" v-model="data.adresses[index]"></adress-field>
          <v-btn icon @click="delAddresse(index)" class="my-auto" v-show="index !== 0">
            <v-icon> mdi-minus </v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import {isEmpty} from "lodash"
import AdressField from "../components/adressField";

export default {
  name: "account",
  components: {AdressField},
  middleware: 'connected',
  data() {
    return {
      valid: true,
      datePicker: false,
      data: {
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
        adresses: [
          { adresse:'', id_ville: '', id_pays: '' }
        ],
        deletedAdresses: []
      },
      villes: [],
      CP: [],
      dateValue: null
    }
  },
  methods: {
    async save(){
      try {
        await this.$axios.$post('/api/user', this.data)
        await this.$dialog.notify.success("Informations enregistrées",
          {
            position: "top-right",
            timeout: 2000
          }
        )
        await this.$router.push('/')
      } catch (e) {
        await this.$dialog.notify.error(e.message,
          {
            position: "top-right",
            timeout: 2000
          }
        )
      }
    },

    async confirmLeave(){
      const confirm = await this.$dialog.confirm({
        text: 'Tout les changements non sauvegardés serront perdus.',
        title: 'Voulez vous vraiment quitter cette page ?',
        actions: {
          true: {text: 'Confirmer', color: 'success'},
          false: {text: 'Annuler', color: 'error'},
        }
      })
      if (confirm) {
        this.$router.go(-1)
      }
    },

    addAdress() {
      this.data.adresses.push({})
    },

    delAddresse(index){
      const deletedAdress = this.data.adresses[index]
      if (deletedAdress.hasOwnProperty('id_adresse')) this.data.deletedAdresses.push(this.data.adresses[index])
      this.data.adresses.splice(index, 1)
    }
  },

  computed: {
    allowAddAdress() {
      const lastAdress = this.data.adresses[this.data.adresses.length - 1]
      return Object.values(lastAdress).every(value => !isEmpty(value))
    }

    // getVilles() {
    //   const url = 'https://geo.api.gouv.fr/communes?nom=' + this.data.adresses. + '&fields=departement&limit=5'
    //   const result = this.$axios.$get(url)
    // }
  },

  watch: {
    dateValue: {
      handler(date) {
        this.data.client.date_naissance = date
      },
      immediate: true
    }
  },

  async fetch() {
    try {
      const res = await this.$axios.$get('/api/user/auth/' + this.$auth.user.sub)
      if (res.data !== null) {
        this.data.client = res.client
        if (res.adresses.length > 0) {
          this.data.adresses = res.adresses
        }
      }
    } catch (e) {
      this.$nuxt.error({statusCode: e.message.substr(e.message.length-3, 3),message: e.message})
    }

  }
}
</script>

<style>
.unstyled input::-webkit-inner-spin-button,
.unstyled input::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
</style>
