<template>
  <div class="home-component d-flex flex-row flex-wrap align-items-center justify-content-center">
  <!--Mid Sidebar-->
      <b-row cols="2">
        <b-col>
          <div class="d-flex flex-column align-items-center justify-content-around" >
            <div>
              <div class="mid d-flex flex-column align-items-center justify-content-center mt-5 mr-4">
                <div class="align-self-start carousel-container">
                <h1 class="home-title align-self-start">Featured Product</h1>
                <hr>
                  <ProductCarousel class="shadow" />
                  <div class="mt-5" style="width:100%; height:10%;">
                    <div>
                      <h3>Category</h3>
                      <div style="width:100%; height:5%;" class="border border-primary pt-3 mt-3 rounded">
                          <ul>
                            <li>
                              <a href=""><i class="fas fa-laptop"></i> Computers</a>
                            </li>
                            <li>
                              <a href=""><i class="fas fa-tshirt"></i> Clothing</a>
                            </li>
                            <li>
                              <a href=""><i class="fas fa-baseball-ball"></i> Sports</a>
                            </li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="shadow right-sidebar d-flex flex-column align-items-center justify-content-center align-self-start mt-5">
            <div class="arrival-header">
              <h3>New Arrival</h3>
              <hr>
            </div>
            <product-side-bar></product-side-bar>
          </div>
        </b-col>
      </b-row>
      <div class="productsContainer align-self-start shadow product-list mt-5 mb-4 d-flex flex-column align-items-center justify-content-center">
        <div>
          <h3>Our Products</h3>
          <hr>
        </div>
          <product-list></product-list>
      </div>
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
  width: 40vw;
  height: 20vh;
}

h3 {
  font-family: 'Caveat', cursive;
}

.productsContainer {
  margin-top: 20em;
  width: 90vw ;
}

</style>
