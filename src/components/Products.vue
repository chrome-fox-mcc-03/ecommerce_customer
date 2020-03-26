<template>
  <div>
    <loading :active.sync="$store.state.isLoading"
      :is-full-page="true"></loading>
    <p>Category: <button @click.prevent="changeCategory('')" class="btn btn-secondary" >All</button> |  <button @click.prevent="changeCategory('adventure')" class="btn btn-secondary">Adventure</button> | <button @click.prevent="changeCategory('action')" class="btn btn-secondary">Action</button> | <button @click.prevent="changeCategory('comedy')" class="btn btn-secondary">Comedy</button> | <button @click.prevent="changeCategory('fantasy')" class="btn btn-secondary">Fantasy</button> | <button @click.prevent="changeCategory('horror')" class="btn btn-secondary">Horror</button> | <button @click.prevent="changeCategory('isekai')" class="btn btn-secondary">Isekai</button> | <button @click.prevent="changeCategory('mystery')" class="btn btn-secondary">Mystery</button> | <button @click.prevent="changeCategory('romcom')" class="btn btn-secondary">RomCom</button> | <button @click.prevent="changeCategory('sliceoflife')" class="btn btn-secondary">Slice of Life</button> | <button @click.prevent="changeCategory('sport')" class="btn btn-secondary">Sport</button></p>
    <div class="row container">
      <Product
      v-for="(product, i) in products" :key="i"
      :product="product"
      />
    </div>
  </div>
</template>

<script>
import Product from './Product'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      category: ''
    }
  },
  components: {
    Product,
    Loading
  },
  computed: {
    products () {
      if (this.category) {
        return this.$store.state.products.filter(product => {
          return product.genre === this.category
        })
      } else {
        return this.$store.state.products
      }
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

</style>
