<template>
<div id="cards-container" class="row row-cols-3 row-cols-md-3">
  <div v-for="product in products" :key="product.id" class="card d-flex flex-wrap flex-row justify-content-around align-items-center">
    <img :src="product.image_url" class="card-img-top" :alt="product.name" style="width: 10rem">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <hr class="mb-2">
      <div class="d-flex flex-row justify-content-lg-around align-items-center">
        <a class="option" @click="buy(product.id)">Buy</a>
        <br>
        <a @click="productDetail(product.id)" type="button" class="option" data-toggle="modal" data-target="#detailModal">
          Detail
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    products () {
      return this.$store.state.filteredProducts
    }
  },
  created () {
    this.$store.dispatch('assignCart')
  },
  methods: {
    productDetail (id) {
      this.$store.dispatch('getDetail', id)
    },
    buy (id) {
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
cards-container {
  background-color: #faf4f4 !important;
}
hr {
  margin: 0px !important;
  padding: 0px !important;
}
.option {
  color: #000839 !important;
  font-weight: bold;
  cursor: pointer;
}

.option:hover {
  color: #ffa41b !important;
}

.card {
  background-color: #faf4f4 !important;
}
</style>
