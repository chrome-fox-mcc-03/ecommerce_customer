<template>
<div>
  <Navbar />
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-3">
        <h1 class="my-4">Grivety</h1>
        <div class="list-group">
          <a href="#" class="list-group-item">Category 1</a>
          <a href="#" class="list-group-item">Category 2</a>
          <a href="#" class="list-group-item">Category 3</a>
        </div>
      </div>
      <div class="col-lg-9">
        <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
              <img class="d-block img-fluid" src="https://cf.shopee.co.id/file/bb2c1a24c30f50b76eaea77194213959_xxhdpi" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block img-fluid" src="https://cf.shopee.co.id/file/30fb1f79935a4fb24d442f32de906075_xxhdpi  " alt="Second slide">
            </div>
            <div class="carousel-item">
              <img class="d-block img-fluid" src="https://cf.shopee.co.id/file/b2a59425645969259f6fe5fdaf824296_xxhdpi" alt="Third slide">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div class="row">
          <!-- BOX -->
          <Box v-for="product in products" :key="product.id" :data="product" />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</div>
</template>

<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Box from '../components/Box'
export default {
  data () {
    return {
      products: []
    }
  },
  components: {
    Navbar,
    Footer,
    Box
  },
  created () {
    this.$store.commit('SET_ISLOADING', true)
    this.$store.dispatch('getAllProduct')
      .then((result) => {
        this.products = result.data.result
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.$store.commit('SET_ISLOADING', false)
      })
  }
}
</script>

<style>

</style>
