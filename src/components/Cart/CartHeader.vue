<template>
  <div class="card-header bg-dark text-light">
    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
    Your Cart
    <a class="btn btn-secondary border btn-sm pull-right" @click.prevent="save"><strong>Save &amp; Continue Shopping</strong></a>
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  name: 'CartHeader',
  props: ['carts'],
  methods: {
    save () {
      this.$store.dispatch('saveCart')
    }
  }
}
</script>

<style>

</style>
