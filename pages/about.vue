<template>
  <v-card>
    <v-card-title class="justify-center mb-0 pb-0" >Pouvons-nous répondre à votre question ?</v-card-title>

    <v-img src="about_cover.jpg" 
      max-height="100px" class="ma-5"
      ></v-img>

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
          content: "Le Groupe Verre-Tech est un groupe 100% familial créé en 1955 par M. Emile Dupont, qui reste," +
"encore aujourd’hui le PDG de l’entreprise. " +
"Depuis son origine Verre-tech est spécialisée et leader dans la fabrication et la distribution en " +
"magasins de produits en verre techniques et décoratifs."
        },
        {
          title: "Qu'est ce que le Click & Collect ?",
          content: "Le click and collect, retrait en magasin, cliqué-retiré, service cliquer et ramasser, clique et rapplique, ramassage en magasin ou drive piéton, est un service permettant aux consommateurs de commander en ligne pour ensuite retirer leur article dans un magasin de proximité."
        },
        {
          title: "Comment puis-je demander des informations supplémentaires ?",
          content: "Vous pouvez nous envoyer un mail ou nous appeler directement, nous sommes à votre écoute !"
        },
        {
          title: "Dans quel délai puis-je retirer mes produits ?",
          content: "Vous devez allez chercher votre produit dans le magasin sélectionné dans les 2 heures suivant la réservation. Sinon votre commande retournera en stock et vous serez remboursé."
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
