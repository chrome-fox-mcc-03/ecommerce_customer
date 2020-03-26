<template>
  <div class="d-flex justify-content-center">
    <loading :active.sync="$store.state.isLoading"
      :is-full-page="true"></loading>
    <div class="row container">
      <Product
      v-for="(product, i) in products" :key="i"
      :product="product"
      />
    </div>
  </div>
</template>

<script>
import Product from './Product'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
    }
  },
  props: ['products'],
  components: {
    Product,
    Loading
  }
}
</script>

<style>

</style>
