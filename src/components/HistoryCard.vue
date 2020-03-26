<template>
  <tr>
    <td>{{cart.User.email}}</td>
    <td>{{cart.createdAt | moment("dddd, MMMM Do YYYY")}}</td>
    <td v-if="cart.isPaid" class="bg-primary">{{getStatus}}</td>
    <td v-else class="bg-danger">{{getStatus}}</td>
  </tr>
</template>

<script>
export default {
  name: 'HistoryCard',
  props: ['cart'],
  computed: {
    getStatus () {
      if (!this.cart.isPaid) {
        return 'Expired'
      } else {
        return 'Payment Completed'
      }
    }
  }
}

</script>

<style>

</style>
