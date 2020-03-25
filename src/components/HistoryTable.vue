<template>
  <v-data-table :headers="headers" :items="histories" sort-by="date" sort-desc class="elevation-2">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My History Purchase</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.totalPrice="data">{{ formatPrice(data.value)}}</template>
    <template v-slot:item.date="data">{{ formatDate(data.value)}}</template>
  </v-data-table>
</template>

<script>
export default {
  name: 'HistoryTabel',
  data () {
    return {
      headers: [
        {
          text: 'Product Name',
          sortable: false,
          value: 'name'
        },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Total Price (IDR)', value: 'totalPrice' },
        { text: 'Date', value: 'date' }
      ]
    }
  },
  methods: {
    formatPrice (price) {
      return `Rp ${price.toLocaleString('id-ID', 'currency')}`
    },
    formatDate (date) {
      return new Date(date).toLocaleString()
    }
  },
  computed: {
    histories () {
      return this.$store.state.histories
    }
  },
  created () {
    this.$store.dispatch('histories')
      .then(({ data }) => {
        this.$store.commit('SET_LOADING', false)
        this.$store.commit('STOP_ERROR')

        const payload = []
        data.forEach(el => {
          payload.push({
            quantity: el.quantity,
            totalPrice: el.price,
            name: el.Product.name,
            date: el.updatedAt
          })
        })

        this.$store.commit('SET_HISTORIES', payload)
      })
      .catch(({ response }) => {
        this.$store.commit('SET_LOADING', false)
        this.$store.commit('SET_ERROR', response.data)
      })
  }
}
</script>

<style>
</style>
