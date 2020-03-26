<template>
  <div class="d-flex">
    <div class="d-flex justify-content-center" style="border-radius:30px; box-shadow: 0px 0px 2px 2px grey;padding: 20px;width:50%; margin-right:10px">
      <div>
        <h2 style="text-align:left;">Popular category</h2>
        <br>
        <div>
          <router-link to="/product/adventure" class="btn btn-secondary btn-sm mr-3"><b>Adventure</b></router-link>
          <router-link to="/product/isekai" class="btn btn-secondary btn-sm mr-3"><b>Isekai</b></router-link>
          <router-link to="/product/comedy" class="btn btn-secondary btn-sm mr-3"><b>Comedy</b></router-link>
          <router-link to="/product/sport" class="btn btn-secondary btn-sm mr-3"><b>Sport</b></router-link>
        </div>
      </div>
    </div>
    <div class="d-flex" style="border-radius:30px; box-shadow: 0px 0px 2px 2px grey;padding: 20px">
      <div>
        <h2 style="text-align:left;margin-left:30px">Popular Title</h2>
        <div id="b" class="carousel slide" data-ride="carousel">
          <!-- The slideshow -->
          <div class="container carousel-inner no-padding">
            <div class="carousel-item active">
              <div class="col-xs-3 col-sm-3 col-md-3">
                <img id="top-product" src="../assets/top/attactontitan.png">
              </div>
              <div class="col-xs-3 col-sm-3 col-md-3">
                <img id="top-product" src="../assets/top/bleach.png">
              </div>
              <div class="col-xs-3 col-sm-3 col-md-3">
                <img id="top-product" src="../assets/top/conan.png">
              </div>
              <div class="col-xs-3 col-sm-3 col-md-3">
                <img id="top-product" src="../assets/top/dragonball.jpg">
              </div>
            </div>
            <div class="carousel-item">
              <div class="col-xs-3 col-sm-3 col-md-3">
                <img id="top-product" src="../assets/top/fairytail.png">
              </div>
              <div class="col-xs-3 col-sm-3 col-md-3">
                <img id="top-product" src="../assets/top/naruto.jpg">
              </div>
              <div class="col-xs-3 col-sm-3 col-md-3">
                <img id="top-product" src="../assets/top/onepiece.gif">
              </div>
              <div class="col-xs-3 col-sm-3 col-md-3">
                <img id="top-product" src="../assets/top/tokyoghoul.jpg">
              </div>
            </div>
          </div>
          <!-- Left and right controls -->
          <a class="carousel-control-prev" href="#b" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </a>
          <a class="carousel-control-next" href="#b" data-slide="next">
            <span class="carousel-control-next-icon"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.col-md-3{
  display: inline-block;
  margin-left:-4px;
}
.col-md-3 img{
  width:100%;
  height:auto;
}

#top-product {
  border-radius: 15px;
}
</style>
