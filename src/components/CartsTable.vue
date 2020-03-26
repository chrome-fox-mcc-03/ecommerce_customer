<template>
  <div id="carts-table" class="row">
    <div class="col s12">
      <h5 v-if="!carts.length">No recent order yet</h5>
      <div v-else>
        <table class="highlight responsive-table">
          <thead>
            <tr>
              <th></th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(cart, i) in carts"
              :key="i"
            >
              <td><img :src="cart.Item.imageUrl" alt="picture"></td>
              <td>{{ cart.Item.name }}</td>
              <td>{{ cart.quantity }}</td>
              <td>Rp {{ price(cart.quantity, cart.Item.price) }}</td>
              <!-- <td><button class="waves-effect waves-light btn"><i class="material-icons">edit</i></button></td> -->
              <td><button class="waves-effect waves-light btn red" @click.prevent="deleteCart(cart.Item.id)"><i class="material-icons">remove_shopping_cart</i></button></td>
            </tr>
          </tbody>
        </table>
        <div class="col s6"><h5>Total</h5></div>
        <div class="col s6"><h5>Rp {{ total() }}</h5></div>
        <div class="col s6 offset-s3">
          <button id="checkout-btn" class="waves-effect waves-light btn blue" @click.prevent="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartsTable',
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  methods: {
    price (quantity, itemPrice) {
      const price = quantity * itemPrice
      return price.toLocaleString('id')
    },
    total () {
      let total = 0
      this.carts.forEach(cart => {
        total += (cart.quantity * cart.Item.price)
      })
      return total.toLocaleString('id')
    },
    checkout () {
      this.$store.dispatch('checkout')
        .then(() => {})
        .catch(err => {
          if (err.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            this.$router.push('/')
          }
        })
    },
    deleteCart (itemId) {
      this.$store.dispatch('deleteCart', { itemId })
        .then(() => {})
        .catch(err => {
          if (err.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            this.$router.push('/')
          }
        })
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style scoped>
  #carts-table img {
    max-width: 10vw;
  }
  #checkout-btn {
    width: 15vw;
  }
</style>
