<template>
  <div>
    <b-card
        :title="product.name"
        :img-src="product.image_url"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 18rem;"
        class="mb-2 ml-3 mt-2 shadow"
    >
      <hr>
        <b-card-text>
        <strong>{{product.price}}</strong><br>
        <strong>{{product.stock}}</strong>
        </b-card-text>

        <b-button v-b-modal.detailModal>Detail</b-button>
        <b-button @click.prevent="addToCart()">Add to cart</b-button>
        <product-detail title="Detail Product"></product-detail>
    </b-card>
  </div>
</template>

<script>
import ProductDetail from './ProductDetail.vue'
export default {
  name: 'ProductCard',
  props: ['product'],
  components: {
    ProductDetail
  },
  methods: {
    addToCart () {
      this.$store.dispatch('addProductToCart', {
        product: this.product,
        quantity: 1
      })
    }
  }
}
</script>

<style>

</style>
