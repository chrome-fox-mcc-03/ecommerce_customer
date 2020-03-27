<template>
  <div>
    <loading :active.sync="$store.state.isLoading"
      :is-full-page="true"></loading>
    <div class="ml-3">
      <router-link to="/product" class="btn btn-secondary">See Other Product</router-link>
      <br><br>
      <p><router-link style="color:black;" to="/">Home</router-link> > <router-link style="color:black;" to="/product" >Product</router-link> > <router-link style="color:black;" :to="`/product/${product.id}`" >{{ product.name }}</router-link></p>
    </div>
    <div class="d-flex">
      <div class="col-md-3">
        <div class="card mb-3 shadow-sm text-center">
          <div class="p-3">
            <img
              class="img-fluid"
              :src="`${product.image_url}`"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="ml-5">
        <h5 class="border-bottom"> <b>{{ product.name }}</b></h5>
        <br >
        <div class="d-flex">
          <h2><span style="font-size:15px;color:grey">Price </span></h2>
          <h2 class="ml-5">{{ product.price }}</h2>
        </div>
        <div class="d-flex">
          <h2><span style="font-size:15px;color:grey">Stock </span></h2>
          <div class="ml-5">
            <h2><span style="font-size:13px;">Available Stock</span></h2>
            <NumberInputSpinner
              :min="1"
              :max="product.stock"
              v-model="cart.quantity"
              v-if="product.stock"
            />
            <p v-else><b>Out of Stock</b></p>
          </div>
        </div>
        <div class="d-flex">
          <h2><span style="font-size:15px;color:grey">Info <br> Product </span></h2>
          <div class="ml-5 d-flex">
            <div>
              <h2><span style="font-size:13px;">Weight</span></h2>
              <p><b>500gr</b></p>
            </div>
            <div class="ml-4">
              <h2><span style="font-size:13px;">Condition</span></h2>
              <p><b>New</b></p>
            </div>
            <div class="ml-4">
              <h2><span style="font-size:13px;">Insurance</span></h2>
              <p><b>Optional</b></p>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <h2><span style="font-size:15px;color:grey">Delivery <br> Cost </span></h2>
          <div class="ml-5">
            <h2><span style="font-size:13px;">Everywhere</span></h2>
            <p><b>Rp 50000</b></p>
          </div>
        </div>
      </div>
      <div class="ml-5">
        <button @click.prevent="addCart(product.stock)" class="btn btn-secondary">add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import NumberInputSpinner from 'vue-number-input-spinner'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  props: ['id'],
  data () {
    return {
      product: {},
      cart: {
        UserId: 0,
        ProductId: 0,
        quantity: 1
      }
    }
  },
  components: {
    NumberInputSpinner,
    Loading
  },
  methods: {
    addCart (stock) {
      if (stock) {
        this.cart.ProductId = this.product.id
        this.$store.dispatch('addCart', this.cart)
      }
    }
  },
  beforeMount () {
    this.product = this.$store.getters.getProductById(this.id)
  }
}
</script>

<style>

</style>
