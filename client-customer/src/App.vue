<template>
  <div id="app">
    <Navbar/>
    <notifications group="foo" />
    <Loading v-if="isLoading"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Loading from './components/Loading'
export default {
  name: 'ClientCustomer',
  components: {
    Navbar,
    Loading
  },
  created () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('SET_ISLOGIN', true)
      this.$store.dispatch('fetchProducts')
      this.$store.dispatch('fetchCart')
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

</style>
