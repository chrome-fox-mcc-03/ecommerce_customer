<template>
  <div id="app">
    <div class="loading-container" v-if="isLoading">
        <div class="loading-screen">
            <lottie-player src="https://assets7.lottiefiles.com/datafiles/WKqC5QWz9GiZnlm/data.json"
                background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay>
            </lottie-player>
        </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin: auto;
    top: 35%;
    width: 300px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 300px;
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-screen lottie-player {
    margin: auto;
}
</style>
