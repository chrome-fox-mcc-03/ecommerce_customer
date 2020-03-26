<template>
  <div class="card background-card m-3" style="width: 18rem; border:none;">
            <!-- {{product}} -->
        <img :src="product.image_url" class="card-img-top m-3" style="height:250px; width: auto;">
        <div class="card-body">
            <h2 class="card-title" style="text-align: left;">{{product.name}}</h2>
            <p class="card-text h4" style="font-family: 'Baloo 2', cursive; color: grey;">{{formatMoney(product.price)}}</p>
            <div class="progress">
              <div v-if="product.stock > 25" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" v-bind:style="{width: product.stock +'%'}" aria-valuemin="0" aria-valuemax="100">{{product.stock}}</div>
              <div v-if="product.stock <= 25" class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" v-bind:style="{width: product.stock +'%'}" aria-valuemin="0" aria-valuemax="100">{{product.stock}}</div>
            </div>
            <button @click="add(product.id)" class="btn btn-link h3" style="text-decoration:none; text-align: right; color: black;">Add To Cart</button >
        </div>
    </div>
</template>

<script>
import axiosCostumer from '../config/index'

export default {
  name: 'ProductCard',
  methods: {
    formatMoney (amount) {
      const price = 'Rp ' + parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')
      return price
    },
    add (id) {
      this.$store.commit('SET_LOADING', true)
      axiosCostumer({
        method: 'post',
        url: '/cart',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          ProductId: id
        }
      })
        .then(({ data }) => {
          this.$vToastify.success('Success add to your shopping cart!')
          this.$store.dispatch('fetchProducts')
        })
        .catch(({ response }) => {
          const { data } = response
          const { error } = data
          this.$vToastify.error(error)
        })
        .finally(() => {
          this.$store.commit('SET_LOADING', false)
        })
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
