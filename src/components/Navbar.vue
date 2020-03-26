<template>
  <div id="navbar">
    <div class="left-bar">
      <h2>Sweat<span>Al</span>er<span>t</span>.Inc</h2>
      <ul>
        <li @click="moveHome">Home</li>
        <li @click="moveProducts">Product</li>
      </ul>
    </div>
    <div class="right-bar">
      <div class="chart">
        <ul>
          <li @click="moveCheckout">Checkout</li>
          <div class="dropdown ml-2" v-if="cart.length > 0">
            <button class="btn btn-success btn-sm dropdown-toggle" id="dropdownCart" data-toggle="dropdown" aria-hashpopup="true" aria-expanded="false">
              <!-- <li>Chart -->
                <span v-if="cart.length > 0" class="badge badge-pill badge-warning">{{ cartQty }}</span>
                <i class="fas fa-shopping-cart mx-2"></i>
                {{cartTotal | currencyFormat}}
              <!-- </li> -->
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownCart">
              <div v-for="(item, index) in cart" :key="index">
                <div class="dropdown-item-text text-nowrap text-right">
                  <span class="badge badge-pill badge-warning align-text-top mr-1">
                    {{item.qty}}
                  </span>
                    {{item.product.name}}
                  <b>{{item.product.price * item.qty | currencyFormat}}</b>
                  <a href="#" class="badge badge-danger text-white" @click.stop="deleteItem(index)">-</a>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div class="logout">
        <ul>
          <li @click="logoutProcess">Logout</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      admin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    moveProducts () {
      this.$router.push('/dashboard/products')
    },
    moveHome () {
      this.$router.push('/dashboard')
    },
    moveCheckout () {
      this.$router.push('/dashboard/checkout')
    },
    logoutProcess () {
      localStorage.clear()
      this.$router.push('/')
    },
    deleteItem (i) {
      const cart = this.$store.state.cart
      if (cart[i].qty > 1) {
        cart[i].qty--
        const payload = {
          cart: cart[i],
          productId: cart[i].product.id
        }
        this.$store.dispatch('updateQtyProduct', payload)
      } else {
        const payload = {
          cart: cart[i],
          productId: cart[i].product.id
        }
        this.$store.dispatch('deleteItemFromCart', payload)
      }
    }
  },
  filters: {
    currencyFormat: function (val) {
      return 'Rp. ' + val.toLocaleString('Id')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    cartTotal () {
      let sum = 0
      const cart = this.$store.state.cart
      for (let i = 0; i < cart.length; i++) {
        sum = sum + (cart[i].product.price * cart[i].qty)
      }
      return sum
    },
    cartQty: function () {
      let qty = 0
      const cart = this.$store.state.cart
      for (let i = 0; i < cart.length; i++) {
        qty = qty + cart[i].qty
      }
      return qty
    }
  },
  watch: {
    cart: function (val) {
      return val
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style>
* {
  margin : 0;
}

#navbar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: black;
  height: 8vh;
  /* position: fixed; */
}

#navbar .left-bar h2 {
    font-size: 30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    text-align: right;
    margin-bottom: 0px;
    /* margin-top: 20px; */
    margin-right: 20px;
    letter-spacing: -2px;
  }

#navbar .left-bar span {
  font-size: 25px;
  color: coral;
}
/* LEFT NAVBAR */

#navbar .left-bar{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}

#navbar .left-bar ul{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
}

#navbar .left-bar ul li{
  padding-left: 20px;
}

/* RIGHT NAVBAR  */

#navbar .right-bar{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.dropdown {
  margin-left: 5px;
  margin-top: 10px;
}
#navbar .right-bar .chart ul, #navbar .right-bar .login ul, #navbar .right-bar .logout ul{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  margin-right: 20px;
}

#navbar .right-bar .login ul li {
  padding-right: 20px;
}
#navbar .right-bar .login ul li a:hover {
  color: blue;
}

li, h2 {
  color: white;
}

#navbar .right-bar .chart ul li, #navbar .right-bar .login ul li, #navbar .right-bar .logout ul li, #navbar .left-bar ul li {
  cursor: pointer;
  margin-top: 10px;
  color: white;
}

.linker {
  color: white;
}

#title-login-admin {
  color: black;
}

#cancel-login-admin {
  width: 50%;
  margin: 0 auto;
}

#submit-login-admin {
  width: 90%;
}

#login-admin {
  background-color: rgb(29, 43, 38);
}
</style>
