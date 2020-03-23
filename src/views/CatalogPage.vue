<template>
  <div class="catalog-page">
    <div class="ads">
      <h2>ads here</h2>
    </div>
    <div class="catalog-space">
      <h3>NEW COLLECTION</h3>
      <div class="row d-flex inner-catalog">
        <!--  -->
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Onitsuka Tiger Black</p>
            <p class="">929.900</p>
          </div>
        </div>
        <!--  -->
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Adidas Ultraboost</p>
            <p class="">799.900</p>
          </div>
        </div>
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Nike Flyknit</p>
            <p class="">799.900</p>
          </div>
        </div>
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Nike Cortez G</p>
            <p class="">799.900</p>
          </div>
        </div>
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Nike Cortez G</p>
            <p class="">799.900</p>
          </div>
        </div>
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Nike Cortez G</p>
            <p class="">799.900</p>
          </div>
        </div>
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Nike Cortez G</p>
            <p class="">799.900</p>
          </div>
        </div>
        <!-- <div class="col-12 col-sm-6 col-md-4 col-lg-3 shoes-card mb-3" style="max-width: 275px; min-width: 275px;">
          <img class="shoes-img" src="https://www.webitrs5.net/images/comingsoon-square.png" alt="">
          <p>Nike Flyknit</p>
          <small>250.000</small>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 shoes-card mb-3" style="max-width: 275px; min-width: 275px;">
          <h2>Shoes</h2>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 shoes-card mb-3" style="max-width: 275px; min-width: 275px;">
          <h2>Shoes</h2>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 shoes-card mb-3" style="max-width: 275px; min-width: 275px;">
          <h2>Shoes</h2>
        </div> -->
      </div>
    </div>
    <div class="footer">
      <h2>footer</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogPage'
}
</script>

<style lang="scss">
.ads {
  background-image: url("https://www.adweek.com/wp-content/uploads/2019/09/spotify-80s-ads-2019.jpg");
}
.catalog-page{
}
.ads {
  height: 80vh;
  background-color: teal;
}
.catalog-space {
  background-color: rgb(59, 143, 143);
  padding: 0 7.5rem;
}
.footer {
  height: 150px;
  background-color: rgb(109, 187, 187);
}
.shoes-card {
  background-color: rgb(190, 120, 190);
  height: 15rem;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.inner-catalog{
  // justify-content: space-between;
}
.shoes-img {
  max-width: 100%;
  max-height: 90%;
  /* object-fit: cover;
  width: 250px;
  height: 250px; */
}
.shoe-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .5rem .5rem;
  text-align: center;
  p {
    margin: 0;
  }
}
</style>
