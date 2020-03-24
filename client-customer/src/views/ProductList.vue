<template>
    <div>
        <h1 class="title is-2 has-text-black-ter is-family-secondary has-text-centered">Products</h1><br>

        <div class="columns">
  <div class="column"></div>
  <div class="column is-four-fifths">
<div class="columns is-multiline is-mobile">
  <div class="column is-one-quarter">
    <ProductCard/>
  </div>
    <div class="column is-one-quarter">
    <ProductCard/>
  </div>
    <div class="column is-one-quarter">
    <ProductCard/>
  </div>
    <div class="column is-one-quarter">
    <ProductCard/>
  </div>
    <div class="column is-one-quarter">
    <ProductCard/>
  </div>
    <div class="column is-one-quarter">
    <ProductCard/>
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
  components: {
    ProductCard
  }
}
</script>
