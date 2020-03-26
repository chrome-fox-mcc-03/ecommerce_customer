<template>
<div id="carts-container" class="d-flex flex-row flex-wrap justify-content-lg-around align-items-center">
  <div v-for="cart in carts" :key="cart.id" class="card text-center" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Cart ID: {{cart.id}} </h5>
      <p class="card-text">Last Updated: {{cartDate(cart.updatedAt)}} ago</p>
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
      const selisih = new Date().getTime() - new Date(time).getTime()
      const seconds = Math.round(selisih / 1000)
      if (seconds >= 60) {
        const minutes = Math.round(seconds / 60)
        if (minutes >= 60) {
          const hours = Math.round(minutes / 60)
          if (hours >= 24) {
            const days = Math.round(hours / 24)
            return `${days} days`
          } else {
            return `${hours} hours`
          }
        } else {
          return `${minutes} minutes`
        }
      } else {
        return `${seconds} seconds`
      }
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
          console.log(err)
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
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
