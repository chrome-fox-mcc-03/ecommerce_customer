<template>
  <div class="profile-cart">
    <h1>SHOPPING CART</h1>
    <table class="uk-table uk-table-middle uk-table-divider uk-overflow-auto ">
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Invoice</th>
          <th>Status</th>
          <th class="uk-width-small">Action</th>
        </tr>
      </thead>
      <tbody>
        <profile-product @getCart='getCart' v-for="(productInCart, index) in productInCarts" :key="index" :productInCart="productInCart" :index="index+1"></profile-product>
      </tbody>
    </table>
    <div v-show="isEmpty" class="if-empty">
      <router-link class="nav-dashboard" :to="'/dashboard'"><h1>Ooops! Your cart are empty! You can add item from dashboard</h1></router-link>
      <img width="50%" src="../assets/emptyCart.svg" alt="">
    </div>

    <!-- Pay all button -->
    <div v-show="!isEmpty" class="pay-all">
      <button @click.prevent="payall" class="button-pay-all"><b>Pay All</b></button>
    </div>
    <!-- Loading while buy -->
    <div v-if="isLoading" class="loading-buy">
      <loading-buy></loading-buy>
      <p>Your payment are being authorize, please wait a moment</p>
    </div>
  </div>
</template>

<script>
import ProfileProduct from './ProfileProduct'
import LoadingBuy from './LoadingBuy'
import UIkit from 'uikit'
export default {
  data () {
    return {
      productInCarts: [],
      isLoading: false
    }
  },
  components: {
    ProfileProduct,
    LoadingBuy
  },
  computed: {
    isEmpty () {
      if (this.productInCarts.length === 0) return true
      return false
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
        .then(response => {
          this.productInCarts = response.data.filter(product => !product.isPaid)
        })
        .catch(err => {
          console.log(err.response)
        })
        .finally(() => {

        })
    },
    test () {
      this.productInCarts.forEach(element => {
        this.$store.dispatch('pay', element.id)
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    payall () {
      let listId = []
      this.productInCarts.forEach(element => listId.push(element.id))
      listId = listId.join()
      this.$store.dispatch('payall', listId)
        .then(response => {
          UIkit.modal('#payment-confirmed').show()
          setInterval(_ => {
            UIkit.modal('#payment-confirmed').hide()
          }, 1500)
          this.getCart()
        })
        .catch(err => {
          console.log(err.response)
        })
        .finally(() => {
        })
    }
  },
  created () {
    this.getCart()
  },
  mounted () {
  }
}

</script>

<style scoped>
h1{
  text-align: center;
}
.profile-cart{
  display: flex;
  flex-direction: column;
}
.if-empty{
  transform: scale(0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav-dashboard:hover{
  text-decoration: none;
  background-color: rgba(254, 206, 168, 0.2);
  border-radius: 15px;
}
.button-pay-all{
  background-color:#ff847c;
  position: fixed;
  height: 65px;
  width: 65px;
  border-radius: 50px;
  text-align: center;
  right: 5%;
  bottom: 5%;
  color: white;
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12);
}
.button-pay-all:hover{
  transform: scale(1.2);
}
.loading-buy{
  left: 0;
  top: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.8);
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
