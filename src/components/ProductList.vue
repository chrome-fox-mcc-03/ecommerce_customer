<template>
  <div class="container">
    <div class="row">
      <product-card v-for="product in products" :key="product.id" :product="product"></product-card>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}

</script>

<style>

</style>
