<template>
  <div class="catalog-space">
    <h3 class="mt-2 mb-3">detail</h3>
    <div class="card">
      <div class="img-shoes" @click="redirToDetail(shoe.id)">
        <img :src="`${shoe.image_url}`" class="card-img-top" alt="Shoes-Img">
      </div>
      <h2>dddddetail</h2>
      {{ shoe }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoesDetail',
  data () {
    return {
      shoe: {}
    }
  },
  created () {
    this.$store.dispatch('findOneShoes', this.$route.params.id)
      .then(({ data }) => {
        console.log(data)
        this.shoe = data
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }
}
</script>

<style lang="scss">
.detail {
  width: 100%;
  height: 100%;
  background-color: lightcoral;
}
</style>
