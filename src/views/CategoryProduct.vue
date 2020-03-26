<template>
  <div>
    <Navbar></Navbar>
    <ProductsCategory
      :products="products"
      ></ProductsCategory>
  </div>
</template>

<script>
import ProductsCategory from '../components/ProductsCategory'
import Navbar from '../components/Navbar'

export default {
  name: 'CategoryProduct',
  components: {
    ProductsCategory,
    Navbar
  },
  computed: {
    products () {
      const productsEachCategory = []
      this.$store.state.products.forEach(product => {
        if (product.CategoryId === +this.$route.params.id) {
          productsEachCategory.push(product)
        }
      })
      return productsEachCategory
    }
  }

}
</script>

<style>

</style>
