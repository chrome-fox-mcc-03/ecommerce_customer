<template>
  <div>
    <div class="image">
      <img :src="product.image_url">
    </div>
    <div class="named">
      <p>{{product.name}}</p>
      <p>{{product.price | currencyFormat}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    product: Object
  },
  filters: {
    currencyFormat: function (val) {
      return 'Rp. ' + val.toLocaleString('Id')
    }
  }
}
</script>

<style>
  .image {
    width: 100%;
  }
  .image img {
    width: 100%;
    height: 293px;
  }
</style>
