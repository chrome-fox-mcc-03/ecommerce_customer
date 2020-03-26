<template>
  <div class="home">
    <Navbar/>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ProductList/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ProductList from '@/components/ProductList.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    ProductList,
    Navbar
  }
}
</script>
