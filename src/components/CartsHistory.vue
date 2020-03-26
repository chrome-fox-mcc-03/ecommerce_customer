<template>
  <div id="carts-history" class="row">
    <div class="col s12">
      <h5 v-if="!histories.length">No payment history yet</h5>
      <table v-else class="highlight responsive-table">
        <thead>
          <tr>
            <th></th>
            <th>Payment Date</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(history, i) in histories"
            :key="i"
          >
            <td><img :src="history.Item.imageUrl" alt="picture"></td>
            <td>{{ date(history.updatedAt) }}</td>
            <td>{{ history.Item.name }}</td>
            <td>{{ history.quantity }}</td>
            <td>Rp {{ price(history.quantity, history.Item.price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartsHistory',
  computed: {
    histories () {
      return this.$store.state.histories
    }
  },
  methods: {
    price (quantity, itemPrice) {
      const price = quantity * itemPrice
      return price.toLocaleString('id')
    },
    date (dbDate) {
      return new Date(dbDate).toLocaleDateString('id')
    }
  },
  created () {
    this.$store.dispatch('fetchHistories')
      .then(() => {})
      .catch(err => {
        if (err.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          this.$router.push('/')
        }
      })
  }
}
</script>

<style>
    #carts-history img {
    max-width: 10vw;
  }
</style>
