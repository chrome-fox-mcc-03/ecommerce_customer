<template>
  <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2 shadow-sm" style="max-width: 18rem;">
    <div class="add-btn"><i class="fas fa-plus"></i></div>
    <img :src="`${shoe.image_url}`" class="card-img-top" alt="Shoes-Img">
    <div class="shoe-desc">
      <p class="">{{ shoe.name }}</p>
      <p class="">{{ shoe.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoeCard',
  props: ['shoe']
}
</script>

<style>

</style>
