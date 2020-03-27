<template>
  <div>
    <Navbar/>
    <div>
      <CheckoutCard></CheckoutCard>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import CheckoutCard from '@/components/CheckoutCard.vue'
export default {
  name: 'Checkout',
  components: {
    Navbar,
    CheckoutCard
  },
  computed: {
    item: function () {
      return 'a'
    }
  },
  created () {
    this.$store.dispatch('getCart')
  }
}
</script>

<style>

</style>
