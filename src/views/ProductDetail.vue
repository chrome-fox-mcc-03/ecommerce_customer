<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="product.img_url" :alt="product.name" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="subtitle">
                  <strong>{{ product.name }}</strong>
                </p>
                <p class="subtitle">{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-two-third">
          <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                Product Detail
                </p>
            </header>
                <div class="card-content">
                    <div class="content">

                    <p class="title">{{product.name}}</p>
                    <p class="subtitle">Category: {{product.Category.name}}</p>
                    <p class="subtitle"><strong>Price: {{product.price}}</strong></p>
                    <br>
                    Stock: {{ product.stock }}
                    </div>
                    <div class="buttons">
                        <button class="button is-danger" @click="addToCart">Add to card</button>
                        <button class="button is-secondary" @click="back">Back</button>
                    </div>
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
  name: 'ProductDetail',
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    Loading
  },
  created () {
    this.$store.dispatch('getProduct', this.$route.params.id)
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    addToCart () {
      if (this.$store.state.access_token) {
        this.isLoading = true
        this.$store.dispatch('addToCart', this.product.id)
          .then(_ => {
            this.isLoading = false
            const status = {
              title: 'Product added to cart!',
              body: 'Successfully add product to cart.',
              type: 'success',
              canTimeout: true,
              duration: 2000
            }
            this.$vToastify.success(status)
          })
          .catch(err => {
            this.isLoading = false
            const status = {
              title: 'Error add to cart.',
              body: err.response.data.errors[0],
              type: 'error',
              canTimeout: true,
              duration: 2000
            }
            this.$vToastify.error(status)
          })
      } else {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 10px;
}
</style>
