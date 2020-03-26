<template>
<div id="prod-cont" class="d-flex flex-column">
  <div id="search-container" class="d-flex justify-content-lg-center align-items-center">
    <input v-model="filter" id="search-bar" type="text" placeholder="Search Product">
  </div>
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
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  components: {
    ContainerCards,
    DetailModal
  },
  created () {
    this.$store.dispatch('getProducts')
  },
  watch: {
    filter (val) {
      val = val.toLowerCase()
      console.log(val)
      this.products.forEach(el => {
        el.name = el.name.toLowerCase()
      })
      const filtered = this.products.filter(el => {
        if (el.name.includes(val)) {
          return el
        }
      })
      filtered.forEach(el => {
        el.name = el.name.split('')
        const firstWord = el.name[0].toUpperCase()
        el.name[0] = firstWord
        el.name = el.name.join('')
      })
      this.$store.commit('SET_FILTEREDPRODUCTS', filtered)
    }
  }
}
</script>

<style>
#prod-cont {
  height: 100%;
  width: 100%;
}
#search-bar {
  background-color: #fcf8f3 !important;
  border: none;
  border-bottom: royalblue 2px solid;
  text-align: center;
  width: 50%;
  height: 3rem;
  color: #005082;
  font-weight: bold;
}
#search-container {
  background-color: #faf4f4 !important;
  width: 100%;
  height: 15%;
  /* margin: 1rem; */
}
#product-container {
  background-color: #fcf8f3 !important;
  height: auto;
  width: 100%;
  overflow: scroll;
}
</style>
