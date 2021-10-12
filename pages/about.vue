<template>
  <v-card>
    <v-card-title class="justify-center text-h2" >A propos</v-card-title>

    <v-img src="about_cover.jpg" 
      max-height="400"
      ></v-img>
    <v-card-text>

      <p>
        Nous mangeons des produits français.
      </p>
    </v-card-text>

      <v-divider class="ma-4"></v-divider>
    <v-expansion-panels>
        <v-expansion-panel
        v-for="(item,i) in faq"
        :key="i"
        >
        <v-expansion-panel-header>
            {{item.title}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card color="grey lighten-4" class="pa-10">
            {{item.content}}
          </v-card>
        </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

export default {
  name: "about",

  data() {
    return {
      faq: [
        {
          title: "Qui sommes-nous ?",
          content: "Nous sommes VerreTech, une entreprise spécialisée dans le verre et plus précisement [..]"
        },
        {
          title: "Qu'est ce que le Click & Collect ?",
          content: "Le Click and Collect est une solution ECommerce permettant de réserver un article en magasin."
        },
        {
          title: "Comment puis-je demander des informations supplémentaires ?",
          content: "Vous pouvez nous contacter via [..]"
        },
        {
          title: "Dans quel délai puis-je retirer mes produits ?",
          content: "Vous devez allez chercher votre produit dans le magasin sélectionné dans les 2 heures suivant la réservation. Sinon votre commande retournera en stock et vous serez remboursé."
        },
        {
          title: "Vous souhaitez nous découvir ?",
          content: "Faites le."
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
