<template>
  <div id="cartPage">
    <Navbar/>
    <div class="cart" style="margin-top: 130px">
      <h1>My Shopping Cart</h1>
      <hr width="50px" color="red">
      <div>
        <div class="cart-head d-flex">
          <h4>Image</h4>
          <h4>Name</h4>
          <h4>Price</h4>
          <h4>Quantity</h4>
          <h4>Total</h4>
          <h4>Option</h4>
        </div>
        <CartCard v-for="cart in carts" :key="cart.id" :cart="cart"/>
      </div>
    </div>
    <FooterPage/>
  </div>
</template>

<script>
import Navbar from '../components/NavBar'
import FooterPage from '../components/Footer'
import CartCard from '../components/CartCard'
export default {
  name: 'cartPage',
  components: {
    Navbar,
    FooterPage,
    CartCard
  },
  computed: {
    carts: function () {
      return this.$store.state.carts
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style scoped>
.cart{
  width: 100%;
  min-height: 30vh;
}

.cart-head{
  justify-content: space-around;
  margin-top: 50px;
  border-bottom: 1px solid rgba(49, 49, 49, 0.288);
}

.cart h1{
  font-weight: 700;
  font-size: 60px;
}
</style>
