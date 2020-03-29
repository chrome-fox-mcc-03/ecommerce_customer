<template>
  <sui-table-body>
    <sui-table-row>
      <sui-table-cell>{{i + 1}}</sui-table-cell>
      <sui-table-cell>{{product.name}}</sui-table-cell>
      <sui-table-cell>
        <img :src="product.image_url" alt="Product image">
      </sui-table-cell>
      <sui-table-cell>
        {{amount}}
      </sui-table-cell>
      <sui-table-cell>
        Rp. {{product.price.toLocaleString()}}
      </sui-table-cell>
      <sui-table-cell>
        {{new Date(date).toLocaleDateString('en-US', options)}}
      </sui-table-cell>
      <sui-table-cell>
        Rp. {{(+amount * +product.price).toLocaleString()}}
      </sui-table-cell>
    </sui-table-row>
  </sui-table-body>
</template>

<script>
export default {
  name: 'TableBody',
  data () {
    return {
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
  },
  props: {
    i: Number,
    id: Number,
    product: Object,
    amount: Number,
    date: Date
  }
}
</script>
