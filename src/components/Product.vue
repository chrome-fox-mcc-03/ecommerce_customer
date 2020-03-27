<template>
  <div class="col-md-3">
    <router-link
    :to="`/product/${product.id}`"
    >
      <div class="card mb-3 shadow-sm text-center">
        <div class="p-3">
          <img
            class="img-fluid"
            :src="`${product.image_url}`"
            alt=""
          />
        </div>
        <div class="card-body">
          <span class="text-capitalize"><b>{{ product.name }}</b></span>
          <p>Rp {{ product.price }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['product']
}
</script>

<style>
div.col-md-3 a:hover {
  text-decoration: none;
}
div.col-md-3 a {
  color:black
}
</style>
