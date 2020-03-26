<template>
  <div>
    <div class="image">
      <img :src="product.image_url">
    </div>
    <div class="named">
      <p style="font-size:20px; margin-top:10px;">{{product.name}}</p>
      <p>{{product.stock}} items tersedia</p>
      <p>{{product.price | currencyFormat}}</p>
    </div>
    <div class="add-to-cart">
      <button @click="addToCart(product)">Add To Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemProduct',
  data () {
    return {
    }
  },
  props: {
    product: Object
  },
  filters: {
    currencyFormat: function (val) {
      return 'Rp. ' + val.toLocaleString('Id')
    }
  },
  methods: {
    addToCart (product) {
      const cart = this.$store.state.cart
      var productIndex
      var productExist = cart.filter(function (item, index) {
        if (item.product.id === Number(product.id)) {
          productIndex = index
          return true
        } else {
          return false
        }
      })
      if (productExist.length) {
        cart[productIndex].qty++
        const payload = {
          cart: cart[productIndex],
          productId: product.id
        }
        this.$store.dispatch('updateQtyProduct', payload)
      } else {
        cart.push({ product: product, qty: 1 })
        const payload = {
          cart: cart[cart.length - 1],
          productId: product.id
        }
        this.$store.dispatch('addNewProductToCart', payload)
      }
    }
  }
}
</script>

<style>
  .image {
    width: 100%;
  }
  .image img {
    width: 100%;
    height: 341px;
  }
  .add-to-cart {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .add-to-cart button {
    margin-bottom: 20px;
    margin-right: 10px;
    background-color: bisque;
  }

</style>
