<template>
  <div class="catalog-space">
    <h3 class="mt-2 mb-3">collection</h3>
    <div class="row d-flex">
      <ShoeCard v-for="shoe in products" :key="shoe.id" :shoe="shoe"/>
    </div>
  </div>
</template>

<script>
import ShoeCard from '../components/ShoeCard.vue'
export default {
  name: 'Catalog',
  components: {
    ShoeCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
