<template>
  <div>
    <b-card
        style="max-width: 18rem; max-heigt: 20rem"
        class="mb-2 ml-3 mr-3 mt-2 shadow d-flex flex-columnjustify-content-center flex-wrap">
      <b-card-title><router-link v-b-modal.modifiedName to=''>{{product.name}}</router-link></b-card-title>
      <hr>
        <b-card-img :src="product.image_url" style="max-width: 150px; max-height: 100px"></b-card-img>
        <b-card-text class="align-self-end">
        <strong>Price {{product.price | currency}}</strong><br/>
        <strong>Stock {{product.stock}}</strong>
        </b-card-text>
        <div class="d-flex flex-row align-items-center justify-content-baseline pb-3">
          <div class="mr-1">
            <b-form-input v-model="qty" type="number" min="1"></b-form-input>
          </div>
          <div>
            <b-button @click.prevent="addToCart(qty)"><i class="fas fa-cart-arrow-down"></i></b-button>
          </div>
        </div>
    </b-card>
    <product-detail :product="product" :modifiedName="modifiedName" :title="product.name"></product-detail>
  </div>
</template>

<script>
import ProductDetail from './ProductDetail'
export default {
  name: 'ProductCard',
  components: {
    ProductDetail
  },
  props: {
    product: {
      type: Object
    }
  },
  computed: {
    modifiedName: function () {
      return `${this.product.id}modal`
    }
  },
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
    }
  }
}
</script>

<style>

</style>
