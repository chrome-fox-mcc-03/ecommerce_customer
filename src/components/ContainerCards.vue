<template>
<div class="row row-cols-3 row-cols-md-3">
  <div v-for="product in products" :key="product.id" class="card d-flex flex-wrap flex-row justify-content-center align-items-center">
    <img :src="product.image_url" class="card-img-top" :alt="product.name" style="width: 10rem">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <a @click="buy(product.id)">Buy</a>
      <br>
      <a @click="productDetail(product.id)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailModal">
        Detail
      </a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    productDetail (id) {
      this.$store.dispatch('getDetail', id)
    },
    buy (id) {
      this.$store.dispatch('assignCart')
      this.$store.dispatch('getBuy', id)
        .then(result => {
          this.$store.commit('SET_PRODUCTBUY', result.data)
          this.$router.push({ name: 'Buy' })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style>
/* .card{
  margin: 1px
} */
</style>
