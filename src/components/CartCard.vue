<template>
  <div class="card">
    <!-- {{ product.image_url }} -->
    <b-card img-top tag="article" style="max-width: 20rem;" class="mb-2">
      <b-card-img :src="`${cart.Product.image_url}`" :alt="`${cart.Product.name}`"></b-card-img>
      <b-card-text>
        <h5>{{ cart.Product.name }}</h5>
        <h6>{{ cart.Product.category }}</h6>
        <h6>UNIT PRICE: IDR {{ cart.Product.price }}</h6>
        <h6>QTY: {{ cart.total_qty }}</h6>
        <h6>IDR {{ subtotal }}</h6>
        <h4>CHECKOUT STATUS: {{ cart.checked_out }}</h4>
        <h5 v-if="cart.checked_out">PAID: {{ cart.updatedAt }} </h5>
      </b-card-text>
      <div class="option-btns" v-if="!cart.checked_out">
        <b-icon font-scale="2" @click.prevent="addQty(cart.id)" icon="chevron-up" variant="info"></b-icon>
        <b-icon font-scale="2" @click.prevent="reduceQty(cart.id)" icon="chevron-down" variant="info"></b-icon>
        <b-button @click.prevent="checkout(cart.id)" variant="success">CHECKOUT</b-button>
        <b-button @click.prevent="deleteCart(cart.id)" variant="danger">DELETE CART</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  data () {
    return {}
  },
  props: ['cart'],
  components: {},
  methods: {
    addQty (id) {
      console.log('>>> ADD PRODUCT TO CART')
      console.log('CART ID IS')
      console.log(id)
      this.$store
        .dispatch('addQty', id)
        .then(response => {
          console.log('ADDED 1 PRODUCT TO CART')
          console.log(response)
          // this.$router.push('/catalog')
          this.$store.dispatch('getCarts')
          this.$store.commit('ADD_TOTAL', this.subtotal)
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          const errArr = err.response.data.errors
          console.log(err.response.data.errors)
          errArr.forEach(el => {
            this.$toasted.error(el)
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    },

    reduceQty (id) {
      console.log('>>> REMOVE TO CART')
      this.$store
        .dispatch('reduceQty', id)
        .then(response => {
          console.log('REMOVED 1 PRODUCT FROM CART')
          console.log(response)
          // this.$router.push('/catalog')

          // IF DELETED CART
          if (response.data === 1) {
            this.$toasted.success('CART DELETED')
          }
          this.$store.dispatch('getCarts')
          this.$store.commit('SUBSTRACT_TOTAL', this.subtotal)
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          const errArr = err.response.data.errors
          console.log(err.response.data.errors)
          errArr.forEach(el => {
            this.$toasted.error(el)
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    },

    deleteCart (id) {
      console.log('DELETING CART')
      this.$store
        .dispatch('deleteCart', id)
        .then(_ => {
          this.$router.push('/catalog')
          this.$store.dispatch('getCarts')
          this.$store.commit('SUBSTRACT_TOTAL', this.subtotal)
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          const errArr = err.response.data.errors
          console.log(err.response.data.errors)
          errArr.forEach(el => {
            this.$toasted.error(el)
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    },

    checkout (id) {
      console.log('CHECKOUT CART')
      this.$store.dispatch('checkout', id)
        .then(_ => {
          // this.$store.commit('SET_IS_PAID', true)
          this.$router.push('/txnlog')
          this.$store.dispatch('getCarts')
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          const errArr = err.response.data.errors
          console.log(err.response.data.errors)
          errArr.forEach(el => {
            this.$toasted.error(el)
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    }
  },
  computed: {
    subtotal () {
      return this.cart.Product.price * this.cart.total_qty
    }
  }
}
</script>

<style>
.card {
  margin: 0 auto;
}

.btn {
  margin: 0.5vh;
  padding: 0.5vh;
}

.option-btns {
  margin: 0.5vh;
  padding: 0.5vh;
}
</style>
