<template>
  <sui-modal v-model="open" id="modal-delete">
    <sui-modal-header><h2 style="color: green;">Add to cart</h2></sui-modal-header>
    <sui-modal-content>
      <sui-form @submit.prevent="addToCart">
        <sui-form-field id="modal-add">
          <label>Amount</label>
          <input type="number" min="1" :max="stock" v-model="amount" placeholder="Amount" required />
        </sui-form-field>
        <sui-form-field class="btn-group-delete">
          <sui-button @click.prevent="toggle" negative >Cancel</sui-button>
          <sui-button type="submit" positive >Add</sui-button>
        </sui-form-field>
      </sui-form>
    </sui-modal-content>
  </sui-modal>
</template>

<script>
export default {
  name: 'AddToCart',
  data () {
    return {
      amount: 1
    }
  },
  methods: {
    toggle () {
      this.$store.commit('SET_MODAL_ADD')
      this.amount = 1
    },
    addToCart () {
      this.$store.dispatch('addToCart', this.amount)
      this.toggle()
    }
  },
  computed: {
    open () {
      return this.$store.state.modalAdd
    },
    stock () {
      return this.$store.state.products[this.$store.state.productIdx].stock
    }
  }
}
</script>
