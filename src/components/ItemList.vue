<template>
  <div id="ItemList">
    <CategoryTabs />
    <div class="row">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import CategoryTabs from '../components/CategoryTabs'
import ItemCard from '../components/ItemCard'
export default {
  name: 'ItemList',
  components: {
    CategoryTabs,
    ItemCard
  },
  computed: {
    items () {
      return this.$store.getters.getItemsByCategory
    }
  },
  created () {
    this.$store.dispatch('fetchItems')
    this.$store.commit('SET_FILTER_ID', null)
  }
}
</script>

<style>

</style>
