<template>
  <div class="home">
    <Message />
    <Card />
    <AddToCart />
  </div>
</template>

<script>
// @ is an alias to /src
import Card from './components/List.vue'
import Message from '@/components/Message.vue'
import AddToCart from '@/components/Modal/AddToCart.vue'

export default {
  name: 'Home',
  components: {
    Card,
    Message,
    AddToCart
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCart')
    this.$store.dispatch('fetchHistory')
  }
}
</script>
