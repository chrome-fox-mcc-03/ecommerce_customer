<template>
  <div class="profile-cart">
    <h1>ini cart</h1>
    <profile-product v-for="(product, index) in productInCart" :key="index" :product="product"></profile-product>
  </div>
</template>

<script>
import ProfileProduct from './ProfileProduct'
export default {
  data () {
    return {
      productInCart: [],
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
          this.productInCart = response.data
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

</style>
