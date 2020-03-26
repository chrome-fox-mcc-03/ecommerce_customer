<template>
<div id="cart-card" class="card" style="width: 60rem;">
          <img class="card-img-top" id="cart-card-img" :src="`${cart.productImage}`" alt="Card image cap" />
            <h5 class="card-title" id="cart-card-title">{{ cart.productName }}</h5>
            <label for="cart-card-text" id="cart-card-text-qty">Quantity:</label>
          <!-- <div class="card-body" id="cart-card-body"> -->
            <form @submit.prevent="updateCart(cart.id)">
              <input v-model="quantity" type="text" class="card-text" id="cart-card-text" :placeholder="`${cart.quantity}`">
              <button class="btn btn-primary" id="update-cart">Update Cart</button>
              <button class="btn btn-primary" id="delete-button" @click.prevent="deleteCart(cart.id)">x</button>
            </form>
            <h5 id="cart-product-price">Price: {{cart.productPrice}}</h5>
          <!-- </div> -->
        </div>

</template>

<script>
export default {
  name: 'Card',
  props: [
    'cart'
  ],
  data: function () {
    return {
      quantity: ''
    }
  },
  methods: {
    updateCart: function (id) {
      this.$store.dispatch('editCart', {
        quantity: this.quantity,
        id: id
      })
        .then(({ data }) => {
          this.$toasted.success(data)
          this.$store.dispatch('getCart')
        })
        .catch(error => {
          this.$toasted.error(error.response.data)
        })
    },
    deleteCart: function (id) {
      this.$store.dispatch('deleteCart', id)
        .then(({ data }) => {
          this.$store.dispatch('getCart')
          this.$toasted.success('item removed from cart')
        })
        .catch(error => {
          this.$toasted.error(error.response.data)
        })
    }
  }
}
</script>

<style>
#delete-button {
  background-color: #ee6f44;
  border-radius: 50%;
  padding: 0vh 1vh 0vh 1vh;
  font-size: 2vh;
  border: transparent;
  transition: 0.5s ease-in-out;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  color: white;
}

#delete-button:hover {
    background-color: black;
}

#cart-product-price {
    position: absolute;
    top: 15vh;
    left: 22.5vw;
    background-color: transparent;
}
</style>
