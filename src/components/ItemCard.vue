<template>
  <div id="item-card" class="col s4">
    <div class="card medium z-depth-2 hoverable">
      <div class="card-image">
        <img :src="item.imageUrl">
      </div>
      <div id="item-details" class="card-content">
        <span class="card-title">{{ item.name }}</span>
        <h5>Rp {{ price }}</h5>
        <button class="waves-effect waves-light btn" @click.prevent="getDetails(item.id)">Order</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: Object
  },
  computed: {
    price () {
      return this.item.price.toLocaleString('id')
    }
  },
  methods: {
    getDetails (itemId) {
      this.$router.push(`/items/${itemId}`)
    }
  }
}
</script>

<style scoped>
  #item-details {
    max-height: 60%;
  }
</style>
