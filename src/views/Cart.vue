<template>
<div id="carts-container" class="d-flex flex-row flex-wrap justify-content-lg-around align-items-center">
  <div v-for="cart in carts" :key="cart.id" class="card text-center" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Cart ID: {{cart.id}} </h5>
      <p class="card-text">Last Updated: {{cartDate(cart.updatedAt)}}</p>
      <p>Status: {{ status(cart.isPaid) }} </p>
      <div class="d-flex flex-row justify-content-lg-around align-items-center">
        <a @click="cartDetail(cart.id)" class="option">Details</a>
        <a @click="deleteCart(cart.id)" class="option">Delete</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('getCarts')
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  methods: {
    cartDate (time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDay()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      const dateString = `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`
      return dateString
    },
    status (bool) {
      if (bool) {
        return 'Paid'
      } else {
        return 'Not Paid'
      }
    },
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
    },
    cartDetail (id) {
      const cartId = id
      this.$store.dispatch('cartDetail')
        .then(result => {
          const allCartProducts = result.data
          const cartProducts = allCartProducts.filter(el => {
            return el.CartId === cartId
          })
          if (cartProducts.length > 0) {
            this.$store.commit('SET_CARTPRODUCT', cartProducts)
          } else {
            this.$store.commit('SET_CARTPRODUCT', [])
          }
          this.$router.push({ name: 'CartDetail', params: { id: cartId } })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style>
#carts-container {
  background-color: #cbe2b0 !important;
  height: 100%;
  width: 100%;
}
.card-title {
  color: #000839;
}
</style>
