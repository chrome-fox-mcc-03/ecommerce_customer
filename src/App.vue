<template>
  <div id="app">
    <div id="nav">
      <navbar/>
    </div>
    <router-view id="main"/>
    <loading v-if="isLoading"/>
    <div id="footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Loading from './views/Loading.vue'
export default {
  components: {
    Navbar,
    Footer,
    Loading
  },
  mounted () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('SET_ISLOGIN', true)
    }
  },
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
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

#nav {
  height: 10vh;
  padding: 0px;
  margin: 0px;
}

#footer {
  height: 10vh;
  padding: 0px;
  margin: 0px;
}

#main {
  height: 80vh;
  background-color: #f3ecb8;
}

#nav a {
  font-weight: bold;
  color: #faf4f4;
}

#nav a.router-link-exact-active {
  color: #ffa41b;
}
</style>
