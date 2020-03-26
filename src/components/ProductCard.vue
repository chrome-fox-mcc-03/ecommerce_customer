<template>
  <div class="col-md-3 mt-5">
    <form @submit.prevent="addToCart">
      <figure class="card card-product">
        <div class="img-wrap"><img :src="product.image_url"></div>
        <figcaption class="info-wrap">
          <h4 class="title">{{product.name}}</h4>
          <div class="rating-wrap">
            <div class="label-rating">Stock: {{product.stock}}</div>
            <input type="number" v-model="quantity" min=0 :max="product.stock">
          </div>
        </figcaption>
        <div class="bottom-wrap">
          <div>
            <input type="submit" class="btn btn-sm btn-primary float-right" value="Order Now">
          </div>
          <div class="price-wrap h5">
            <span class="price-new">Rp. {{getPrice}}</span>
          </div>
        </div>
      </figure>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  data () {
    return {
      quantity: 0,
      selected: false
    }
  },
  props: ['product'],
  computed: {
    getPrice () {
      var str = this.product.price.toString().split('.')
      if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')
      }
      if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ')
      }
      return str.join('.')
    },
    CartId () {
      return this.$store.state.CartId
    },
    carts () {
      return this.$store.state.carts
    }
  },
  methods: {
    addToCart () {
      this.selected = true
      const payload = {
        id: this.product.id,
        CartId: this.CartId,
        quantity: this.quantity
      }
      if (this.carts.length > 0) {
        for (let i = 0; i < this.carts.length; i++) {
          if (this.carts[i].Product.id === this.product.id) {
            this.$toasted.error('Product Already in cart', {
              position: 'bottom-center'
            })
            break
          } else {
            this.$store.commit('SET_LOADING', true)
            this.$store.dispatch('addToCart', payload)
              .then(_ => {
                this.$toasted.success(`${this.product.name} has been added to cart!`)
                this.$store.dispatch('fetchCart')
                this.quantity = 0
              })
              .catch(err => {
                this.$toasted.error(err.response.data.message, {
                  position: 'bottom-center'
                })
              })
              .finally(_ => {
                this.$store.commit('SET_LOADING', false)
              })
            break
          }
        }
      } else {
        this.$store.dispatch('addToCart', payload)
          .then(_ => {
            this.$toasted.success(`${this.product.name} has been added to cart!`)
            this.$store.dispatch('fetchCart')
            this.quantity = 0
          })
          .catch(err => {
            this.$toasted.error(err.response.data.message, {
              position: 'bottom-center'
            })
          })
          .finally(_ => {
            this.$store.commit('SET_LOADING', false)
          })
      }
    }
  }
}

</script>

<style scoped>
.card-product .img-wrap {
  border-radius: 3px 3px 0 0;
  overflow: hidden;
  position: relative;
  height: 220px;
  text-align: center;
  object-fit: contain;
}

.card-product .img-wrap img {
  padding: 0;
  margin: 0;
  height: 367px;
  width: 100%;
  display: block;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-product .info-wrap {
  overflow: hidden;
  padding: 15px;
  border-top: 1px solid #eee;
}

.card-product .bottom-wrap {
  padding: 15px;
  border-top: 1px solid #eee;
}

.label-rating {
  margin-right: 10px;
  color: #333;
  display: inline-block;
  vertical-align: middle;
}

.card-product .price-old {
  color: #999;
}
</style>
