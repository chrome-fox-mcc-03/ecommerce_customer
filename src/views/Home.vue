<template>
  <div class="container product-container">
    <div class="card" v-for="product in products" :key="product.id">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="product.img_url" :alt="product.name" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="subtitle"><strong>{{ product.name }}</strong></p>
            <p class="subtitle">{{ product.price }}</p>
          </div>
        </div>
        <div class="content">
          <div class="buttons">
            <button
              class="button is-danger is-outlined"
              @click="details(product.id)"
            >
              Show
            </button>
            <button
              class="button is-danger is-outlined"
              @click="addToCart(product.id)"
            ><i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
export default {
  name: 'Home',
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    this.$store.dispatch('getProducts')
    this.$store.dispatch('getCart')
  },
  components: {
    Loading
  },
  methods: {
    details (id) {
      this.$router.push(`/product/${id}`)
    },
    addToCart (id) {
      if (this.$store.state.access_token) {
        this.isLoading = true
        this.$store.dispatch('addToCart', id)
          .then(_ => {
            this.isLoading = false
          })
          .catch(_ => {
            this.isLoading = false
          })
      } else {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0.5em;
  padding-top: 5px;
}
.card {
  height: max-content;
}
.card-image {
  margin: 0;
}
div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
