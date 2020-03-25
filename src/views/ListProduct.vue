<template>
  <div class="product">
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/gear.jpg" class="d-block w-100" alt="Product" />
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container my-3 py-5 text-center">
      <div class="row mb-5">
        <div class="col">
          <h1>OUR PRODUCTS</h1>
        </div>
      </div>

      <div class="row">
        <Card v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
export default {
  name: 'listProduct',
  components: {
    Card
  },
  computed: {
    products: function () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchData')
  }
}
</script>

<style>
.all-product{
  background-color: brown;
  display: flex;
  flex-direction: row;
}

.col h1{
font-weight: 700;
}
</style>
