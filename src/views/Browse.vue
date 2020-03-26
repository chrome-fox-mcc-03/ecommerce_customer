<template>
    <div class="browse mb-5 pb-4 mt-5 pt-4 d-flex flex-column justify-content-center align-items-center">
        <h2 class="display-6 mt-5 pt-3 mb-5" style="font-size:26px; font-weight:bold">Browse All Items</h2>
        <b-row class="d-flex justify-content-center" style="width: 65rem;">
            <product-card
            v-for="product in products"
            :key="product.id"
            :img_url="product.img_url"
            :name="product.name"
            :description="product.description"
            :price="product.price"
            :stock="product.stock"
            :storeName="product.Store.name"
            :id="product.id"
            ></product-card>
        </b-row>
      <loading-now v-if="nowLoading"></loading-now>
    </div>
</template>

<script>
import LoadingNow from '../components/LoadingNow'
import ProductCard from '../components/ProductCard'
export default {
  created () {
    this.$store.dispatch('fetchAllProduct')
  },
  computed: {
    nowLoading () {
      return this.$store.state.nowLoading
    },
    products () {
      return this.$store.state.allProducts
    }
  },
  components: {
    LoadingNow,
    ProductCard
  }
}
</script>

<style>
</style>
