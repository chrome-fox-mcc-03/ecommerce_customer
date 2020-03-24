<template>
  <div class="cart-page">
    <Navbar/>
    <div class="cart-space">
      <CartCard v-for="cart in carts" :key="cart.id" :cart="cart"/>
    </div>
    <div class="checkout-space">
      <h2>checkout</h2>
    </div>
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
// import Footer from '../components/Footer.vue'
import CartCard from '../components/CartCard.vue'
export default {
  name: 'CartPage',
  components: {
    Navbar,
    CartCard
    // Footer
  },
  created () {
    this.$store.dispatch('fetchCarts')
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  }
}
</script>

<style lang="scss">
.cart-page {
  height: 100vh;
  display: flex;
}
.cart-space {
  color: $secondary;
  width: 70%;
  padding: 5rem 5vh;
  overflow-y: scroll;
}
.checkout-space {
  background-color: #2E4756;
  width: 30%;
  padding: 5rem 1vh;
}
</style>
