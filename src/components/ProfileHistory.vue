<template>
  <div class="profile-history">
    <h1>HISTORY</h1>
    <table class="uk-table uk-table-middle uk-table-divider uk-overflow-auto ">
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Invoice</th>
          <th>Date Purchased</th>
        </tr>
      </thead>
      <tbody>
        <profile-paid v-for="(paidProduct, index) in paidProducts" :key="index" :paidProduct="paidProduct" :index="index+1"></profile-paid>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProfilePaid from './ProfilePaid'
export default {
  data () {
    return {
      paidProducts: []
    }
  },
  components: {
    ProfilePaid
  },
  methods: {
    getPaidProduct () {
      this.$store.dispatch('getCart')
        .then(response => {
          this.paidProducts = response.data.filter(product => product.isPaid)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {

        })
    }
  },
  created () {
    this.getPaidProduct()
  }
}
</script>

<style>
h1{
  text-align: center;
}

</style>
