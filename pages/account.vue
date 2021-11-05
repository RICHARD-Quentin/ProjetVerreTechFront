<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Modifier vous informations</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="success" :disabled="!valid" @click="save"> mdi-content-save </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="error"> mdi-arrow-left </v-icon>
        </v-btn>
    </v-toolbar>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-text-field label="Nom" prepend-icon="mdi-account-details"  v-model="data.client.nom"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Prenom" prepend-icon="mdi-account-details"  v-model="data.client.prenom"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-menu
              ref="datePicker"
              v-model="datePicker"
              :close-on-content-click="false"
              :return-value.sync="data.client.date_naissance"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="data.client.date_naissance"
                  label="Date de naissance"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
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
          <v-col cols="4">
            <v-text-field label="Telephone fixe" prepend-icon="mdi-phone"  v-model="data.client.telephone_f"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Telephone portable" prepend-icon="mdi-cellphone"  v-model="data.client.telephone_p"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Email" prepend-icon="mdi-mail" v-model="data.client.mail"></v-text-field>
          </v-col>
        </v-row>

        <v-toolbar class="mb-5">
          <v-toolbar-title>Adresses</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text @click="addAdress">Ajouter une adresse</v-btn>
        </v-toolbar>
        <v-row v-for="(adresse, index) in data.adresses" :key="index" class="px-4">
          <v-row >
            <v-col cols="12">
              <v-text-field label="Adresse" v-model="data.adresses[index].adresse"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Code postal" v-model="data.adresses[index].code_postal"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Ville" v-model="data.adresses[index].ville"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Pays" v-model="data.adresses[index].pays"></v-text-field>
            </v-col>
            <hr>
          </v-row>
          <v-btn icon @click="delAddresse(index)" class="my-auto" v-show="index !== 0">
            <v-icon> mdi-minus </v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "account",
  data() {
    return {
      valid: true,
      datePicker: false,
      data: {
        client: {
          nom: this.$auth.user.family_name || '',
          prenom: this.$auth.user.given_name || '',
          date_naissance: "",
          telephone_f: "",
          telephone_p: "",
          mail: this.$auth.user.email,
          authId: this.$auth.user.sub
        },
        adresses: [
          { adresse:'', code_postal: '', ville: '', pays: '' }
        ]
      },
    }
  },
  methods: {
    async save(){
      try {
        const user = await this.$axios.$post('/api/user', this.data)

        this.data.client = user.data[0]

        const id_client = user.data[0].id_client

        const adresses = this.data.adresses.map(adresse => {
          return Object.assign(adresse, {id_client})
        })

        const addr = await this.$axios.$post('/api/user/adresse', adresses)

      } catch (e) {
        console.error(e)
      }
    },

    addAdress() {
      this.data.adresses.push({adresse:'', code_postal: '', ville: '', pays: ''})
    },

    delAddresse(index){
      this.data.adresses.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
