<template>
  <div class="carts">
    <h2 style="text-align: left">Carts</h2>
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Qty</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <cart
          v-for="(cart, index) in carts"
          :key="index"
          :no="index"
          :cart="cart"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import Cart from '../components/Cart'
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
  components: {
    Cart
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  methods: {
    fetchCarts () {
      this.$store.dispatch('getCarts')
        .then((result) => {
        }).catch((err) => {
          Toast.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    }
  },
  created () {
    this.fetchCarts()
  }
}
</script>

<style>

</style>
