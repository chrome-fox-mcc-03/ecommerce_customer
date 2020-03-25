<template>
  <div>
    <b-card
        :title="product.name"
        tag="product"
        style="max-width: 18rem; max-heigt: 20rem"
        class="mb-2 ml-3 mr-3 mt-2 shadow d-flex flex-columnjustify-content-center flex-wrap"
    >
      <hr>
        <b-card-img thumbnail :src="product.image_url"></b-card-img>
        <b-card-text class="align-self-end">
        <strong>Price {{product.price | currency}}</strong><br>
        <strong>Stock {{product.stock}}</strong>
        </b-card-text>
        <div class="d-flex flex-row align-items-baseline justify-content-center">
          <!-- <b-button v-b-modal.detailModal>Detail</b-button> -->
          <div class="mr-2">
            <b-form-input v-model="qty" type="number" min="1"></b-form-input>
          </div>
          <b-button @click.prevent="addToCart(qty)" class="ml-0">Add to cart</b-button>
        </div>
        <!-- <product-detail title="Detail Product"></product-detail> -->
    </b-card>
  </div>
</template>

<script>
// import ProductDetail from './ProductDetail.vue'
import { mapState } from 'vuex'
export default {
  name: 'ProductCard',
  props: ['product'],
  data () {
    return {
      qty: ''
    }
  },
  methods: {
    addToCart (quantity) {
      this.$store.dispatch('addProductToCart', {
        product: this.product,
        quantity: Number(quantity)
      })
    },
    computed: {
      ...mapState(['isLogin'])
    }
  }
}
</script>

<style>

</style>
