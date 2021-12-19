<template>
    <transition v-if="this.show" name="fade" v>
      <v-container 
      fluid>
          <v-parallax
            style="height:230px;"
            dark
            src="/chair.jpg"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            
          >
            <v-card-title class="maintitle" style="margin:auto;"> Verre-Tech </v-card-title>

        </v-parallax>
      </v-container>
  </transition>
</template>

<script>

export default {
    name: 'AccParallax',
    data() {
        return {
          show: false,
        }
      },
      mounted() {
        this.show = true;
      },
}
</script>


<style>
.maintitle {
    font-size: 5em;
}
.fade-enter-active {
  transition: opacity 2s;
}
.fade-enter{
  opacity: 0;
}

</style>
