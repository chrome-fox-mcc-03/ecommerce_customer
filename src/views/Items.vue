<template>
  <div id="main" class="container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Main',
  created () {
    this.$store.commit('IS_LOGIN')
  }
}
</script>

<style>
  #main {
    padding-top: 3vh;
  }
</style>
