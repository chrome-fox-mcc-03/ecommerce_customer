<template>
  <div class="showpage">
    <Navbar></Navbar>
    <div v-if="!isLoading" class="dashboard">
      <h2>MY SHOPPING CART</h2>
      <b-button @click.prevent="bulkCheckout()" variant="danger">BULK CHECKOUT</b-button>
      <div class="row">
        <CartCard
         v-for="cart in carts"
         :key="cart.id"
         :cart="cart">
        </CartCard>
      </div>
    </div>
    <div v-else>
        <Loading></Loading>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import CartCard from '../components/CartCard.vue'
import Loading from '../components/Loading'
export default {
  components: {
    Navbar,
    CartCard,
    Loading
  },
  methods: {

    bulkCheckout () {
      console.log("LET'S CHECKOUT ALL CARTS, EN MASSE")

      this.$store.dispatch('checkoutEnMasse')
        .then(_ => {
          // this.$store.commit('SET_IS_PAID', true)
          this.$router.push('/txnlog')
          this.$store.dispatch('getCarts')
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          const errArr = err.response.data.errors
          console.log(err.response.data.errors)
          errArr.forEach(el => {
            this.$toasted.error(el)
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    }

  },
  created () {
    this.$store.dispatch('getCarts')
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  mounted () {}
}
</script>

<style>
  .showpage {
    width: 100% !important;
    margin: 2vh;
    padding: 2vh;
  }

  .dashboard {
    width: 100% !important;
    margin: 2vh;
    padding: 2vh;
  }

  h2 {
    text-align: center;
  }
  .row {
    /* width: 65% !important; */
    width: 100% !important;
    margin:1vh;
    /* left:25%;
    right:0; */
    display: flex;
    padding:1vh;
    justify-content: center;

  }
</style>
