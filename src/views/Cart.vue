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
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import CartItem from '../components/CartItem'
export default {
  name: 'Cart',
  components: {
    CartItem,
    Loading
  },
  created () {
    this.$store.dispatch('getCart')
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    checkout () {
      this.isLoading = true
      this.$store.dispatch('checkout')
        .then(_ => {
          this.isLoading = false
          const status = {
            title: 'Checkout success!',
            body: 'Successfully checkout your cart.',
            type: 'success',
            canTimeout: true,
            duration: 2000
          }
          this.$vToastify.success(status)
        })
        .catch(err => {
          this.isLoading = false
          const status = {
            title: 'Error when checkout',
            body: err.response.data.errors[0],
            type: 'error',
            canTimeout: true,
            duration: 2000
          }
          this.$vToastify.error(status)
        })
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
