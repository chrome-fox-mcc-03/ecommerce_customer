<template>
<div>
  <div class="home container">
    <products />
  </div>
</div>
</template>
<script>
import Products from './Products.vue'

export default {
  name: 'Home',
  components: {
    Products
  }
}
</script>
