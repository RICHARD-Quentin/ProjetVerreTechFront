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
    <v-col cols="12" md="6">
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
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-col>
    <v-col cols="12" md="6">
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
            @click="validateShop(null)"
          >
            Annuler
          </v-btn>
          <v-btn
            color="blue darken-1"
            :disabled="!selection"
            text
            @click="validateShop(selection)"
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
      if(val === -1){
         this.$store.dispatch('cart/clearCart')
         this.$store.dispatch('cart/delShop');
      }
      else if(val != null){
        this.$store.dispatch('cart/clearCart')
        this.$store.dispatch('cart/setShop', val);
      }
      else if (val === null) {
        this.$store.dispatch('cart/clearCart')
        this.$store.dispatch('cart/delShop', val);
      }
      this.$emit('Selected',val)
    }

  }

}
</script>
