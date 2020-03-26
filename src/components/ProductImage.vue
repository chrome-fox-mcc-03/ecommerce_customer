<template>
  <div class="product-image2">
    <a href="#">
      <img class="pic-1" :src="imgUrl">
    </a>
    <ul class="social">
      <li><a data-tip="Quick View"><i class="fa fa-eye"></i></a></li>
      <!-- <li><a data-tip="Add to Wishlist"><i class="fa fa-shopping-bag"></i></a></li> -->
      <li><a data-tip="Add to Cart" @click.prevent="addToCart"><i class="fa fa-shopping-cart"></i></a></li>
    </ul>
    <a class="add-to-cart" @click.prevent="addToCart">Add to cart</a>
  </div>
</template>

<script>
export default {
  name: 'ProductImage',
  props: ['imgUrl', 'id'],
  methods: {
    addToCart () {
      this.$store.dispatch('addToCart', this.id)
    }
  }
}
</script>

<style>
.product-grid2 .add-to-cart{color:#fff;background-color:#404040;font-size:15px;text-align:center;width:100%;padding:10px 0;display:block;position:absolute;left:0;bottom:-100%;transition:all .3s; cursor: pointer;}
.product-grid2 .add-to-cart:hover{background-color:#3498db;text-decoration:none;color:#fff;}
.product-grid2:hover .add-to-cart{bottom:0}
</style>
