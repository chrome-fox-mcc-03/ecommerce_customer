<template>
    <div>
        <h1 class="title is-2 has-text-black-ter is-family-secondary has-text-centered">Product Detail</h1><br>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths">
                <div class="columns">
                    <div class="column">
                        <div class="box">
                            <figure class="image">
                                <img :src="product.image_url" :alt="product.name">
                            </figure>
                        </div>
                    </div>
                    <div class="column">
                        <div class="box">
                            <br>
                            <p class="title is-3">{{ product.name }}</p>
                            <p class="subtitle is-4">{{ product.price | currency }}</p>
                            <p class="subtitle is-5">Stock: {{ product.stock }}</p>
                            <p class="subtitle is-5">Category: <span class="tag is-dark is-rounded is-medium">{{ category }}</span></p>
                            <a @click="addToCart(product.id)" class="button is-link is-rounded">
                                <i class="fas fa-cart-plus"></i>
                                <p class="has-text-link">...</p>
                                Add to Cart
                            </a><br><br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column"></div>
        </div>
        <h1 class="title is-2 has-text-black-ter is-family-secondary has-text-centered">Reviews</h1><br>
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <div class="control">
              <label for="rating">Rate this product:</label><br>
              <label class="radio">
                <input v-model="point" type="radio" value="1">
                1
              </label>
              <label class="radio">
                <input v-model="point" type="radio" value="2">
                2
              </label>
              <label class="radio">
                <input v-model="point" type="radio" value="3">
                3
              </label>
              <label class="radio">
                <input v-model="point" type="radio" value="4">
                4
              </label>
              <label class="radio">
                <input v-model="point" type="radio" value="5">
                5
              </label>
            </div>
            <div class="field">
              <div class="control">
                <textarea v-model="review" class="textarea is-primary" placeholder="What do you think about this product?"></textarea>
              </div>
            </div>
            <button @click="submitReview" class="button is-primary is-rounded">Submit</button>
          </div>
          <div class="column"></div>
        </div>
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <div v-for="review in reviews" :key="review.id" class="card">
              <div class="card-content">
                <p class="title is-4">
                  {{ review.review }} <span class="subtitle is-6">( {{ review.point }} /5 )</span>
                </p>
                <p class="subtitle is-6">
                  by {{ review.User.email }}
                </p>
              </div>
            </div>
          </div>
          <div class="column"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      review: '',
      point: '5'
    }
  },
  methods: {
    getDetailProduct () {
      const id = this.$route.params.id
      this.$store.dispatch('getDetailProduct', id)
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    },
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
    },
    submitReview () {
      const id = this.$route.params.id
      const payload = {
        ProductId: id,
        review: this.review,
        point: Number(this.point)
      }
      this.$store.dispatch('submitReview', payload)
      this.review = ''
      this.point = '5'
    }
  },
  computed: {
    getImage () {
      if (!this.product.image_url) {
        return require('../assets/empty.svg')
      } else {
        return this.product.image_url
      }
    },
    product () {
      return this.$store.state.product
    },
    reviews () {
      return this.$store.state.reviews
    },
    category () {
      if (this.product.category === 'food and beverages') {
        return 'Food and Beverages'
      } else if (this.product.category === 'electronic') {
        return 'Electronic'
      } else if (this.product.category === 'fashion') {
        return 'Fashion'
      } else if (this.product.category === 'hobby') {
        return 'Hobby'
      } else if (this.product.category === 'automotive') {
        return 'Automotive'
      } else if (this.product.category === 'others') {
        return 'Others'
      }
      return ''
    }
  },
  created () {
    this.getDetailProduct()
  }
}
</script>
