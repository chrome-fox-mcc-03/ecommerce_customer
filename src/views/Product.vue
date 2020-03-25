<template>
  <div class="container">
    <div class="row">
      <product-grid></product-grid>
      <product-grid></product-grid>
      <product-grid></product-grid>
      <product-grid></product-grid>
      <product-grid></product-grid>
      <product-grid></product-grid>
      <product-grid></product-grid>
      <product-grid></product-grid>
      <product-grid></product-grid>
      <product-grid></product-grid>
    </div>
  </div>
</template>

<script>
import ProductGrid from '../components/ProductGrid'

export default {
  name: 'Product',
  components: {
    ProductGrid
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
