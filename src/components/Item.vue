<template>
   <div class="col-md-2 mb-5">
    <div class="card h-100">
      <img :src='image' :alt="name" class="card-img-top img-fluid">
      <div class="card-body p-2 d-flex flex-column align-items-center justify-content-center">
        <h6 class="card-title">{{ name.split(':')[0] }} </h6>
        <div class="card-text">Price: {{ price | rupiah}}</div>
        <div class="card-text">Stock: {{ stock }}</div>
        <b-spinner small label="Small Spinner" v-if="loading" class="mt-auto"></b-spinner>
        <b-alert
          :show="dismissCountDown"
          variant="success"
          @dismiss-count-down="countDownChanged"
          v-if="success"
        >
        Added to cart <i class="fa fa-check"></i>
        </b-alert>
        <button class="btn btn-block btn-primary active mt-auto" @click="addToCart(invId, price)">Add to cart <i class="fa fa-shopping-cart"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { rupiah } from '../filters'

export default {
  name: 'Item',
  data () {
    return {
      dismissSecs: 3,
      dismissCountDown: 3,
      success: false,
      loading: false
    }
  },
  filters: {
    rupiah
  },
  props: ['invId', 'name', 'image', 'price', 'stock'],
  methods: {
    ...mapActions(['fetchCart']),
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    addToCart (invId, price) {
      this.loading = true
      const data = {
        ProductId: invId,
        totalPrice: price
      }
      if (localStorage.token) {
        this.$store.dispatch('addToCart', data)
          .then(result => {
            this.fetchCart()
            this.loading = false
            this.success = true
            this.dismissCountDown = this.dismissSecs
          })
          .catch(err => {
            this.$store.state.error = err
            this.loading = false
          })
      } else {
        this.$router.push('login')
      }
    }
  },
  created () {
    if (localStorage.token) {
      this.fetchCart()
    }
  }

}
</script>

<style>

</style>
