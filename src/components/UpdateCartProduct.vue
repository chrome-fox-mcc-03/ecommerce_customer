<template>
<div class="modal fade" id="updateCartProduct" tabindex="-1" role="dialog" aria-labelledby="updateCartProductTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="updateCartProductTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <label for="quantity">Quantity</label><br>
          <input type="number" id="quantity" v-model="cartProductUpdate.quantity">
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button @click="update()" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    cartProductUpdate () {
      return this.$store.state.cartProductUpdate
    }
  },
  methods: {
    update () {
      let cartId
      this.$store.dispatch('updateCartProduct', this.cartProductUpdate)
        .then(result => {
          cartId = result.data.CartId
          const condition = {
            icon: 'success',
            title: 'Successfully edit item quantity'
          }
          this.$store.dispatch('notification', condition)
          return this.$store.dispatch('cartDetail', cartId)
        })
        .then(result => {
          const allCartProducts = result.data
          const cartProducts = allCartProducts.filter(el => {
            return el.CartId === cartId
          })
          this.$store.commit('SET_CARTPRODUCT', cartProducts)
        })
        .catch(err => {
          const condition = {
            icon: 'error',
            title: err.response.data.message
          }
          this.$store.dispatch('notification', condition)
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    }
  }
}
</script>

<style>

</style>
