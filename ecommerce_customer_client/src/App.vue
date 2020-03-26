<template>
  <div id="app" class="d-flex flex-column">
    <notifications group="auth" position="top center" />
    <NavBar />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    NavBar,
    Footer
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
</style>
