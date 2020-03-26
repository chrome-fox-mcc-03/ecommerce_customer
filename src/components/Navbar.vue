<template>
<nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <a class="navbar-brand" href="#">Navbar</a>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/products">Products</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/carts" class="nav-link" >Cart</router-link>
      </li>
      <!-- <li class="nav-item">
        <a class="nav-link" >Profile</a>
      </li> -->
      <li v-if="!isLogin" class="nav-item">
        <router-link class="nav-link" to="/login">Login</router-link>
      </li>
      <li v-else class="nav-item">
        <a class="nav-link" @click="logout">Logout</a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_ISLOGIN', false)
      this.$router.push({ name: 'Home' })
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
#navbar {
  background-color: #005082 !important;
  height: 100%;
  widht: 100%;
}
</style>
