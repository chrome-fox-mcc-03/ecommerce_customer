<template>
  <tr>
    <td scope="row">{{number}}</td>
    <td>{{cart.Product.name}}</td>
    <td>{{cart.qty}}</td>
    <td>{{isPaid}}</td>
    <td>
      <div v-if="!cart.isPaid">
        <i @click="pay" class="far fa-money-bill-alt btn btn-primary"> Pay</i> |
        <i @click="deleteData" class="far fa-trash-alt btn btn-danger"> Cancel</i>
      </div>
    </td>
  </tr>
</template>

<script>
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
  props: ['no', 'cart'],
  computed: {
    isPaid () {
      const data = this.cart.isPaid
      if (data) {
        return 'Paid'
      } else {
        return 'Unpaid'
      }
    },
    number () {
      let data = Number(this.no)
      return ++data
    },
    id () {
      return this.cart.id
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
    },
    pay () {
      const payload = {
        id: this.id,
        isPaid: true
      }
      this.$store.dispatch('updateCart', payload)
        .then((result) => {
          this.fetchCarts()
        }).catch((err) => {
          Toast.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    deleteData  () {
      this.$store.dispatch('deleteCart', { id: this.id })
        .then((result) => {
          this.fetchCarts()
        }).catch((err) => {
          Toast.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    }
  }
}
</script>

<style>

</style>
