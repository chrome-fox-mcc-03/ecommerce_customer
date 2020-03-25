<template>
  <div>
    <b-alert class="mt-4 text-wrap text-break" variant="success" :show="false">
      Test
    </b-alert>
    <div class="shop container-fluid">
      <b-overlay :show="$store.state.pageLoading" rounded="sm">
        <b-card-group columns>
          <product-card
            v-for="(item, i) in $store.state.products"
            :key="i"
            :item="item"
            :idx="i"
          ></product-card>
        </b-card-group>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import {
  BCardGroup,
  BOverlay,
  BAlert
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import ProductCard from '../components/ProductCard.vue'
export default {
  methods: {
    ...mapActions({
      fetchProduct: 'fetchFromShop',
      fetchCart: 'fetchCart'
    })
  },
  created () {
    this.fetchProduct()
    this.fetchCart()
    // console.log(this.$store.state.products)
  },
  components: {
    BCardGroup,
    BOverlay,
    BAlert,
    ProductCard
  }
}
</script>

<style scoped>
  .shop{
    height: 90vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #2d4659;
      box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  }
</style>
