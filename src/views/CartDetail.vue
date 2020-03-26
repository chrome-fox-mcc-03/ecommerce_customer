<template>
<div id="cart-container" class="d-flex justify-content-center align-items-center flex-column">
  <h1 class="pb-3">Cart</h1>
  <div class="d-flex flex-row justify-content-around align-items-center">
    <div id="container-items" class="d-flex justify-content-center align-items-center flex-row flex-wrap">
      <div v-for="item in cartProduct" :key="item.id" class="card m-3" style="max-width: 30vw;">
        <div class="row no-gutters">
          <div class="col-md-4 d-flex justify-content-center align-items-center">
            <img :src="item.Product.image_url" class="card-img" :alt="item.Product.name">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.Product.name }}</h5>
              <p class="card-text">Amount: {{ item.quantity }}</p>
              <p class="card-text">Price: Rp {{ price(item.quantity, item.Product.price) }}</p>
              <div class="d-flex flex-row justify-content-lg-around">
                <a @click="deleteCartProduct(item.id)">Delete</a>
                <a @click="getUpdateCartProduct(item.id)" data-toggle="modal" data-target="#updateCartProduct">
                  Update
                </a>
              </div>
              <p class="card-text"><small class="text-muted">Last updated {{ minutes(item.updatedAt) }} ago</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="container-checkout">
      <h3>Summary</h3>
      <p>Total Price {{ totalPrice() }}</p>
      <button v-if="!cartProduct[0].Cart.isPaid" @click="updateCartStatus" class="btn btn-primary">Checkout</button>
    </div>
  </div>
  <update-cart-product/>
</div>
</template>

<script>
import UpdateCartProduct from './../components/UpdateCartProduct.vue'
export default {
  components: {
    UpdateCartProduct
  },
  computed: {
    cartProduct () {
      return this.$store.state.cartProduct
    }
  },
  methods: {
    minutes (updateTime) {
      const selisih = new Date().getTime() - new Date(updateTime).getTime()
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
    price (quantity, price) {
      return quantity * price
    },
    totalPrice () {
      let totalPrice = 0
      this.cartProduct.forEach(el => {
        const price = el.quantity * el.Product.price
        totalPrice += price
      })
      return totalPrice
    },
    deleteCartProduct (id) {
      let cartId
      this.$store.dispatch('deleteCartProduct', id)
        .then(result => {
          cartId = result.data.CartId
          return this.$store.dispatch('cartDetail', cartId)
        })
        .then(result => {
          const allCartProducts = result.data
          const cartProducts = allCartProducts.filter(el => {
            return el.CartId === cartId
          })
          this.$store.commit('SET_CARTPRODUCT', cartProducts)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUpdateCartProduct (id) {
      this.$store.dispatch('getUpdateCartProduct', id)
    },
    updateCartStatus () {
      const id = this.cartProduct[0].CartId
      console.log(id)
      this.$store.dispatch('editCartStatus', id)
        .then(result => {
          this.$router.push({ name: 'Cart' })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style>
#cart-container {
  width: 100vw;
  height: auto;
}
#container-items {
  width: 70vw;
  height: 80vh;
  overflow: scroll;
}
#container-checkout {
  width: 30vw;
  height: auto;
}
</style>
