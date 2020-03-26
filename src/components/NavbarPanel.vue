<template>
    <div>
      <nav class="navbar navbar-light bg-costum nav" style="background-color: #ce848f14;">
          <router-link class="text-dark mb-0 h4 title-app m-3" :to="`/`" style="font-weight: 500px; font-size:59px;text-decoration: none;">Jolie</router-link>
          <div class="row">
            <router-link class="nav-link text-dark" :to="`/`" style="font-weight: 500px; font-size:25px;padding-left: 20px;padding-top: 34px;text-decoration: none;">Products</router-link>
            <router-link v-if="cart.length > 0" class="nav-link text-dark" :to="`/cart`" style="font-weight: 500px; font-size:25px;padding-left: 20px;padding-top: 34px;text-decoration: none;">Your Cart</router-link>
            <button @click="logout" class="nav-link text-dark bg-transparent " style="font-weight: 500px; font-size:25px;padding-left: 20px; padding-top: 34px;border: none;">Logout</button>
          </div>
      </nav>
    </div>
</template>

<script>

export default {
  name: 'NavbarPanel',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  },
  watch: {
    cart (val) {
      console.log(val)
    }
  }
}
</script>

<style>
.nav{
    /* padding: 20px; */
    background-color: rgba(206,132,143,.44);
    position: relative;
    font-family: 'Lora', serif;
}
</style>
