<template>
<div class="card">
  <!-- {{ product.image_url }} -->
  <b-card
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
  <b-card-img
    :src="`${product.image_url}`"
    :alt="`${product.name}`"
    ></b-card-img>
    <b-card-text>
      <h5> {{ product.name }}  </h5>
      <h6> {{ product.category }} </h6>
      <h6> IDR {{ product.price }} </h6>
    </b-card-text>
    <b-icon font-scale="5" class="btn" @click.prevent="add2Cart(product.id)" icon="plus-circle-fill" variant="primary"></b-icon>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'ProductCard',
  data () {
    return {}
  },
  props: ['product'],
  components: {},
  methods: {

    add2Cart (id) {
      this.$store.dispatch('add2Cart', id)
        .then(_ => {
          this.$toasted.success(('ITEM ADDED TO CART'), {
            position: 'bottom-center'
          })
          this.$store.dispatch('getProducts')
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          // console.log(error.response.data.error);
          this.$toasted.error(err.response.data.errors)
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })

      // this.$router.push({ name: 'ListProducts' })
    }
  },
  computed: {}
}
</script>

<style>

  .card {
    margin: 0 auto;
  }

  .btn {
    margin: 0.5vh;
    padding: 0.5vh;
  }
</style>
