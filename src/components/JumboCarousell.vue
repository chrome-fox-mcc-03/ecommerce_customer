<template>
<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="section carousel-item active">
      <img src="https://imagena.loccitane.com/on/demandware.static/-/Library-Sites-OCC_SharedLibrary/default/dw0366fcab/images/Modules/1400x200/HP_Desktop[1].jpg" class="d-block h-100" alt="">
      <div class="floating-desc">
        <div class="border-div">
          <h3>THE MOST GROUNDBREAKING SHOWER</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa repellendus libero atque quo expedita alias eum voluptates sed eligendi commodi earum facere et impedit, ab quisquam assumenda! Aspernatur, magni nobis!</p>
          <button class="btn-shop">Shop Now</button>
        </div>
      </div>
    </div>
    <div class="section carousel-item">
      <img src="https://imagena.loccitane.com/on/demandware.static/-/Library-Sites-OCC_SharedLibrary/default/dw39da558a/images/Modules/Sliders/SheaHP_v3_1400x530.jpg" class="d-block h-100" alt="">
      <div class="floating-desc">
        <div class="border-div">
          <h3>THE ART OF SOAPS</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa repellendus libero atque quo expedita alias eum voluptates sed eligendi commodi earum facere et impedit, ab quisquam assumenda! Aspernatur, magni nobis!</p>
          <button class="btn-shop">Shop Now</button>
        </div>
      </div>
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

}
</script>

<style>
#carouselExampleControls {
  height: 100%;
  width: 100%;
}

.section {
  height: 80vh;
  width: 100%;
}

.btn-shop {
  background-color: #ffd31d;
  font-size: 1rem;
  padding: 0.5rem;
}

.floating-desc {
  width: 30vw;
  height: auto;
  position: absolute;
  z-index: 1000;
  top: 10vh;
  right: 20vh;
  background-color: whitesmoke;
  padding: 0.5rem;
}

.border-div {
  padding: 2rem;
  border: 3px solid gold
}

</style>
