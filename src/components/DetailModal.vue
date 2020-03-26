<template>
<div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="detailModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="detailModalTitle">{{ productDetail.name }}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" style="color: #faf4f4;">&times;</span>
        </button>
      </div>
      <div class="modal-body d-flex justify-content-around align-items-center flex-row">
        <div>
          <img :src="productDetail.image_url" :alt="productDetail.name" style="width: 20rem; border-radius: 3px;">
        </div>
        <div id="detail-words" class="d-flex flex-column justify-content-sm-around align-items-center">
          <p>Price: {{ productDetail.price }}</p>
          <p>Stock: {{ productDetail.stock }}</p>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button @click="buy(productDetail.id)" class="btn btn-primary" data-dismiss="modal">Buy</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    productDetail () {
      return this.$store.state.productDetail
    }
  },
  methods: {
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
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    }
  }
}
</script>

<style>
.modal-header, .modal-footer {
  background-color: #000839;
  color: #ffa41b;
}
.modal-body {
  background-color: #faf4f4;
}
#detail-words {
  color: #005082;
  font-weight: bold;
}
</style>
