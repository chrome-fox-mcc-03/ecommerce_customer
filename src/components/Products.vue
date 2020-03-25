<template>
    <div class="d-flex flex-fluid justify-content-center" >
        <div
            v-for="product in products"
            :key="product.id"
        >
            <ProductCard :product="product"/>
        </div>
    </div>
</template>

<script>

import ProductCard from './ProductCard'

export default {
  name: 'Products',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
