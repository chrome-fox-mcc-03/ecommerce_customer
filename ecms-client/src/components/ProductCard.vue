<template>
  <div>
      <b-card
    :title="Product.Name"
    :img-src="Product.Image_Url"
    :img-alt="Product.Image_Url"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
        Stock: {{Product.Stock}}<br>
        Price: {{Product.Price}}<br>
    </b-card-text>
    <form>
      <input type="numbers" v-model="Quantity" ><br><br>
      <b-button class="button"  variant="secondary" @click.prevent="addtocart">Add to Cart</b-button>
    </form>
  </b-card>
  </div>
</template>

<script>
export default {
  props: ['Product'],
  data () {
    return {
      Quantity: 0
    }
  },
  methods: {
    addtocart () {
      const payload = {
        ProductId: this.Product.id,
        Quantity: this.Quantity
      }
      this.$store.dispatch('AddtoCart', payload)
    }
  },
  updated () {
  }
}
</script>

<style>
.button {
    margin-right: 2%;
    margin-left: 2%;
}
</style>
