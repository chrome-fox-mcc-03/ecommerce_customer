<template>
  <div data-app class="container pt-5">
    <v-data-table
      :headers="headers"
      :items="history"
      :search="search"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>History</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.Product.updatedAt="{ item }">
        <span>{{ getFormattedDate(item) }}</span>
      </template>
      <template v-slot:item.Product.price="{ item }">
        <span style="float: right">{{ getFormattedNumber(item) }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      search: '',
      cartItems: [],
      headers: [
        { text: 'Payment Date', sortable: true, value: 'Product.updatedAt' },
        { text: 'Name', align: 'start', value: 'Product.name' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Price', value: 'Product.price' }
      ]
    }
  },
  computed: {
    ...mapState(['history'])
  },
  methods: {
    getFormattedDate (value) {
      return moment(value).format('D-MMM-YYYY')
    },
    getFormattedNumber (value) {
      return value.Product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  },
  created () {
    this.$store.dispatch('fetchHistory')
  }
}
</script>

<style>

</style>
