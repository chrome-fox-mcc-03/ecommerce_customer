<template>
  <div>
    <!-- <b-modal :id="product.id" hide-header="hide-header" hide-footer="hide-footer" :title="modifiedName"> -->
        <h2 class="my-5">{{product.data.name}}
        </h2>
        <div class="row mt-5 justify-content-baseline">
          <div class="col-md-6">
            <img class="img-fluid shadow thumbnail border" style="width: 20vw; max-width:20vw; margin-left: 40%" :src="product.data.image_url" alt="">
          </div>
          <div class="col-md-4 d-flex shadow flex-column align-items-center border">
            <h3 class="my-3">Product Description</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
            <h3 class="my-3">Product Details</h3>
            <ul>
              <li>Price : {{product.data.price | currency}}</li>
              <li>Stock : {{product.data.stock}}</li>
            </ul>
            <div class="d-flex flex-row align-items-center justify-content-baseline pb-3">
              <div class="mr-1">
                <b-form-input v-model="qty" type="number" min="1"></b-form-input>
              </div>
              <div>
                <b-button @click.prevent="addToCart(qty)"><i class="fas fa-cart-arrow-down"></i></b-button>
              </div>
            </div>
            <div class="align-self-end mb-3 pr-3">
              <router-link class="btn btn-secondary" to="/">back</router-link>
            </div>
          </div>
        </div>
    <!-- </b-modal> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductDetail',
  props: {
    modifiedName: {
      type: String
    },
    title: String
  },
  computed: {
    ...mapState(['product'])
  },
  data () {
    return {
      qty: ''
    }
  },
  methods: {
    addToCart (quantity) {
      this.$store.dispatch('addProductToCart', {
        product: this.product.data,
        quantity: Number(quantity)
      })
    }
  }
}
</script>

<style scoped>

.right-column {
  margin-top: 2%;
}

.left-column {
  margin-top: 2%;
}

.image-container {
  width: 40vw;
  height: 50vh;
  margin-bottom: 25%;
  margin-top: 10%;
}

.detail-container {
  width: 40vw;
  height: 50vh;
  margin-bottom: 25%;
  margin-top: 10%;
}

</style>
