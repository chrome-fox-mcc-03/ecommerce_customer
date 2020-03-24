<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'ClientCustomer',
  components: {
    Navbar
  },
  created () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('SET_ISLOGIN', true)
      this.$store.dispatch('fetchProducts')
      this.$store.dispatch('fetchCart')
    }
  }
}
</script>

<style>

</style>
