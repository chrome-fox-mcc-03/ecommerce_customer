<template>
<div class="card-footer">
  <div class="coupon col-md-5 col-sm-5 no-padding-left pull-left">
    <div class="row">
      <div class="col-6">
        <input type="text" class="form-control" placeholder="Coupon Code">
      </div>
      <div class="col-6">
        <input type="submit" class="btn btn-primary" value="Use Coupon">
      </div>
    </div>
  </div>
  <div class="pull-right" style="margin: 10px">
    <a @click="checkout" class="btn btn-success pull-right" style="color: white">Checkout</a>
    <div class="pull-right" style="margin: 5px">
      Total price: <b>Rp {{totalPrice}} </b>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    totalPrice () {
      const items = this.$store.state.carts
      let total = 0
      items.forEach(el => {
        total += (el.quantity * el.Product.price)
      })
      return total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  },
  methods: {
    checkout () {
      this.$store.dispatch('checkout')
    }
  }
}
</script>

<style>

</style>
