<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-2 text-center">
        <img class="img-responsive" :src="cart.Product.image_url" alt="prewiew" width="120" height="80">
      </div>
      <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
        <h4 class="product-name"><strong>{{cart.Product.name}}</strong></h4>
      </div>
      <div class="col-12 col-sm-12 text-sm-center col-md-4 row">
        <div class="col-3 col-sm-3 col-md-6" style="padding-top: 5px">
          <h6><strong>{{cart.Product.price}}<span class="text-muted">x</span></strong></h6>
        </div>
        <div class="col-4 col-sm-4 col-md-4">
          <div class="quantity d-flex justify-content-center mr-3">
            <a @click.prevent="decrease" style="cursor: pointer;"><i class="fas fa-minus mr-2 mt-2"></i></a>
            <input type="number" :value="quantity" size="4" disabled>
            <a @click.prevent="increase" style="cursor: pointer;"><i class="fas fa-plus ml-2 mt-2"></i></a>
          </div>
        </div>
        <div class="col-2 col-sm-2 col-md-2 text-right">
          <button type="button" class="btn btn-outline-danger btn-xs" @click.prevent="deleteCart">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ProductCartCard',
  props: ['cart'],
  data () {
    return {
      quantity: 0
    }
  },
  methods: {
    getQuantity () {
      this.quantity = this.cart.quantity
    },
    decrease () {
      this.quantity -= 1
      const payload = {
        id: this.cart.Product.id
      }
      this.$store.dispatch('decrease', payload)
    },
    increase () {
      this.quantity += 1
      const payload = {
        id: this.cart.Product.id
      }
      this.$store.dispatch('increase', payload)
    },
    deleteCart () {
      const payload = {
        id: this.cart.Product.id
      }
      this.$store.commit('SET_LOADING', true)
      this.$store.dispatch('deleteCart', payload)
        .then(response => {
          this.$toasted.success(response.data)
          this.$store.dispatch('fetchCart')
          this.$router.push('/cart')
        })
        .catch(err => {
          this.$toasted.error(err.response.data.message, {
            position: 'bottom-center'
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    }
  },
  created () {
    this.getQuantity()
  }
}

</script>

<style>

</style>
