<template>
    <div>
      <h1 class="title is-2 has-text-black-ter is-family-secondary has-text-centered">Products</h1><br>
      <div class="columns">
        <div class="column"></div>
        <div class="column is-four-fifths">
          <div class="select is-rounded is-primary">
            <select v-model="selectedCategory">
                <option disabled value="">Filter by category</option>
                <option value="all">All Categories</option>
                <option value="fashion">Fashion</option>
                <option value="food and beverages">Food and Beverages</option>
                <option value="electronic">Electronic</option>
                <option value="hobby">Hobby</option>
                <option value="automotive">Automotive</option>
                <option value="others">Others</option>
            </select>
          </div>
        </div>
        <div class="column"></div>
      </div>
      <div class="columns">
        <div class="column"></div>
        <div class="column is-four-fifths">
          <div class="columns is-multiline is-mobile">
            <div v-for="product in products" :key="product.id" class="column is-one-quarter">
              <ProductCard :product="product" />
            </div>
          </div>
        </div>
        <div class="column"></div>
      </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'ProductList',
  data () {
    return {
      selectedCategory: ''
    }
  },
  components: {
    ProductCard
  },
  computed: {
    products () {
      if (this.selectedCategory === 'all' || this.selectedCategory === '') {
        return this.$store.state.products
      } else if (this.selectedCategory === 'food and beverages') {
        return this.$store.getters.getProductsCategory1
      } else if (this.selectedCategory === 'electronic') {
        return this.$store.getters.getProductsCategory2
      } else if (this.selectedCategory === 'fashion') {
        return this.$store.getters.getProductsCategory3
      } else if (this.selectedCategory === 'hobby') {
        return this.$store.getters.getProductsCategory4
      } else if (this.selectedCategory === 'automotive') {
        return this.$store.getters.getProductsCategory5
      } else if (this.selectedCategory === 'others') {
        return this.$store.getters.getProductsCategory6
      }
      return ''
    }
  }
}
</script>
