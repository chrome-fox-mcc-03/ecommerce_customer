<template>
  <div>
    <b-card
        style="max-width: 18rem; max-heigt: 20rem"
        class="mb-2 ml-3 mr-3 mt-2 shadow d-flex flex-columnjustify-content-center flex-wrap">
      <b-card-title @click.prevent="showDetail(product.id)"><router-link v-b-modal.modifiedName to=''>{{product.name}}</router-link></b-card-title>
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
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object
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
    },
    showDetail (productId) {
      this.$store.dispatch('showDetail', { productId })
      this.$bvModal.show('detailProduct')
    }
  }
}
</script>

<style>

</style>
