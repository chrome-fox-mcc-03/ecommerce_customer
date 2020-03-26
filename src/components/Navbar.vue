<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top">
    <a class="navbar-brand" href="#">Felix Pharmacy</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav d-flex justify-content-between">

          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/products">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/carts">Carts</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li v-if="!isLogin" class="nav-item">
              <router-link class="nav-link" to="/welcome">Login</router-link>
            </li>
            <li v-else class="nav-item">
              <a class="nav-link" @click.prevent="logout" style="cursor: pointer">Logout</a>
            </li>
          </ul>

      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.commit('SET_ISLOGIN', false)
      this.$router.push({ name: 'Welcome' })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>
.navbar {
  background-color: #a8e6cf !important;
}
</style>
