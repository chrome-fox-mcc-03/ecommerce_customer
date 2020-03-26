<template>
  <div class="cart d-flex justify-content-around">
    <loading :active.sync="$store.state.isLoading"
      :is-full-page="true"></loading>
    <div id='example-3'>
      <div v-for="(cart, i) in $store.state.carts" :key="i" class="card mb-3" style="max-width: 700px;">
        <div class="d-flex item-align-center">
          <div class="card-body">
            <input type="checkbox" @change="addTotal(cart.quantity, cart.Product.price)" :id="cart.id" :value="cart.id" v-model="checkedCarts">
          </div>
          <div class="">
            <img style="height: 100px; width:70px" :src="cart.Product.image_url" class="card-img" alt="...">
          </div>
          <div class="">
            <div class="card-body">
              <p class="card-title"><b>{{ cart.Product.name }}</b></p>
              <p class="card-text">Rp {{ cart.Product.price }}</p>
            </div>
          </div>
          <div class="card-body">
            <input v-if="changeQtt === cart.id"
            v-model="quantity"
            type="text" placeholder="Quantity">
            <p v-else>Quantity:  {{ cart.quantity }}</p>
            <div v-if="changeQtt === cart.id" >
              <br>
              <button @click.prevent="editQtt(cart.id)" class="btn btn-secondary btn-sm mr-3">Save</button>
            </div>
            <div v-else>
              <button @click.prevent="deleteCart(cart.id)" class="btn btn-dark btn-sm mr-3">Delete</button>
              <button @click.prevent="change(cart.id, cart.quantity)" class="btn btn-secondary btn-sm mr-3">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div style="height: 200px;width:300px;border-radius:30px; box-shadow: 0px 0px 2px 2px grey;padding: 20px">
        <h3 class="d-flex justify-content-center"><b>Cart Reviews</b></h3>
        <br>
        <div class="d-flex justify-content-between">
          <p style="color:grey">Total Price</p>
          <p><b>Rp {{ totalPrice }}</b></p>
        </div>
        <button style="width: 260px" class="btn btn-secondary">Purchase</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      checkedCarts: [],
      totalPrice: 1,
      changeQtt: '',
      quantity: 0
    }
  },
  components: {
    Loading
  },
  methods: {
    addTotal (qtt, price) {
      this.totalPrice += (Number(qtt) * Number(price))
    },
    change (id, qtt) {
      this.changeQtt = id
      this.quantity = qtt
    },
    editQtt (id) {
      this.$store.dispatch('editQtt', { quantity: this.quantity, id })
      this.changeQtt = ''
    },
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
    }
  },
  created () {
    this.$store.dispatch('getCart')
  }
}
</script>

<style>
.cart {
  margin-left: 30px;
  margin-right: 30px;
}
</style>
