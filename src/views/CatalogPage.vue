<template>
  <div class="catalog-page">
    <div class="ads">
      <h1>New Arrival</h1>
      <p>check out our latest collection</p>
    </div>
    <div class="catalog-space">
      <h3>NEW COLLECTION</h3>
      <div class="row d-flex">
        <!--  -->
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2 shadow-sm" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Onitsuka Tiger Black</p>
            <p class="">929.900</p>
          </div>
        </div>
        <!--  -->
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2 shadow-sm" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Adidas Ultraboost</p>
            <p class="">799.900</p>
          </div>
        </div>
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2 shadow-sm" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Nike Flyknit</p>
            <p class="">799.900</p>
          </div>
        </div>
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2 shadow-sm" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Nike Cortez G</p>
            <p class="">799.900</p>
          </div>
        </div>
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2 shadow-sm" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Nike Cortez G</p>
            <p class="">799.900</p>
          </div>
        </div>
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2 shadow-sm" style="max-width: 18rem;">
          <img src="https://www.webitrs5.net/images/comingsoon-square.png" class="card-img-top" alt="...">
          <div class="shoe-desc">
            <p class="">Nike Cortez G</p>
            <p class="">799.900</p>
          </div>
        </div>
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2 shadow-sm" style="max-width: 18rem;">
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
  height: 500px;
  background-image: url("https://images.squarespace-cdn.com/content/v1/551b99dce4b0ae1f4a728b25/1479907152929-W18109XPM0H2KZYJ1086/ke17ZwdGBToddI8pDm48kFdj1LU3QXNrC7XCDJRXSjl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1US_GH6w34F4AbXQYP1mTMh6WZrJMPe9RIQ00FIMO_YvQxJ-BQGo94klLBA8TVf45lA/NikeTown_10536.jpg?format=1500w");
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10rem;
  align-items: flex-end;
  background-color: teal;
  font-family: 'Cabin', sans-serif;
  color: white;
  text-align: right;
  h1 {
    font-weight: 800;
    font-size: 4rem;
    font-style: italic;
  }
  p {
    font-size: 1.25rem;
  }
}
.catalog-space {
  background-color: rgb(241, 241, 241);
  padding: .5rem 7.5rem;
}
.footer {
  height: 150px;
  background-color: rgb(109, 187, 187);
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
