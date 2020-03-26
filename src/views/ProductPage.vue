<template>
  <div class="products">
    <p>Category: <button @click.prevent="changeCategory('')" class="btn btn-secondary" >All</button> |  <button @click.prevent="changeCategory('adventure')" class="btn btn-secondary">Adventure</button> | <button @click.prevent="changeCategory('action')" class="btn btn-secondary">Action</button> | <button @click.prevent="changeCategory('comedy')" class="btn btn-secondary">Comedy</button> | <button @click.prevent="changeCategory('fantasy')" class="btn btn-secondary">Fantasy</button> | <button @click.prevent="changeCategory('horror')" class="btn btn-secondary">Horror</button> | <button @click.prevent="changeCategory('isekai')" class="btn btn-secondary">Isekai</button> | <button @click.prevent="changeCategory('mystery')" class="btn btn-secondary">Mystery</button> | <button @click.prevent="changeCategory('romcom')" class="btn btn-secondary">RomCom</button> | <button @click.prevent="changeCategory('sliceoflife')" class="btn btn-secondary">Slice of Life</button> | <button @click.prevent="changeCategory('sport')" class="btn btn-secondary">Sport</button></p>
    <router-view
    :category="category"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      category: ''
    }
  },
  components: {
  },
  created () {
    this.$store.dispatch('getProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    changeCategory (category) {
      this.category = category
    }
  }
}
</script>

<style>
.products {
  margin-left: 30px;
  margin-right: 30px;
}
</style>
