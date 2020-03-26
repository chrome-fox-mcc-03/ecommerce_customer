<template>
  <div class="catalog-space">
    <Loader v-if="isLoading"/>
    <h3 class="mt-2 mb-3">collection</h3>
    <div class="row d-flex">
      <ShoeCard v-for="shoe in products" :key="shoe.id" :shoe="shoe"/>
    </div>
  </div>
</template>

<script>
import ShoeCard from '../components/ShoeCard.vue'
import Loader from '../components/Loader.vue'
export default {
  name: 'Catalog',
  components: {
    ShoeCard,
    Loader
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style>

</style>
