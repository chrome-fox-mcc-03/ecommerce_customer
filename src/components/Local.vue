<template>
  <div class="layout-products">
      <card-product v-for="(product) in products" :key="product.id" :product="product" />
  </div>
</template>

<script>
import CardProduct from './CardProduct.vue'
export default {
  components: {
    CardProduct
  },
  computed: {
    products () {
      const filterProducts = this.$store.state.products.filter(product => product.category === 'Lokal')
      return filterProducts
    }
  },
  created () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style>

</style>
