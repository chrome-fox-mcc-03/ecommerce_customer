<template>
  <div>
      <h1>Your Shopping Cart</h1><br><br>
      <b-button class="button" id="CheckoutButton" @click.prevent="Checkout" variant="primary">Checkout</b-button>
      <br>
      <br>
      <table id="CartTable">
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Options</th>
        </tr>
        <tr v-for="Cart in Carts" :key="Cart.id">
            <!-- di for untuk dalem nya table  -->
          <td>{{Cart.Product.Name}}</td>
          <td>{{Cart.Quantity}}</td>
          <td>{{Cart.Product.Price}}</td>
          <td><b-button class="button"  variant="success" v-b-modal="'Modal'+Cart.id" :Cart="Cart">ShowInfo</b-button></td>
          <UpdateModal :Cart="Cart"></UpdateModal>
        </tr>
      </table>
  </div>
</template>

<script>
import UpdateModal from '../components/UpdateModal'
export default {
  name: 'Cart',
  data () {
    return {
    }
  },
  methods: {
    Checkout () {
      this.$store.dispatch('Checkout')
    }
  },
  components: {
    UpdateModal
  },
  computed: {
    Carts () {
      return this.$store.state.Cart
    }
  },
  created () {
    const token = localStorage.getItem('Access_Token')
    if (token !== null) {
      this.$store.dispatch('FetchCart')
    } else {
      this.$toasted.show('Unauthorized, Please Login / Register First')
    }
  }
}
</script>

<style>
#CartTable {
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
#CheckoutButton {
}
</style>
