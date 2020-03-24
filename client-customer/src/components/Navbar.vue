<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <p class="is-size-2 has-text-black-bis has-text-weight-semibold is-family-monospace" >8-COM</p>
            </router-link>
        </div>

        <div id="navbarBasicExample" class="navbar-menu is-active">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">
                    Home
                </router-link>
                <router-link v-if="isLogin" to="/products" class="navbar-item">
                    Products
                </router-link>
                <router-link to="/blogs"  class="navbar-item">
                    Blogs
                </router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a v-if="isLogin" @click="viewCart" class="button is-link">
                            <i class="fas fa-shopping-cart"></i>
                            <p class="has-text-link">...</p>
                            View Cart
                        </a>
                        <router-link  v-if="!isLogin" to='/register' class="button is-primary">
                            Register
                        </router-link>
                        <router-link v-if="!isLogin" to='/login' class="button is-light">
                            Login
                        </router-link>
                        <a v-if="isLogin" @click="logout" class="button is-light">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    viewCart () {
      this.$router.push('/cart')
    }
  }
}
</script>
