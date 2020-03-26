<template>
<div>
  <h1>Products</h1>
  <vue-progress-bar/>
  <div id="ProductCard">
  <Card class="Card" v-for="Product in Products" :key="Product.id" :Product="Product"/>
  {{Products.data}}
  </div>
  aaaa

</div>

</template>

<script>
import Card from '../components/ProductCard.vue'
export default {
  name: 'Product',
  data () {
    return {
      Products: this.$store.state.Products
    }
  },
  components: {
    Card
  },
  beforeCreate () {
  },
  created () {
    const token = localStorage.getItem('Access_Token')
    if (token !== null) {
      this.$store.dispatch('FetchProduct')
    } else {
      this.$toasted.show('Unauthorized, Please Login / Register First')
    }
  }
}
</script>

<style>
#ProductCard {
    margin-left: 5%;
    margin-right: 15%;
    padding: 2%;
    margin-bottom: 5%;
    background-color: teal;
    flex-direction: row;
    border: unset;
    border-width: 100px;
    border-color: teal;
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    overflow: scroll;
    position: absolute;
    width: 90vw;
    height: 80vh;
}
.Card {
  width: 20vw;
  height: 20vh;
}
</style>
