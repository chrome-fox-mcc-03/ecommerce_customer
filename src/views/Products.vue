<template>
<div class="d-flex flex-column">
  <div id="search-container">
    <input id="search-bar" type="text" placeholder="Search Product">
  </div>
  <hr>
  <div id="product-container">
    <container-cards/>
  </div>
  <detail-modal/>
</div>
</template>

<script>
import ContainerCards from '../components/ContainerCards.vue'
import DetailModal from '../components/DetailModal.vue'
export default {
  components: {
    ContainerCards,
    DetailModal
  },
  created () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style>
#search-bar {
  width: 50vw;
  height: 3rem;
}
#search-container {
  width: 100vw;
  height: 40vh;
}
#product-container {
  height: auto
}
</style>
