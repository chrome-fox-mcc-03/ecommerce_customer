<template>
  <sui-table-footer>
    <sui-table-header-cell />
    <sui-table-header-cell />
    <sui-table-header-cell />
    <sui-table-header-cell><Message /></sui-table-header-cell>
    <sui-table-header-cell>Total: Rp. {{total.toLocaleString()}}</sui-table-header-cell>
    <sui-table-header-cell>
      <sui-button color="green" :disabled="total == 0 ? true : false" @click="checkout">checkout</sui-button>
    </sui-table-header-cell>
  </sui-table-footer>
</template>

<script>
import Message from '@/components/Message.vue'

export default {
  name: 'TableFooter',
  data () {
    return {
      temp: ''
    }
  },
  components: {
    Message
  },
  computed: {
    total () {
      return this.$store.state.total
    }
  },
  methods: {
    checkout () {
      this.$store.dispatch('checkoutCart')
        .then(data => {
          this.temp = data
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          this.temp = err
        })
    }
  }
}
</script>
