<template>
  <div>
      <jumbotron />
      <products />
  </div>
</template>

<script>
import Jumbotron from '../components/Jumbotron'
import Products from '../components/Products'

export default {
  name: 'Dashboard',
  components: {
    Jumbotron,
    Products
  }
}
</script>

<style>

</style>
