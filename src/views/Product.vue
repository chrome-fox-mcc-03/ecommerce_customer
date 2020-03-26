<template>
  <div class="container pt-5">
    <div class="row">
      <product-grid v-for="product in products" :key="product.id" :product="product"></product-grid>
    </div>
  </div>
</template>

<script>
import ProductGrid from '../components/ProductGrid'
import { mapState } from 'vuex'

export default {
  name: 'Product',
  components: {
    ProductGrid
  },
  computed: {
    ...mapState(['products'])
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
