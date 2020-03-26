<template>
  <div id="app">
    <Navbar />
    <Loading v-if="loading" />
    <router-view/>
    <!-- <div id="content">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
  <!-- <a href="https://pngtree.com/free-backgrounds">free background photos from pngtree.com</a> -->
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Loading from './components/Loading'
export default {
  name: 'App',
  components: {
    Navbar,
    Loading
  },
  computed: {
    loading () {
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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
