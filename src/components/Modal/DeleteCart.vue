<template>
  <sui-modal v-model="open" id="modal-delete">
    <sui-modal-header><h2 style="color: red;">Remove cart</h2></sui-modal-header>
    <sui-modal-content>
      Are you sure want to remove this from your cart?
    </sui-modal-content>
    <sui-modal-actions>
      <div class="btn-group-delete">
        <sui-button @click.prevent="toggle" positive >Cancel</sui-button>
        <sui-button @click.prevent="destroy" negative >Remove</sui-button>
      </div>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
export default {
  name: 'AddToCart',
  data () {
    return {
    }
  },
  methods: {
    toggle () {
      this.$store.commit('SET_MODAL_DELETE', {
        status: false
      })
    },
    destroy () {
      this.$store.dispatch('destroyCart')
      this.toggle()
    }
  },
  computed: {
    open () {
      return this.$store.state.modalDelete.status
    }
  }
}
</script>
