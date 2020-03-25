<template>
<div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="detailModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="detailModalTitle">{{ productDetail.name }}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body d-flex justify-content-around align-items-center flex-row">
        <div>
          <img :src="productDetail.image_url" :alt="productDetail.name" style="width: 10rem">
        </div>
        <div>
          <p>Price: {{ productDetail.price }}</p>
          <p>Stock: {{ productDetail.stock }}</p>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <a @click="buy(productDetail.id)" class="btn btn-primary" data-dismiss="modal">Buy</a>
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
    }
  }
}
</script>

<style>

</style>
