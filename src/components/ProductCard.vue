<template>
  <div class="card background-card m-3" style="width: 18rem; border:none;">
        <img :src="product.image_url" class="card-img-top m-3" style="height:250px; width: auto;">
        <div class="card-body">
            <h2 class="card-title" style="text-align: left;">{{product.name}}</h2>
            <p class="card-text h4" style="font-family: 'Baloo 2', cursive; color: grey;">{{formatMoney(product.price)}}</p>
            <button class="btn btn-link h3" style="text-decoration:none; text-align: right; color: black;">Add To Cart</button >
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  methods: {
    formatMoney (amount) {
      const price = 'Rp ' + parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')
      return price
    }
  },
  props: {
    product: Object
  }
}
</script>

<style>
.card-title{
    font-family: 'Amiri', serif;
}
</style>
