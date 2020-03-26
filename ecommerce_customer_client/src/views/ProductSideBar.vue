<template>
  <div class="d-flex flex-row flex-wrap sizeCustom py-2 justify-content-center">
      <product-card v-for="product in products.slice(0, 4)" :key="product.id" :product="product"></product-card>
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
