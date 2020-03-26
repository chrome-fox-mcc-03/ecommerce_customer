<template>
  <div class="container">
    <div class="card shopping-cart">
      <div class="card-header bg-dark text-light d-flex justify-content-between">
        <div>
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        Shipping cart
        </div>
        <router-link to="/" class="btn btn-outline-info btn-sm">Continue shopping</router-link>
      </div>
      <div class="card-body">
        <product-cart-card v-for="cart in carts" :key="cart.id" :cart="cart"></product-cart-card>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-end" style="margin: 10px">
          <div class="mr-5">
            Total price: <b>{{getNumber}}</b>
          </div>
          <a @click.prevent="checkout" type="button" class="btn btn-success pull-right">Checkout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCartCard from '../components/ProductCartCard'
const Swal = require('sweetalert2')
export default {
  name: 'ProductCart',
  data () {
    return {
    }
  },
  created () {
    this.fetchCart()
  },
  components: {
    ProductCartCard
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    getTotal () {
      return this.$store.getters.getTotal
    },
    getNumber () {
      var str = this.getTotal.toString().split('.')
      if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')
      }
      if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ')
      }
      return str.join('.')
    }
  },
  methods: {
    checkout () {
      const randomNumber = Math.floor(100000 + Math.random() * 900000)
      this.$store.commit('SET_RANDOM_NUMBER', randomNumber)
      Swal.fire({
        title: 'Are you sure?',
        text: 'Please check your cart!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('checkout', { number: randomNumber })
            .then(_ => {
              Swal.fire(
                'Checked out!',
                'Please Pay your cart!.',
                'success'
              )
              this.$store.dispatch('fetchCart')
              this.$store.dispatch('fetchProduct')
              this.$router.push('/confirm')
            })
            .catch(err => {
              this.$toasted.error(err.response.data.message, {
                position: 'bottom-center'
              })
            })
        }
      })
    },
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  }
}

</script>

<style scoped>
  .quantity {
    float: left;
    margin-right: 15px;
    background-color: #eee;
    position: relative;
    width: 80px;
    overflow: hidden
  }

  .quantity input {
    margin: 0;
    text-align: center;
    width: 15px;
    height: 15px;
    padding: 0;
    float: right;
    color: #000;
    font-size: 20px;
    border: 0;
    outline: 0;
    background-color: #F6F6F6
  }

  .quantity input.qty {
    position: relative;
    border: 0;
    width: 100%;
    height: 40px;
    padding: 10px 25px 10px 10px;
    text-align: center;
    font-weight: 400;
    font-size: 15px;
    border-radius: 0;
    background-clip: padding-box
  }

  .quantity .minus,
  .quantity .plus {
    line-height: 0;
    background-clip: padding-box;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    color: #bbb;
    font-size: 20px;
    position: absolute;
    height: 50%;
    border: 0;
    right: 0;
    padding: 0;
    width: 25px;
    z-index: 3
  }

  .quantity .minus:hover,
  .quantity .plus:hover {
    background-color: #dad8da
  }

  .quantity .minus {
    bottom: 0
  }

  .shopping-cart {
    margin-top: 20px;
  }

</style>
