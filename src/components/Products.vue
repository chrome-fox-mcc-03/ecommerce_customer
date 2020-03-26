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
  props: ['category'],
  components: {
    Product,
    Loading
  },
  computed: {
    products () {
      if (this.category) {
        const data = this.$store.state.products.filter(product => {
          return product.genre === this.category
        })
        if (data.length === 0) {
          console.log(this.$store.state.products.filter(product => {
            return product.id === this.category
          }), 'masuuuuk===================')
          console.log(this.category)
          return this.$store.state.products.filter(product => {
            return product.id === Number(this.category)
          })
        } else {
          return data
        }
      } else {
        return this.$store.state.products
      }
    }
  }
}
</script>

<style>

</style>
