<template>
  <div id="app">
    <audio v-if="Bgm" src="./assets/Teikoku.ogg" preload="auto" loop hidden autoplay volume="0.1"></audio>
    <vue-progress-bar></vue-progress-bar>
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    navbar
  },
  methods: {
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    Products () {
      return this.$store.state.Products
    },
    Orders () {
      return this.$store.state.Order
    },
    Cart () {
      return this.$store.state.Cart
    },
    Bgm () {
      return this.$store.state.Bgm
    }
  },
  beforeCreate () {
  },
  created () {
    const token = localStorage.getItem('Access_Token')
    if (token !== null) {
      this.$store.commit('SET_LOGIN', true)
      this.$store.commit('SET_BGM', true)
      this.$store.dispatch('FetchOrder')
      this.$store.dispatch('FetchCart')
      this.$store.dispatch('FetchProduct')
    } else {
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #315375;
  background-image: url('./assets/wp.jpg');
  background-size: cover;
  width: 100vw;
  height: 100vh;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
