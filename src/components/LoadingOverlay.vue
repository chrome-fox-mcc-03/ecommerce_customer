<template>
  <v-overlay :absolute="absolute">
    <lottie-player
      src="https://assets8.lottiefiles.com/datafiles/kEHAgDS7oi7hPrp/data.json"
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px;"
      loop
      autoplay
    >
    </lottie-player>
  </v-overlay>
</template>

<script>
export default {
  data () {
    return {
      absolute: true
    }
  }
}
</script>

<style>

</style>
