<template>
  <div class="showpage">
    <Navbar></Navbar>
    <div v-if="!isLoading" class="dashboard">
      <h2>CATALOG</h2>
      <div class="row">
        <ProductCard
         v-for="product in products"
         :key="product.id"
         :product="product">
        </ProductCard>
      </div>
    </div>
    <div v-else>
        <Loading></Loading>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import ProductCard from '../components/ProductCard.vue'
import Loading from '../components/Loading'
export default {
  components: {
    Navbar,
    ProductCard,
    Loading
  },
  created () {
    this.$store.dispatch('getProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style>
  .showpage {
    width: 100% !important;
    margin: 2vh;
    padding: 2vh;
  }

  .dashboard {
    width: 100% !important;
    margin: 2vh;
    padding: 2vh;
  }

  h2 {
    text-align: center;
  }
  .row {
    /* width: 65% !important; */
    width: 100% !important;
    margin:1vh;
    /* left:25%;
    right:0; */
    display: flex;
    padding:1vh;
    justify-content: center;

  }
</style>
