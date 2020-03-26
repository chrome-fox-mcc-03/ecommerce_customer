<template>
  <div class="product-content">
    <h3 class="title"><a href="#">{{name}}</a></h3>
    <span class="price">Stock: {{stock}} | Price: {{formattedPrice}}</span>
  </div>
</template>

<script>
export default {
  name: 'ProductContent',
  props: ['name', 'price', 'stock'],
  computed: {
    formattedPrice () {
      return this.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style>

</style>
