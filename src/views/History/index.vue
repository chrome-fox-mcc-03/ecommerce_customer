<template>
  <div class="cart">
    <sui-table class="table">
      <Header />
      <Body v-for="({ id, Product, amount, updatedAt }, i) in listHistory"
        :key="i"
        :i="i"
        :id="id"
        :product="Product"
        :amount="amount"
        :date="updatedAt"
      />
    </sui-table>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Body from './components/Body.vue'

export default {
  name: 'TableListHistory',
  computed: {
    listHistory () {
      return this.$store.state.history
    }
  },
  created () {
    this.$store.dispatch('fetchHistory')
    if (this.listHistory.length === 0) {
      this.$router.push({ path: '/' })
    }
    this.$store.commit('SET_ISMESSAGE')
  },
  components: {
    Header,
    Body
  }
}
</script>
