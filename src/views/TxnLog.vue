<template>
  <div class="showpage">
    <Navbar></Navbar>
    <div v-if="!isLoading" class="dashboard">
      <h2>MY TRANSACTION HISTORY</h2>
      <div class="row">
        <CartCard
         v-for="txn in txns"
         :key="txn.id"
         :cart="txn">
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
  created () {
    this.$store.dispatch('getTxnLog')
  },
  computed: {
    txns () {
      return this.$store.state.txns
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
