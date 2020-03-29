<template>
      <div>
         <div class="col-md-12 text-dark text-center p-4 mt-4">
          <span class="h3 border border-dark p-2 font-weight-bold">Book Den</span>
          <p class="h1 font-weight-normal mt-4">Multipurpose Book For Better World</p>
          <p class="text-dark-50">Our books with conversion in mind. You read it for any purpose.</p>
      </div>

  <div class="container my-5">
    <Error></Error>
    <div class="row mb-3">
      <div class="col-md-9">
      </div>
      <div class="col-md-3">
        <ShoppingCart/>
      </div>
    </div>

    <div class="row">
      <Item
        v-for="item in forSale"
        :key="item.id"
        :invId="item.id"
        :name="item.name"
        :image="item.image_url"
        :price="item.price"
        :stock="item.stock"
       />
    </div>

  </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Item from './Item.vue'
import ShoppingCart from './ShoppingCart.vue'
import Error from './Error'

export default {
  name: 'HomePage',
  components: {
    Item,
    ShoppingCart,
    Error
  },
  data () {
    return {

    }
  },
  methods: {
    ...mapActions(['fetchProduct'])
  },
  computed: {
    forSale () {
      return this.$store.getters.forSale
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>

<style>

</style>
