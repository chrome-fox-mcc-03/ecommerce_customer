<template>
  <div class="home">
    <NavbarPanel/>
    <div>
      <CarouselPromo/>
      <div class="d-flex justify-content-center m-3 title">
        <h1 class="display-4">Must Buy!</h1>
      </div>
      <Products/>
    </div>
  </div>
</template>

<script>
import NavbarPanel from '../components/NavbarPanel'
import CarouselPromo from '../components/CarouselPromo'
import Products from '../components/Products'

export default {
  name: 'Home',
  components: {
    CarouselPromo,
    Products,
    NavbarPanel
  }
}
</script>

<style>
.title{
  font-family: 'Permanent Marker', cursive;
}
</style>
