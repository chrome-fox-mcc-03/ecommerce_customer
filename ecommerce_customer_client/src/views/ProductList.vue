<template>
  <div class="d-flex flex-row flex-wrap sizeCustom px-3 py-2 justify-content-center">
      <product-card v-for="product in products" :key="product.id" :product="product"></product-card>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { mapState } from 'vuex'
export default {
  name: 'ProductList',
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
    max-width: 50vw;
    background-color: white;
    border-radius: 10px;
}
</style>
