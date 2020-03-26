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
              class="button is-danger"
              @click="details(product.id)"
            >
              Show
            </button>
            <button
              class="button is-danger"
              @click="addToCart(product.id)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.$store.dispatch('getProducts')
  },
  methods: {
    details (id) {
      this.$router.push(`/product/${id}`)
    },
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
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
