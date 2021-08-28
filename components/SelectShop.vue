<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="6" :center="[47.2351589, 3.3989245]">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker :lat-lng="[46.9480517, 2.452533]"></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return 
    {
        locations: [
            {lat:46.9480517,lng:2.452533,name: "Shop test"},
            {lat:46.9480517,lng:2.452533,name: "Shop test"}
        ]
    }
  }
}
</script>
