<template>
  <div class="products">
    <router-view
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
