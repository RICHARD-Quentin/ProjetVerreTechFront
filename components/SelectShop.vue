<template>
<v-card>
  <v-card-title>Sélectionnez un point de retrait</v-card-title>
  <v-card-text>
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
              <v-list-item-title v-text="shop.name"/>
              <v-list-item-subtitle v-text="'Adresse: ' + shop.address"/>
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
        <div v-for="shop in shops" :key="shop.id">
          {{shop.id}}
          <l-marker :lat-lng="[shop.lat, shop.lng]" ></l-marker>
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
            @click="$emit('shopSelected',null)"
          >
            Annuler
          </v-btn>
          <v-btn
            color="blue darken-1"
            :disabled="!selection"
            text
            @click="$emit('shopSelected',selection)"
          >
            Sélectionner ce point de retrait
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
  data() {
    return {
      center:{
        lat:47.2351589,
        lng:3.3989245
      },
      selection :null,
      shops:
       [
        {lat:46.9480517,lng:2.452533,name: "Magasin données brutes à changer",id:1,address:"6A rue des vignes 67320 KIRRBERG"},
        {lat:47.9480517,lng:2.852533,name: "Magasin VerreTech de Nancy",id:2},
        {lat:47.9980517,lng:2.483533,name: "Magasin VerreTech de Bouzonville",id:3}
      ]
    };
  },
 
  mounted(){
    //TODO:
    //Requete pour récupperer les magasins... variable ---> shops
    
    //La carte s'affiche pas à cause du v-dialog et le redimensionnement.
    this.$nextTick(() => { 
      let map = this.$refs.map.mapObject;
      setTimeout(function(){ map.invalidateSize()}, 200);
    }); 
    
    if(this.shopSelected)
      {
      this.center.lat = shopSelected.lat;
      this.center.lng = shopSelected.lng;
      }
  },
  computed:{
    ...mapGetters('cart', ['shopSelected'])
  },
  methods:{
    selectShop(shop)
    {
      this.selection = shop
      this.center.lat = shop.lat;
      this.center.lng = shop.lng;
    },
    
  }
 
}
</script>
