<template>
  <sui-table-body>
    <sui-table-row>
      <sui-table-cell>{{i + 1}}</sui-table-cell>
      <sui-table-cell>{{product.name}}</sui-table-cell>
      <sui-table-cell>
        <img :src="product.image_url" alt="Product image">
      </sui-table-cell>
      <sui-table-cell>
          <sui-button
            circular icon="minus"
            size="small"
            @click="addReduce(-1)"
            negative
          />
          <strong style="margin: 0 1vw; font-size: 3vh;">{{amount}}</strong>
          <sui-button
            circular icon="plus"
            size="small"
            @click="addReduce(1)"
            positive
          />
      </sui-table-cell>
      <sui-table-cell>Rp. {{product.price.toLocaleString()}}</sui-table-cell>
      <sui-table-cell>
        <sui-button
          circular
          icon="trash"
          size="small"
          @click="destroy"
          negative
        />
      </sui-table-cell>
    </sui-table-row>
  </sui-table-body>
</template>

<script>
export default {
  name: 'TableBody',
  props: {
    i: Number,
    id: Number,
    product: Object,
    amount: Number
  },
  methods: {
    addReduce (num) {
      this.$store.dispatch('updateAmount', {
        id: this.id,
        newAmount: +num
      })
    },
    destroy () {
      this.$store.commit('SET_MODAL_DELETE', {
        status: true,
        id: this.id
      })
    }
  }
}
</script>
