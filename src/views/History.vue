<template>
    <div class="container">
        <div class="row-cols-md-2">
             <div class="mt-4 mx-auto shadow-lg p-5 mb-5 bg-white rounded">
                <h2 class="mb-4">Transaction History</h2>
                <b-card v-for="cart in carts" :key="cart.id"  class="mb-5">
                    <b-row>
                    <b-col md="6">
                        <b-card-img :src="cart.image_url " alt="Image"></b-card-img>
                    </b-col>
                    <b-col md="6">
                        <b-card-title>Invoice : {{new Date(cart.updatedAt).getTime()}}</b-card-title>
                        <b-card-text>
                        <h5> Product: </h5> {{cart.name}}
                        <h5> Amount: </h5> {{cart.quantity}}
                        <h5> Price: </h5> {{cart.totalPrice | rupiah}}
                        <h5> Date Purchased: </h5> {{new Date(cart.updatedAt).toDateString()}}
                        </b-card-text>
                    </b-col>

                    </b-row>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import { rupiah } from '../filters'

export default {
  name: 'History',
  computed: {
    carts () {
      return this.$store.state.sold
    }
  },
  filters: {
    rupiah
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style>

</style>
