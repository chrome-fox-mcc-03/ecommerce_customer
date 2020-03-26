<template>
  <div>
    <div class="home-customer">
      <div class="introduction">
        <div class="carousel-1">
          <Carousel></Carousel>
        </div>
        <div class="description">
          <p>Sweat sweater, visit us, get your style with buying our sweater. High quality and good performance, giving you comfort and popularity</p>
        </div>
      </div>
      <h1 >All Products</h1>
      <div class="fetch-products-1">
        <Product
          :products="products"></Product>
      </div>
      <div class="about-us">
        <div class="jargon">
          <h1>The Love Sweater</h1>
        </div>
        <div class="keterangan">
          <h1>ABOUT US</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum nam tenetur totam, sit laborum, ab distinctio omnis in doloremque temporibus natus quidem eaque laboriosam repellendus commodi impedit sapiente fugit quae!</p>
        </div>
      </div>
      <div class="footer">
        <h1>fOOTER</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/Carousel'
import Product from '../components/Product'

export default {
  name: 'Home',
  components: {
    Carousel,
    Product
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>
  .home-customer {
    display: 'flex';
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
  }
  .introduction {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .carousel-1 {
    margin: 10px;
  }
  .description p {
    font-size: 30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    text-align: right;
    margin-bottom: 0px;
    margin-top: 20px;
    margin-right: 20px;
    letter-spacing: -2px;
  }
  .fetch-products-1 {
    overflow-x: auto;
  }
  .about-us {
    display: flex;
    flex-direction: row;
  }
  .about-us .jargon {
    width: 40%;
  }
  .about-us .keterangan {
    width: 60%;
  }
  .footer {
    background-color:burlywood;
    margin-bottom: 0;
  }
</style>
