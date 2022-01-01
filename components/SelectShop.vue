<template>
<v-card>
  <v-card-title>Liste des points de vente</v-card-title>
  <v-card-text>
      <v-alert
      border="top"
      color="red lighten-2"
      dark>
     Attention, lorsque vous sélectionnez un point de vente, vous réinitialisez votre panier achat !
    </v-alert>
  <v-row>
    <v-col>
      <v-list v-model="selection">
      <v-list-item-group>
        <v-list-item v-for="(shop, i) in shops" :key="i" class="px-0" @click="selectShop(shop)">
          <v-row no-gutters align="center">
            <v-col cols="4">
              <v-icon>mdi-city</v-icon>
            </v-col>
            <v-col cols="6">
              <v-list-item-title v-text="shop.intitule"/>
              <v-list-item-subtitle v-text="'Adresse: ' + shop.adresse_magasin"/>
<<<<<<< HEAD
            </v-col>          
          </v-row>
        </v-list-item>
        <v-list-item class="px-0 orange lighten-5 " @click="selectShop(-1)">
           <v-row no-gutters align="center">
            <v-col cols="4">
              <v-icon>mdi-city</v-icon>
            </v-col>
            <v-col cols="6">
              <v-list-item-title>Aucun point de vente</v-list-item-title>
              <v-list-item-subtitle >Affiche tout les articles.</v-list-item-subtitle>
=======
>>>>>>> 1f220cc03078a056457cc21ff4c52b694f2e49fb
            </v-col>          
          </v-row>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-col>
    <v-col>
      <div id="map-wrap"  style="height: 50vh">
      <client-only>
      <l-map :zoom="6" :center="center" ref="map">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <div v-for="shop in shops" :key="shop.id_boutique">
          {{shop.id_boutique}}
          <div v-if="shop.lat != null && shop.lng != null" >
          <l-marker :lat-lng="[shop.lat, shop.lng]" ></l-marker>
          </div>
        </div>      
      </l-map>
    </client-only>
    </div>
    </v-col>
  
  </v-row>
  </v-card-text>
  <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
<<<<<<< HEAD
            @click="validateShop(null)"
=======
            @click="$emit('Selected',null)"
>>>>>>> 1f220cc03078a056457cc21ff4c52b694f2e49fb
          >
            Annuler
          </v-btn>
          <v-btn
            color="blue darken-1"
            :disabled="!selection"
            text
<<<<<<< HEAD
            @click="validateShop(selection)"
=======
            @click="$emit('Selected',selection)"
>>>>>>> 1f220cc03078a056457cc21ff4c52b694f2e49fb
          >
            Valider la selection
          </v-btn>
  </v-card-actions>
</v-card>
</template>

<script>

import { mapGetters } from "vuex";
import 'leaflet/dist/leaflet.css';

export default {
  props:{
    showTheMap:null
  },
  async fetch()
  {
     const result = await this.$axios.get(`/api/catalog/shop`).catch(err => console.log(err))
      if(result.data.success == true)
      {
        this.shops = result.data.response
      }
  },
  data() {
    return {
      center:{
        lat:47.2351589,
        lng:3.3989245
      },
      selection :null,
      shops: []
    };
  },
  computed:{
    ...mapGetters('cart', ['shopSelected'])
  },
  mounted(){   
    //La carte s'affiche pas à cause du v-dialog et le redimensionnement.
    this.$nextTick(() => { 
      let map = this.$refs.map.mapObject;
      setTimeout(function(){ map.invalidateSize()}, 200);
    }); 
    /*
    if(this.shopSelected)
    {
        console.log(shopSelected)
      this.center.lat = shopSelected.lat;
      this.center.lng = shopSelected.lng;
    }
    */
      
  },
  methods:{
    selectShop(shop)
    {
      this.selection = shop
      if(shop != -1){
        this.center.lat = shop.lat;
        this.center.lng = shop.lng;
      }     
    },
    validateShop(val){
      console.log(val)
      if(val == -1){
         this.$store.commit('cart/clearCart')
         this.$store.commit('cart/setShop', null);
         
      }
      else if(val != null){
        this.$store.commit('cart/clearCart')
        this.$store.commit('cart/setShop', val);
      }
      this.$emit('Selected',val)
    }
    
  }
 
}
</script>
