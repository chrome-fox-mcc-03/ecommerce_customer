<template>
  <div class="cart mt-5 pt-4 mb-5 pb-4 d-flex flex-column align-items-center">
        <h2 class="display-6 mt-5 " style="font-size:26px; font-weight:bold">Cart</h2>
        <p class="display-6 mt-5 " style="font-size:26px; font-weight:bold" v-if="!cartDataOrdered[0]">Your cart is empty, start shopping!</p>
        <table class="table" style="width: 70rem">
        <thead>
        </thead>
        <tbody>
            <tr v-for="(product, i) in cartDataOrdered"
            :key="i">
                <td>
                    <b-img :src="product.img_url" style="height:auto; width: 210px"></b-img>
                </td>
                <td>
                    <p style="font-weight: bold;">{{product.name}}</p>
                    <p>{{product.description}}</p>
                    <small>ordered:</small>
                    <p>{{dateParsed(product.CartProduct.createdAt)}}</p>
                </td>
                <td>{{priceParsed (product.price)}}</td>
                <td>
                    <small>quantity:</small>
                    <p>{{product.CartProduct.quantity}}</p>
                </td>
                <td><b-button-group size="sm">
                    <b-button @click="addQ(product.id, product.CartProduct.quantity)">+</b-button>
                    <b-button v-if="product.CartProduct.quantity !== 1" @click="subQ(product.id)">-</b-button>
                    <b-button variant="danger" @click="deleteCartProduct(product.id)"><img src="../assets/trash.png" alt="" srcset="" style="width:16px;height:16px"></b-button>
                    </b-button-group>
                </td>
            </tr>
            <tr>
            <th scope="col" colspan="2">Total Price</th>
            <th scope="col" colspan="2">{{priceParsed(totalPrice)}}</th>
            <th scope="col" colspan="1">
                <b-button variant="success" @click="checkout">Check out</b-button>
            </th>
            </tr>
        </tbody>
        </table>
      <loading-now v-if="nowLoading"></loading-now>
  </div>
</template>

<script>
import LoadingNow from '../components/LoadingNow'
export default {
  created () {
    this.$store.dispatch('fetchCart')
  },
  computed: {
    nowLoading () {
      return this.$store.state.nowLoading
    },
    cartDataOrdered () {
      return this.$store.state.cart
    },
    totalPrice () {
      let total = 0
      if (this.$store.state.cart[0]) {
        this.$store.state.cart.forEach(el => {
          total += el.price * el.CartProduct.quantity
        })
        return total
      } else {
        return 0
      }
    }
  },
  methods: {
    priceParsed (price) {
      const priceTemp = String(price).split('')
      let priceParsed = ''
      for (let i = 0; i < priceTemp.length; i++) {
        if ((priceTemp.length - i) % 3 === 0 && (priceTemp.length - i) !== priceTemp.length) priceParsed += `.${priceTemp[i]}`
        else priceParsed += `${priceTemp[i]}`
      }
      return `Rp. ${priceParsed}`
    },
    dateParsed (date) {
      const d = new Date(date).getDate()
      const m = new Date(date).getMonth() + 1
      const y = new Date(date).getFullYear()
      return (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y
    },
    addQ (id, quantity) {
      this.$store.dispatch('editQuantity', { id, num: 1, quantity })
        .then(_ => this.$store.dispatch('fetchCart'))
    },
    subQ (id) {
      this.$store.dispatch('editQuantity', { id, num: -1 })
        .then(_ => this.$store.dispatch('fetchCart'))
    },
    deleteCartProduct (id) {
      this.$store.dispatch('deleteCartProduct', { id })
        .then(_ => this.$store.dispatch('fetchCart'))
    },
    checkout () {
      this.$store.dispatch('checkout')
        .then(_ => this.$router.push({ path: '/' }))
    }
  },
  components: {
    LoadingNow
  }
}
</script>

<style>

</style>
