<template>
  <div class="products">
    <h2 style="text-align: left">Products</h2>
    <div class="row">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"/>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
  methods: {
    fetchProduct () {
      this.$store.dispatch('getProducts')
        .then((result) => {
        }).catch((err) => {
          Toast.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    products () {
      return this.$store.state.products
    }
  },
  components: {
    ProductCard
  },
  created () {
    this.fetchProduct()
  }
}
</script>

<style>

</style>
