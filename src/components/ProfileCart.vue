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
  </div>
</template>

<script>
import ProfileProduct from './ProfileProduct'
export default {
  data () {
    return {
      productInCarts: [],
      isLoading: false
    }
  },
  components: {
    ProfileProduct
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
        .then(response => {
          this.productInCarts = response.data
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
  }
}

</script>

<style scoped>
h1{
  text-align: center;
}

</style>
