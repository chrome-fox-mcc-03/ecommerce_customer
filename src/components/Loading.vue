<template>
  <div id="loading">
    <div id="animation" class="preloader-wrapper big">
      <img src="../assets/loader.gif" alt="loading">
    </div>
    <h3>Loading...</h3>
  </div>
</template>

<script scoped>
export default {
  name: 'Loading'
}
</script>

<style>
  #loading {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: rgba(35, 35, 35, 0.8);
    color: #d7ccc8;
    z-index: 10;
}
#animation {
  padding: 25vh 23vw 0 0;
}
#loading h3 {
  padding-top: 5vh;
}
</style>
