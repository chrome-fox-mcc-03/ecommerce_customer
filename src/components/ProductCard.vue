<template>
    <b-col cols="3" class="d-flex justify-content-center align-items-between mt-3 mb-3">
        <b-card
        no-body
        style="width: 14rem;font-family: 'Muli', sans-serif; border: 0; object-fit: cover !important;"
        :img-src="img_url"
        img-alt="Image"
        img-top
        img-height= "280px"
        >
        <b-card-footer><b-card-title style="font-size: 16px; font-weight: bold;">{{name}}</b-card-title>
            <b-card-sub-title class="mb-2" style="font-size: 12px;">{{storeName}}</b-card-sub-title>
            <b-card-text style="font-size: 10px;">
            {{description}}
            </b-card-text></b-card-footer>
        <b-card-footer style="font-size: 12px; font-weight: bold;" >{{priceParsed}}</b-card-footer>
        <b-card-footer style="font-size: 12px; font-weight: bold; color: red;" v-if="!stock">Out of Stock</b-card-footer>
        <b-card-footer v-if="loginStatus && stock">
            <b-button size="sm" variant="light" @click.prevent = "addToCart">
                Add to Cart >
            </b-button>
        </b-card-footer>
        </b-card>
    </b-col>
</template>

<script>
export default {
  props: {
    img_url: String,
    name: String,
    price: Number,
    stock: Number,
    storeName: String,
    description: String,
    id: Number
  },
  computed: {
    priceParsed () {
      const priceTemp = String(this.price).split('')
      let priceParsed = ''
      for (let i = 0; i < priceTemp.length; i++) {
        if ((priceTemp.length - i) % 3 === 0 && (priceTemp.length - i) !== priceTemp.length) priceParsed += `.${priceTemp[i]}`
        else priceParsed += `${priceTemp[i]}`
      }
      return `Rp. ${priceParsed}`
    },
    loginStatus () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    addToCart () {
      this.$store.dispatch('addToCart', this.id)
    }
  }
}
</script>

<style>

</style>
