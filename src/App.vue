<template>
  <div id="app">
    <lottie-player
        src="https://assets8.lottiefiles.com/datafiles/cb81834f3b75c3d2aba9d8a58ad1f408/AE_JSON/loader1.json"  background="transparent"  speed="1"  style="width: 100%; height: 90%; position: fixed; top:0; left:0; right:0, bottom:0; z-index:101"  loop autoplay v-if="this.$store.state.isLoading" >
    </lottie-player>
    <notifications group="foo" />
    <router-view/>
  </div>
</template>

<style>
</style>
