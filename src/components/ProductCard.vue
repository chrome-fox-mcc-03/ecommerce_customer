<template>
  <div class>
    <v-hover v-slot:default="{ hover }" close-delay="200">
      <v-card :loading="loading" class="mx-auto my-5" max-width="374" :elevation="hover ? 16: 2">
        <v-img height="200" :src="product.image_url"></v-img>

        <v-card-title>{{product.name}}</v-card-title>

        <v-card-text>
          <div class="my-4 subtitle-1">
            <h4>Stock : {{productStock}}</h4>
          </div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>{{productPrice}}</v-card-title>

        <v-card-actions>
          <v-btn
            color="teal"
            class="ml-auto"
            text
            @click="onAddToCart(product.id)"
            :disabled="!product.stock"
          >Add To Cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  props: {
    product: Object
  },
  data: () => ({
    loading: false,
    selection: 1,
    disableAddToCart: false
  }),

  methods: {
    onAddToCart (id) {
      if (!localStorage.access_token) {
        this.$router.push('/register')
        this.$store.commit('SET_ERROR', 'You Must Register First')
      }
      const cart = this.$store.state.carts.filter(el => el.ProductId === id)
      if (cart.length) {
        const payload = {
          id: cart[0].id,
          data: {
            status: cart[0].status,
            ProductId: cart[0].ProductId,
            quantity: cart[0].quantity + 1
          }
        }
        this.$store.commit('SET_LOADING', true)
        this.$store.dispatch('addItemToCart', payload)
          .then(() => {
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('STOP_ERROR')
            this.$store.commit('SET_SUCCESS', 'Success Add Item To Cart')
            this.$store.dispatch('fetchCarts')
            this.$router.push('/cart')
          })
          .catch(({ response }) => {
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('SET_ERROR', response.data)
            this.$store.commit('STOP_SUCCESS')
          })
      } else {
        const payload = {
          status: false,
          quantity: 1,
          ProductId: id
        }
        this.$store.dispatch('createNewCart', payload)
          .then(() => {
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('STOP_ERROR')
            this.$store.commit('SET_SUCCESS', 'Success Add Item To Cart')
            this.$store.dispatch('fetchCarts')
            this.$router.push('/cart')
          })
          .catch(({ response }) => {
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('SET_ERROR', response.data)
            this.$store.commit('STOP_SUCCESS')
          })
      }
    }
  },
  computed: {
    productStock () {
      if (this.product.stock === 0) {
        return 'Not Available'
      } else {
        const item = this.product.stock === 1 ? 'item' : 'items'
        return `${this.product.stock} ${item}`
      }
    },
    productPrice () {
      return `Rp${this.product.price.toLocaleString('id-ID', 'currency')}`
    }
  }
}
</script>
