<template>
  <div class="m-2">
      <!-- {{cartItem}} -->
    <div class="card text-center">
        <div class="card-header h3">
            Shopping-Cart Checkout
        </div>
        <Loading v-if="isLoading"/>
        <div class="card-body">
            <div class="row">
                <div class="col-4">
                    <img :src="cartItem.Product.image_url" alt="product" style="height:150px; border:none; border-radius:10px">
                </div>
                <div class="col-8 m3">
                    <p class="card-text" style="font-size: 21px; color: #6e6b6b;">SubTotal : {{formatMoney(total(cartItem.Product.price, cartItem.amount))}}</p>
                    <p class="card-text" style="font-weight: 500;">Total : {{formatMoney(total(cartItem.Product.price, cartItem.amount))}}</p>
                    <button @click="checkout(cartItem.id)">Checkout!</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
import axiosCostumer from '../config'

export default {
  name: 'CheckoutCart',
  components: {
    Loading
  },
  methods: {
    formatMoney (amount) {
      const price = 'Rp ' + parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')
      return price
    },
    total (priceProduct, amount) {
      const total = priceProduct * amount
      return total
    },
    checkout (id) {
      // console.log('ini idnya cuy')
      // console.log(id)
      this.$store.commit('SET_LOADING', true)
      axiosCostumer({
        method: 'get',
        url: `/cart/${id}/transaction`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data)
          this.$router.push({ path: '/' })
          this.$vToastify.success(data.message)
        })
        .catch(({ response }) => {
          const { data } = response
          const { error } = data
          this.$vToastify.error(error)
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    }
  },
  computed: {
    cartItem () {
      return this.$store.state.cartItem
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.$store.dispatch('fetchCartItem', this.$route.params.id)
  },
  watch: {
    cartItem (val) {
      // console.log (val)
    }
  }
}
</script>

<style>

.card{
    border: none;
    font-family: 'Baloo 2', cursive;
}
.card-header{
    border: none;
    background-color: #dae1e0ab;
    font-weight: 700;
}
.card-body{
    background-color: #dae1e0ab;
    font-size: 25px;
}
button{
    background-color:  #1eb2a6ab;
    border: none;
    padding: 30px;
    padding-bottom: 8px;
    padding-top: 8px;
    font-size: 22px;
    color: whitesmoke;
}
</style>
