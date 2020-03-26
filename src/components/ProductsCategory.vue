<template>
  <div class="container">
    <div class="row">
      <div class="col-4 mb-3" v-for="product in products" :key="product.id">
        <ItemProduct class="card" :product="product"></ItemProduct>
      </div>
    </div>
  </div>
</template>

<script>
import ItemProduct from './ItemProduct.vue'

export default {
  name: 'Products',
  components: {
    ItemProduct
  },
  props: ['products']
}
</script>

<style scoped>
  .row {
    padding: 10px;
  }
  .col {
    margin: 21px;
  }
  .card {
    width: 100%;
    margin: 0 auto;
  }
</style>
