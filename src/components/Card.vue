<template>
  <div class="card-deck col-lg-3 col-md-6">
    <div class="card" style="width: 18rem;">
      <img :src="`${product.image}`" class="card-img-top" alt="Gambar" />
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">Price: Rp.{{ product.price }}</p>
        </div>
        <div id="foot" class="d-flex flex-row justify-content-between">
          <p class="card-text text-muted">Stock: {{ product.stock }}</p>
          <div class="d-flex">
            <div class="edit" @click="toEditPage(product.id)"><i class="far fa-edit"></i></div>
            <div class="delete" @click.prevent="deleteProduct(product.id)"><i class="far fa-trash-alt"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  methods: {
    toEditPage: function (id) {
      this.$router.push(`/product/edit/${id}`)
    },
    deleteProduct: function (id) {
      this.$store.dispatch('deleteProduct', id)
      this.$store.dispatch('fetchData')
    }
  }
}
</script>

<style>
.card-deck{
  margin-bottom: 30px;
}

#foot{
  margin-top: 20px;
}

.edit{
  margin-right: 5px;
}

.card img{
  transition: transform .5s ease;
}

.card img:hover{
  transform: scale(1.25)
}
</style>
