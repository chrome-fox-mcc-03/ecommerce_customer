<template>
  <div class="d-flex flex-row flex-wrap sizeCustom py-2 justify-content-center overflow-auto" style="max-height: 80vh">
      <product-card v-for="product in products.slice(products.length-4, products.length)" :key="product.id" :product="product"></product-card>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { mapState } from 'vuex'
export default {
  name: 'ProductSideBar',
  components: {
    ProductCard
  },
  created () {
    this.$store.dispatch('onFetchProduct')
  },
  computed: {
    ...mapState(['products'])
  }
}
</script>

<style>
.sizeCustom {
    max-width: 40vw;
}
</style>
