<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <!-- <p class="is-size-2 has-text-black-bis has-text-weight-semibold is-family-monospace" >8-COM</p> -->
                <img src="../assets/logo.png" alt="logo">
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
                <router-link to="/promos"  class="navbar-item">
                    Promos
                </router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a v-if="isLogin" @click="viewCart" class="button is-link is-rounded">
                            <i class="fas fa-shopping-cart"></i>
                            <p class="has-text-link">...</p>
                            View Cart
                            <p class="has-text-link">...</p>
                            <span class="tag is-link is-light is-rounded">{{ cartTotalQty }}</span>
                        </a>
                        <router-link  v-if="!isLogin" to='/register' class="button is-primary is-rounded">
                            Register
                        </router-link>
                        <router-link v-if="!isLogin" to='/login' class="button is-light is-rounded">
                            Login
                        </router-link>
                        <a v-if="isLogin" @click="logout" class="button is-light is-rounded">
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
    },
    cartTotalQty () {
      const arrTotalQty = this.$store.getters.getUnpaidCart.map((el) => {
        return el.quantity
      })
      return arrTotalQty.reduce((a, b) => a + b, 0)
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
