<template>
 <b-card
      title="Dancow Vanilla"
      img-src="https://picsum.photos/300/300/?image=41"
      img-alt="Image"
      img-height="220"
      img-top
      tag="article"
      style="max-width: 16rem; height: 26rem;"
      class="mb-2 product-item"
      align="left"
    >
      <b-card-text>
        Susu terbaik.
      </b-card-text>

      <b-card-text class="price">
        Rp50.000,00
      </b-card-text>

      <b-button href="#" class="button-cart">
        <i class="fas fa-cart-plus"></i>
        Add to Cart
      </b-button>
  </b-card>
</template>

<script>
export default {

};
</script>

<style scoped>
  .button-cart {
    background-color: #9e9e9e;
    border-color: #e1e1e1;
  }
  .button-cart:hover {
    background-color: #1992d4;
    border-color: #b3ecff;
  }
  .price {
    color: #f0b429;
    font-weight: bold;
  }
  .product-item {
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: box-shadow;
    transition-property: box-shadow;
  }
  .product-item:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  }
</style>
