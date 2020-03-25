<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'detailProduct',
  created () {
    this.$store.dispatch('getProduct', this.$route.params.id)
    .then(({ data }) => {
        name = data.name
        price = data.price
        stock = data.stock
        image = data.image
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
</style>