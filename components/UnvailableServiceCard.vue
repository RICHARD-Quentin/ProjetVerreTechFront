<template>
    <v-card max-width="500" class="mx-auto my-12">
    <v-card-title >
      Service indisponible
    </v-card-title>
    <v-card-subtitle>
      Le service {{serviceName}} est momentanément indisponible,
      merci de réessayer plus tard. Nous vous prions d'accepter nos sincères excuses pour la gêne occasionnée.
    </v-card-subtitle>
    <v-card-text>
      <v-img
    src ="https://www.cinepal.fr/evenement/5553120.jpg-r_x_600-f_jpg-q_x-xxyxx.jpg">
    </v-img>
    </v-card-text>
    <v-card-actions>
      <v-btn to="/">
        Retour à l'acceuil
      </v-btn>
    </v-card-actions>


  </v-card>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
    serviceName:""
  }
}

</script>
