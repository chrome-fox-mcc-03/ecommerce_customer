<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'ClientCustomer',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
