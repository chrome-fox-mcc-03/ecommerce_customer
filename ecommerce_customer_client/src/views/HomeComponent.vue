<template>
  <div class="home-component d-flex flex-row flex-wrap align-items-center justify-content-center">
    <b-row>
      <b-col>
      <!--Mid Sidebar-->
        <div class="mid d-flex flex-column align-items-center justify-content-center">
          <h1 class="home-title">Featured Product</h1>
          <div class="carousel-container shadow">
            <ProductCarousel />
          </div>
          <div class="shadow product-list border border-primary my-5 d-flex flex-column align-items-center justify-content-center">
            <div>
              <h3>Most Popular</h3>
            <hr>
          </div>
            <product-list></product-list>
          </div>
        </div>
      </b-col>
      <b-col>
      <!--Right Sidebar-->
        <div class="shadow right-sidebar border border-primary d-flex flex-column align-items-center justify-content-center align-self-start mt-5 mx-4">
          <div class="arrival-header">
            <h3>New Arrivals</h3>
            <hr>
          </div>
          <product-side-bar></product-side-bar>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductCarousel from '../components/ProductCarousel.vue'
import ProductList from './ProductList.vue'
import ProductSideBar from './ProductSideBar.vue'
export default {
  name: 'HomeComponent',
  components: {
    ProductCarousel,
    ProductList,
    ProductSideBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-title {
  font-family: 'Caveat', cursive;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.carousel-container {
  background-color: aqua;
  width: 50vw;
}

h3 {
  font-family: 'Caveat', cursive;
}

</style>
