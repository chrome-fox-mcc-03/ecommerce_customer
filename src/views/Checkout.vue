<template>
  <div>
    <h1>Checkout</h1>
    <table class="table table-hover">
      <caption class="text-right h3">
        <b>Total: {{ cartTotal | currencyFormat}}</b><br>
      </caption>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Image</th>
          <th scope="col" class="text-center">Item</th>
          <th scope="col" class="text-center">Qty</th>
          <th scope="col" class="text-right">Price</th>
          <th scope="col" class="text-right">Sub-total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.product.id">
          <!-- <div v-if="item.qty > 0"> -->
            <td v-if="item.qty > 0">
              <div class="btn-group">
                <button class="btn btn-info" @click="addProduct(index)">+</button>
                <button class="btn btn-outline-info" @click="minusProduct(index)">-</button>
              </div>
            </td>
            <td class="text-center" v-if="item.qty > 0">
              <div class="gambarMe" >
                <img class="gambarku" :src="item.product.image_url">
              </div>
            </td>
            <th scope="row" v-if="item.qty > 0">{{ item.product.name }}</th>
            <th class="text-center" v-if="item.qty > 0">{{ item.qty }}</th>
            <th class="text-right" v-if="item.qty > 0">{{ item.product.price | currencyFormat}}</th>
            <th class="text-right" v-if="item.qty > 0">{{ item.product.price * item.qty | currencyFormat}}</th>
          <!-- </div> -->
        </tr>
      </tbody>
    </table>
    <button class="btn btn-info text-right"  @click="checkoutProcess">Checkout</button>
  </div>
</template>

<script>

export default {
  name: 'Checkout',
  methods: {
    addProduct (i) {
      const cart = this.$store.state.cart
      cart[i].qty++
      const payload = {
        cart: cart[i],
        productId: cart[i].product.id
      }
      this.$store.dispatch('updateQtyProduct', payload)
    },
    minusProduct (i) {
      const cart = this.$store.state.cart
      if (cart[i].qty > 1) {
        cart[i].qty--
        const payload = {
          cart: cart[i],
          productId: cart[i].product.id
        }
        this.$store.dispatch('updateQtyProduct', payload)
      } else {
        const payload = {
          cart: cart[i],
          productId: cart[i].product.id
        }
        this.$store.dispatch('deleteItemFromCart', payload)
      }
    },
    checkoutProcess () {
      this.$store.dispatch('checkoutAllItems', this.$store.state.cart)
        .then(({ data }) => {
          this.$vToastify.success('Checkout Is Successfully')
          this.$store.dispatch('fetchCart')
          this.$store.dispatch('fetchProduct')
          setTimeout(() => {
            this.$router.push('/dashboard')
          }, 5000)
        })
        .catch(({ response }) => {
          this.$vToastify.error('Sorry, Stock is not already exists now, Please checkout again!')
          setTimeout(() => {
            this.$router.push('/dashboard')
          }, 5000)
        })
    }
  },
  filters: {
    currencyFormat: function (val) {
      return 'Rp. ' + val.toLocaleString('Id')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    cartTotal () {
      let sum = 0
      const cart = this.$store.state.cart
      for (let i = 0; i < cart.length; i++) {
        sum = sum + (cart[i].product.price * cart[i].qty)
      }
      return sum
    }
  },
  watch: {
    cart: function (val) {
      return this.$store.state.cart
    },
    cartTotal: function (val) {
      return val
    }
  }
}
</script>

<style scoped>
  .gambarMe img {
    width: 50px;
    height: 50px;
  }
</style>
