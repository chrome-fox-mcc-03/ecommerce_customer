<template>
    <div class="d-flex flex-fluid justify-content-center" >

      <Loading v-if="isLoading"/>
        <div
            v-for="product in products"
            :key="product.id"
        >
            <ProductCard :product="product"/>
        </div>
    </div>
</template>

<script>
import Loading from './Loading'
import ProductCard from './ProductCard'

export default {
  name: 'Products',
  components: {
    ProductCard,
    Loading
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
