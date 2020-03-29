<template>
  <div class="cart">
    <sui-table class="table">
      <TableHeader />
      <TableBody v-for="({ id, Product, amount }, i) in listCarts"
        :key="i"
        :i="i"
        :id="id"
        :product="Product"
        :amount="amount"
      />
      <TableFooter />
    </sui-table>
    <DeleteCart />
  </div>
</template>

<script>
import TableHeader from './components/TableHeader.vue'
import TableBody from './components/TableBody.vue'
import TableFooter from './components/TableFooter.vue'
import DeleteCart from '@/components/Modal/DeleteCart.vue'

export default {
  name: 'TableListCart',
  computed: {
    listCarts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
    if (this.listCarts.length === 0) {
      this.$router.push({ path: '/' })
    }
    this.$store.commit('SET_ISMESSAGE')
  },
  components: {
    TableHeader,
    TableBody,
    TableFooter,
    DeleteCart
  }
}
</script>
