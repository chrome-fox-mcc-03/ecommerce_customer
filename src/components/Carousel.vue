<template>
  <div id="demo" class="carousel slide" data-ride="carousel">
    <ul class="carousel-indicators">
      <li data-target="#demo" data-slide-to="0" class="active"></li>
      <li data-target="#demo" data-slide-to="1"></li>
      <li data-target="#demo" data-slide-to="2"></li>
    </ul>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="img" src="../assets/onepiece.jpg" alt="Los Angeles" width="1215" height="400">
      </div>
      <div class="carousel-item">
        <img class="img" src="../assets/naruto.jpg" alt="Chicago" width="1215" height="400">
      </div>
      <div class="carousel-item">
        <img class="img" src="../assets/bleach.jpg" alt="New York" width="1215" height="400">
      </div>
    </div>
    <a style="margin-left:200px" class="carousel-control-prev" href="#demo" data-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </a>
    <a style="margin-right:200px" class="carousel-control-next" href="#demo" data-slide="next">
      <span class="carousel-control-next-icon"></span>
    </a>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.img {
  border-radius: 30px;
}
</style>
