<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand router-link to="/">Home</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if='!isLogin' router-link to="/login">Login</b-nav-item>
        <b-nav-item v-if='!isLogin' router-link to='/register'>Register</b-nav-item>
        <b-nav-item v-if='isLogin' router-link to='/product'>Product</b-nav-item>
        <b-nav-item v-if='isLogin' @click="FetchCart" router-link to='/cart'>Cart</b-nav-item>
        <b-nav-item v-if='isLogin' router-link to='/order'>Order</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav align='right'>
        <b-nav-item v-if='isLogin' @click="Mute" right>Mute BGM</b-nav-item>
        <b-nav-item v-if='isLogin' @click="Logout" right>Logout</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>

</template>

<script>
export default {
  methods: {
    Logout () {
      localStorage.removeItem('Access_Token')
      localStorage.removeItem('Role')
      this.$router.push({ name: 'Login' })
      this.$store.dispatch('Logout')
    },
    FetchCart () {
      this.$store.dispatch('FetchCart')
    },
    Mute () {
      this.$store.commit('SET_BGM1')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    Products () {
      return this.$store.state.Products
    }
  }
}
</script>

<style>
</style>
