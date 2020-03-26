<template>
  <div class="home d-flex flex-column justify-content-center align-items-center mt-4">
    <div class="home d-flex justify-content-center">
      <div class="carousel mt-5 pt-5">
        <b-carousel
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000"
          fade
          indicators
          img-width="1024"
          img-height="480"
        >
          <b-carousel-slide
            img-src="https://scstylecaster.files.wordpress.com/2019/09/2020-fashion-trends-feature.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="https://pricereview.co.in/wp-content/uploads/2019/04/fashion-trends.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="https://miro.medium.com/max/3000/0*JyHi-9QIN2nHXLaw"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </div>
    <h1 class="display-6 mt-5 " style="font-size:26px; font-weight:bold">WELCOME TO SHOPPINGKUY</h1>
    <h1 class="display-5 pt-2">Browse the finest of fashion marketplace.</h1>
    <h2 class="display-6 mt-5 pt-5 mb-4" style="font-size:26px; font-weight:bold">Highlighted Items</h2>
    <b-row class="mt-3 d-flex justify-content-center" style="width: 65rem;">
      <product-card
      v-for="item in highlighted"
      :key="item.id"
      :img_url="item.img_url"
      :name="item.name"
      :description="item.description"
      :price="item.price"
      :stock="item.stock"
      :id="item.id"
      :storeName="item.Store.name"
      ></product-card>
    </b-row>
    <router-link to="/browse" class="mt-5 mb-4">
     <p style="color:black; font-size: 12px; border: 1px solid black; padding: 1rem">BROWSE MORE  ></p>
    </router-link>
    <h2 class="display-6 mt-5 pt-3 mb-5" style="font-size:26px; font-weight:bold">Check These Out!</h2>
    <b-row class="mt-3 d-flex justify-content-center" style="width: 65rem;">
    <product-card
      v-for="randomItem in randomProducts"
      :key="randomItem.id"
      :img_url="randomItem.img_url"
      :name="randomItem.name"
      :description="randomItem.description"
      :price="randomItem.price"
      :stock="randomItem.stock"
      :storeName="randomItem.Store.name"
      :id="randomItem.id"
      ></product-card>
    </b-row>
    <router-link to="/browse" class="mt-5 mb-4">
     <p style="color:black; font-size: 12px; border: 1px solid black; padding: 1rem">BROWSE MORE  ></p>
    </router-link>
    <h2 class="display-6 mt-5 pt-3 mb-3" style="font-size:26px; font-weight:bold">About SHOPPINGKUY</h2>
    <div style="width: 65rem d-flex felx-column align-items-center">
      <b-card no-body class="overflow-hidden" style="max-width: 60rem; border:0">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            class="rounded-0 pt-3 pb-3"
            img-width= "540px"></b-card-img>
          </b-col>
          <b-col md="8" class="d-flex align-items-center pr-5 pl-5">
            <b-card-body title="Start shopping from our proudest trust-worthy sellers!">
            <b-card-text>
              We provide a web platform for our customer to meet our sellers and perform a quick and simple transaction!
            </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <b-card no-body class="overflow-hidden" style="max-width: 60rem; border:0">
        <b-row no-gutters>
          <b-col md="8" class="d-flex align-items-center pr-5 pl-5">
            <b-card-body title="Mall quality. Thrift Price.">
              <b-card-text>
                The product that our seller have is top notch quality! So do not hesitate and start browsing now.
              </b-card-text>
            </b-card-body>
          </b-col>
          <b-col md="4">
            <b-card-img src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            class="rounded-0 pt-3 pb-3"
            img-width= "540px"></b-card-img>
          </b-col>
        </b-row>
      </b-card>
      <b-card no-body class="overflow-hidden" style="max-width: 60rem; border:0">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            class="rounded-0 pt-3 pb-3"
            img-width= "540px"></b-card-img>
          </b-col>
          <b-col md="8" class="d-flex align-items-center pr-5 pl-5">
            <b-card-body title="Do you have something to sell?">
              <b-card-text>
                Do you want to open YOUR OWN store in this platform?
                <a href="https://ecommercecms.firebaseapp.com/">Start selling now!</a>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
      <loading-now v-if="nowLoading"></loading-now>
  </div>
</template>

<script>
// @ is an alias to /src
import LoadingNow from '../components/LoadingNow'
import ProductCard from '../components/ProductCard'
export default {
  name: 'Home',
  components: {
    LoadingNow,
    ProductCard
  },
  created () {
    this.$store.dispatch('fetchHighlightedItems')
    this.$store.dispatch('fetchRandomProduct')
  },
  computed: {
    nowLoading () {
      return this.$store.state.nowLoading
    },
    highlighted () {
      return this.$store.state.highlightedItems
    },
    randomProducts () {
      return this.$store.state.randomProducts
    }
  }
}
</script>

<style>
  .carousel {
    width: 60rem;
  }
</style>
