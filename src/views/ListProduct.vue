<template>
  <div class="product">
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/gear.jpg" class="d-block w-100" alt="Product" />
        </div>
      </div>
    </div>
    <div class="promotion-image">
      <img src="../assets/alp.png" alt="Alpine" />
    </div>
    <div class="container my-3 py-5 text-center">
      <div class="row mb-5">
        <div class="col">
          <h1>OUR PRODUCTS</h1>
          <hr width="50px" color="red">
        </div>
      </div>
      <div class="row justify-content-between">
        <Card v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
    <Footerpage/>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import Footerpage from '../components/Footer'
export default {
  name: 'listProduct',
  components: {
    Card,
    Footerpage
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
.product{
margin-top: 100px;
}

.promotion-image{
  width: 100%;
  background-color: rgb(206, 7, 7);
}

.all-product{
  display: flex;
  flex-direction: row;
}

.col h1{
  font-weight: 700;
  font-size: 60px;
}

</style>
