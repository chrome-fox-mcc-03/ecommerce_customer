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
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style>

</style>
