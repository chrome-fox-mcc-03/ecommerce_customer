<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4" v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from '@/components/ProductCard'
export default {
  name: 'CartPage',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchAllProducts')
      .then(({ data }) => {
        this.$store.commit('SET_LOADING', false)
        this.$store.commit('STOP_ERROR')
        this.$store.commit('SET_PRODUCTS', data.data)
        this.$store.dispatch('fetchCarts')
      })
      .catch(({ response }) => {
        this.$store.commit('SET_LOADING', false)
        this.$store.commit('SET_ERROR', response.data)
      })
  }
}
</script>
<style>
</style>
