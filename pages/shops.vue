<template>
  <v-container>
      <h1 class="ma-4">Points de retraits</h1>
    <SelectShop />
  
  </v-container>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "shops",
  data() {
    return {
      selection:null
      
    }
  },
  computed:{
     ...mapGetters('cart', ['shopSelected','getShopName'])
  },
  mounted() {
   
    
  },
  methods: {
   
  }
}
</script>

<style scoped>

</style>
