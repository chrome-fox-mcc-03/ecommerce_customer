<template>
  <div class="dashboard">
    <Carousel/>
    <Category
    style="margin-top:30px"/>
    <Container
    :products="products"
    style="margin-top:30px"/>
    <div class="d-flex justify-content-center mb-5">
      <router-link to="/product" class="btn btn-secondary" >See More</router-link>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/Carousel'
import Category from '../components/Category'
import Container from '../components/Container'

export default {
  components: {
    Carousel,
    Category,
    Container
  },
  methods: {
  },
  created () {
    this.$store.dispatch('getProducts')
  },
  computed: {
    products () {
      return this.$store.state.products.slice(0, 12)
    }
  }
}
</script>
<style>
.dashboard {
  margin-left: 30px;
  margin-right: 30px;
}
</style>
