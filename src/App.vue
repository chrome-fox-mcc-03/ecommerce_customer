<template>
  <div id="app">
   <Navbar></Navbar>
    <router-view/>
    <div class="container"
        v-if="loading === true">
      <lottie-player
      src="https://assets2.lottiefiles.com/datafiles/DsjK4Q0K3WGTIVf/data.json"
      background="transparent"
      speed="0.6"
      style="width: 300px; height: 200px;"
      loop autoplay
      class="mx-auto">
      </lottie-player>
      <p class="font-weight-light mt-0 h4">Loading....</p>
  </div>
  <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapState(['loading', 'products'])
  },
  methods: {
    ...mapMutations(['SET_ISLOGIN', 'SET_LOGOUT']),
    ...mapActions(['fetchProduct'])
  },
  created () {
    if (localStorage.token) {
      this.SET_ISLOGIN()
      if (this.products.length === 0) {
        this.fetchProduct()
      }
    } else {
      this.SET_LOGOUT()
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
  position: relative;
  min-height: 100vh;
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
