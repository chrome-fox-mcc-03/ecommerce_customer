<template>
 <b-card
      :title="product.name"
      :img-src="product.image_url"
      img-alt="Image"
      img-height="220"
      img-top
      tag="article"
      style="width: 16rem; height: 26rem;"
      class="mb-2 mr-2 product-item"
      align="left"
    >
      <b-card-text style="font-size: 75%">
        {{ product.description }}
      </b-card-text>

      <b-card-text class="price">
        {{ currency(product.price) }}
      </b-card-text>

      <div class="cart-input">
        <b-button @click="addToCart(product.id)" variant="info" class="button-cart">
          <i class="fas fa-cart-plus"></i>
          Add
        </b-button>

        <input type="number" v-model="quantity"
          style="width: 20%; margin-left: 10%">
      </div>
  </b-card>
</template>

<script>
import axios from '../../config/axios';

export default {
  name: 'ProductCard',
  props: ['product'],
  data() {
    return {
      quantity: 0,
    };
  },
  methods: {
    currency(num) {
      return num.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    },
    addToCart(productId) {
      axios({
        method: 'POST',
        url: '/cart',
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          ProductId: productId,
          quantity: this.quantity,
        },
      })
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style scoped>
  .button-cart {
    text-align: start;
    width: 50%;
    margin-right: 5px;
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

  .cart-input {
    display: flex;
    align-content: space-around;
    flex-flow: row wrap;
    /* overflow: hidden; */
    flex-direction: row;
    width: 100%;
  }
</style>
