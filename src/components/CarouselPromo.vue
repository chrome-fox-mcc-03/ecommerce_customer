<template>
<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://images.soco.id/66341958771-1583683593989.png" class="d-block w-100" alt="promo 1">
    </div>
    <div class="carousel-item">
      <img src="https://images.soco.id/46927911886-1583684638282.png" class="d-block w-100" alt="promo 2x ">
    </div>
    <div class="carousel-item">
      <img src="https://istyle.id/wp-content/uploads//2018/03/Buy-10-Get-30-Nature-Republic.jpg" class="d-block w-100" alt="promo 3">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</template>

<script>
export default {
  name: 'CarouselPromo'
}
</script>

<style>
.carousel-item{
    height: 350px;
}
.carousel-item img{
    height: 378px;
}
</style>
