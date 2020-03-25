<template>
  <div id="buy-container" class="d-flex flex-row justify-content-center align-items-center">
    <div id="buy-image-cont" class="d-flex justify-content-center align-items-center">
      <img id="buy-img" :src="productBuy.image_url" :alt="productBuy.name">
    </div>
    <div id="form-buy-cont" class="d-flex justify-content-center align-items-center flex-column">
      <h1 style="padding-bottom: 4rem">{{ productBuy.name }}</h1>
      <form @submit.prevent="buyProduct(productBuy.id)">
        <h4>Price: {{ productBuy.price }}</h4>
        <h4>Stock: {{ productBuy.stock }}</h4>
        <h4>
          <label for="quantity">Quantity</label>
        </h4>
        <input v-model="quantity" type="number" id="quantity" placeholder="0"><br>
        <input type="submit" value="Add to Cart">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      quantity: null
    }
  },
  computed: {
    productBuy () {
      return this.$store.state.productBuy
    },
    cart () {
      return this.$store.state.cart
    }
  },
  methods: {
    buyProduct (productId) {
      const CartId = this.cart.id
      const ProductId = productId
      const quantity = this.quantity
      const payload = {
        CartId,
        ProductId,
        quantity
      }
      this.$store.dispatch('buyProduct', payload)
        .then(result => {
          this.$router.push({ name: 'Products' })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style>
#buy-container{
  width: 100%;
  height: 100%;
}
#buy-image-cont{
  width: 40%;
  height: 100%;
}
#buy-img {
  width: 100%;
  height: auto
}
#form-buy-cont {
  width: 60%;
  height: 100%;
}
</style>
