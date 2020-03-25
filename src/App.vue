<template>
  <div id="app">
    <div id="nav">
      <navbar/>
    </div>
    <router-view id="main"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  mounted () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('SET_ISLOGIN', true)
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
  height: 10vh
}

#main {
  height: 90vh
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
