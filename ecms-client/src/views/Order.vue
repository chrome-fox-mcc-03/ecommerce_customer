<template>
  <div>
      <h1>Order History</h1><br><br>
      <table id="ProductTable">
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total Price</th>
        </tr>
        <tr v-for="Order in Orders" :key="Order.id">
            <!-- di for untuk dalem nya table  -->
          <td>{{Order.Product.Name}}</td>
          <td>{{Order.Quantity}}</td>
          <td>{{Order.Product.Price}}</td>
          <td>{{Order.TotalPrice}}</td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
    }
  },

  methods: {
    Delete () {
    }
  },
  components: {
  },
  computed: {
    Orders () {
      return this.$store.state.Order
    }
  },
  created () {
    const token = localStorage.getItem('Access_Token')
    if (token !== null) {
      this.$store.dispatch('FetchOrder')
    } else {
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>

<style>
#ProductTable {
  margin-left: 20%;
  margin-right: 20%;
  width: 60vw;
  padding: 10px;
  justify-content: center;
  text-align: center;
  justify-content: center;
  border-style: double;
  border-width: 10px;
  color: red;
  border-color: royalblue;
}
tr {
  margin: 5px;
  border-style: double;
  border-width: 10px;
  border-color: royalblue;
}
th {
  margin: 5px;
  border-style: double;
  border-width: 10px;
  border-color: royalblue;
}
td {
  margin: 5px;
  border-style: double;
  border-width: 10px;
  border-color: royalblue;
}
</style>
