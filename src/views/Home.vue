<template>
  <div class="home">
    <Navbarhome />
    <div>
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/c1.jpg" class="d-block w-100" alt="" />
          </div>
          <div class="carousel-item">
            <img src="../assets/c2.jpg" class="d-block w-100" alt="" />
          </div>
          <div class="carousel-item">
            <img src="../assets/c3.jpg" class="d-block w-100" alt="" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <div id="promotion" class="row">
        <div class="card col-md-4 col-sm-12 apparels">
          <img src="../assets/apparels.jpg">
        </div>
        <div class="card col-md-4 col-sm-12 bikes">
          <img src="../assets/bike.jpg">
        </div>
        <div class="card col-md-4 col-sm-12 bikes">
          <img src="../assets/custom.jpg">
        </div>
    </div>
    <Footerpage/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbarhome from '../components/NavBarHome'
import Footerpage from '../components/Footer'
export default {
  name: 'Home',
  components: {
    Navbarhome,
    Footerpage
  }
}
</script>

<style scoped>
#promotion{
  width: 100vw;
}

.card{
  border: none;
  padding: 0;
}

</style>
