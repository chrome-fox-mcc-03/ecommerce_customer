<template>
  <div>
      <NavbarPanel/>
      <div class="m-3 p-3">
        <div class="m-3">
            <h2 class=" font-weight-bold">Shopping Cart</h2>
        </div>
        <div class="container m-3" style="font-family: 'Lora', serif;">
            <table class="table table-borderless m-3">
                <thead class="h4 font-weight-bold">
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Description</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody
                v-for="item in cart"
                :key="item.id"
                class="h4"
                >
                  <CartItem :item="item"/>
                </tbody>
            </table>
        </div>
        <!-- Button trigger modal -->
      </div>
  </div>
</template>

<script>
import NavbarPanel from '../components/NavbarPanel'
import CartItem from '../components/CartItem'

export default {
  name: 'Cart',
  components: {
    NavbarPanel,
    CartItem
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style>

</style>
