<template>
  <div id="featured" class="container">
    <div class="row">
      <div class="col s10 offset-s1">
        <h3>Featured Items</h3>
        <ItemCard
          v-for="item in featured"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from '../components/ItemCard'
export default {
  name: 'Featured',
  components: {
    ItemCard
  },
  computed: {
    featured () {
      const items = this.$store.state.items
      const featured = []
      if (this.$store.state.items.length) {
        for (let i = 0; i < 3; i++) {
          featured.push(items[i])
        }
      }
      return featured
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchItems')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
