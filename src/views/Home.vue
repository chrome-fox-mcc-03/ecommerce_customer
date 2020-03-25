<template>
<div>
  <ecommerce-navbar></ecommerce-navbar>
  <router-view></router-view>
</div>
</template>

<script>
// @ is an alias to /src
import EcommerceNavbar from '../components/EcommerceNavbar'
export default {
  name: 'Home',
  components: {
    EcommerceNavbar
  },
  created () {
    this.$store.dispatch('fetchProduct')
  }
}
</script>
