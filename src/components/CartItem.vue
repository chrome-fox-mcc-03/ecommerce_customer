<template>
  <div class="card">
    <div class="columns">
      <div class="column">
        <img :src="item.Product.img_url" alt width="60px" height="80px" />
      </div>
      <div class="column">
        <p class="subtitle">{{ item.Product.name }}</p>
        <p class="subtitle">{{ item.Product.price }}</p>
      </div>
      <div class="column">
        <button class="button is-outlined is-danger" @click="minQuantity">-</button>
        <input type="number" v-model="quantity" />
        <button class="button is-outlined is-danger" @click="plusQuantity">+</button>
      </div>
      <div class="column">
          <button class="button is-danger is-outlined" @click="deleteItem">
                    <i class="fas fa-trash-alt"></i>
          </button>
      </div>
    </div>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
export default {
  name: 'Card',
  props: ['item'],
  created () {
    this.quantity = this.item.quantity
  },
  data () {
    return {
      quantity: 0,
      isLoading: false
    }
  },
  components: {
    Loading
  },
  methods: {
    plusQuantity () {
      this.quantity += 1
      const data = {
        quantity: this.quantity,
        ProductId: this.item.Product.id,
        id: this.item.id
      }
      this.isLoading = true
      this.$store.dispatch('changeQuantity', data)
        .then(_ => {
          this.isLoading = false
        })
        .catch(_ => {
          this.isLoading = false
        })
    },
    minQuantity () {
      this.quantity -= 1
      const data = {
        quantity: this.quantity,
        ProductId: this.item.Product.id,
        id: this.item.id
      }
      this.isLoading = true
      this.$store.dispatch('changeQuantity', data)
        .then(_ => {
          this.isLoading = false
        })
        .catch(_ => {
          this.isLoading = false
        })
    },
    deleteItem () {
      this.isLoading = true
      this.$store.dispatch('deleteCartItem', this.item.id)
        .then(_ => {
          this.isLoading = false
        })
        .catch(_ => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped>
.column {
    margin: 20px;
}
</style>
