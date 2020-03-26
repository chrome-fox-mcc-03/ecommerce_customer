<template>
  <div class="container">
    <CartItem v-for="item in cartitems" :key="item.id" :item="item"></CartItem>
    <div class="card">
      <div class="columns">
        <div class="column">
          <div class="title">Total</div>
        </div>
        <div class="column">
          <p class="subtitle">{{total}}</p>
        </div>
        <div class="column">
        </div>
        <div class="column">
            <button class="button is-danger" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
export default {
  name: 'Cart',
  components: {
    CartItem
  },
  created () {
    this.$store.dispatch('getCart')
  },
  methods: {
    checkout () {
      this.$store.dispatch('checkout')
    }
  },
  computed: {
    cartitems () {
      return this.$store.state.cartitems
    },
    total () {
      return this.$store.getters.totalCartItemPrice
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
