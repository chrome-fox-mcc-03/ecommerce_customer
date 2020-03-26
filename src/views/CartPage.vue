<template>
  <div class="cart-page">
    <Navbar/>
    <Loader v-if="isLoading"/>
    <div class="cart-space">
      <h2 v-if="carts.length == 0">your cart is empty, checkout our <b @click="redirToCatalog" style="cursor: pointer;">catalog</b> to shop!</h2>
      <CartCard v-for="cart in carts" :key="cart.id" :cart="cart"/>
    </div>
    <div class="checkout-space">
      <div></div>
      <div class="d-flex flex-column align-items-end">
        <h3>total: {{ carts.length }} items</h3>
        <h2 style="font-weight: 600;">IDR {{ total }}</h2>
      </div>
      <button @click="toast" class="my-btn my-btn-teal">Checkout</button>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import CartCard from '../components/CartCard.vue'
import Loader from '../components/Loader'
export default {
  name: 'CartPage',
  methods: {
    toast () {
      this.$toasted.show('Sorry, this feature is not available at the moment', {
        duration: 4000
      })
    },
    redirToCatalog () {
      this.$router.push('/catalog')
    }
  },
  components: {
    Navbar,
    CartCard,
    Loader
  },
  created () {
    this.$store.dispatch('fetchCarts')
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    total () {
      let totalPrice = 0
      for (let i = 0; i < this.carts.length; i++) {
        totalPrice += +this.carts[i].product_qty * +this.carts[i].Product.price
      }
      return totalPrice
    },
    isLoading () {
      return this.$store.state.isLoading
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
  padding: 5rem 5vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  color: white;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #3C7A89;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2E4756;
}
</style>
