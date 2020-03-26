<template>
  <div id="app">
    <navbar/>
    <router-view/>
    <div class="footer-copyright text-center py-3 bg-dark mt-auto py-3"
    style="color:white;">© 2020 Adam Primarizki
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  components: {
    Navbar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('CHANGE_LOGIN_STATUS')
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

h1 {
  font-family: 'Baloo 2', cursive;
}

h2 {
  font-family: 'Muli', sans-serif;
}
button {
  font-family: 'Muli', sans-serif;
}
p {
  font-family: 'Muli', sans-serif;
}
</style>
