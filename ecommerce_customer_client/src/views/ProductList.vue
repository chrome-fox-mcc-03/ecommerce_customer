<template>
  <div>
      <input type="text" v-model="search" placeholder="find a product">
    <div class="d-flex flex-row flex-wrap px-1 py-2 justify-content-center overflow-auto" style="max-height: 80vh">
      <product-card v-for="product in products" :key="product.id" :product="product" :id="product.id"></product-card>
    </div>
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
  data () {
    return {
      productsContainer: [],
      search: ''
    }
  },
  created () {
    this.$store.dispatch('onFetchProduct')
  },
  computed: {
    ...mapState(['products']),
    filterProduct: function () {
      return this.productsContainer.filter((product) => {
        return product.name.match(this.search)
      })
    }
  }
}
</script>

<style>
</style>
