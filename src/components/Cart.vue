<template>
  <div id="cart-page-container">
    <h1 id="product-heading">CART</h1>
    <div id="cart-page-container2">
      <div id="cart-left">
        <Card v-for="cart in carts" :key="cart.id" :cart="cart"/>
      </div>

      <div id="cart-right">
        <h3 id="cart-right-heading">Total</h3>
        <h3 id="cart-right-price">Total Price:</h3>
        <button id="logout" class="buy-button">Buy</button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'Cart',
  components: {
    Card
  },
  data: function () {
    return {
      quantity: '',
      id: ''
    }
  },
  methods: {
  },
  computed: {
    carts: function () {
      return this.$store.state.carts
    }
  },
  created: function () {
    this.$store.dispatch('getCart')
  }
}
</script>

<style>
#cart-page-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    padding-top: 10vh;
    flex-direction: column;
}

#cart-card-img {
    width: 18vw;
    height: 100%;
}

#cart-card-text {
    position: absolute;
    top: 10vh;
    left: 28vw;
    background-color: transparent;
    font-size: 2vh;
    width: 4vw;
    border: transparent;
    background-color: #eeeeee;
    padding: 0.5vh 1vh 0vh 2vh;
    border-radius: 2vh;
}

#cart-card-text-qty {
    position: absolute;
    top: 10.3vh;
    left: 22.5vw;
    background-color: transparent;
    font-size: 2vh;
}

#cart-card-title {
    position: absolute;
    top: 3vh;
    height: 6vh;
    left: 22vw;
    background-color: transparent;
    font-size: 4vh;
    width: 70%;
}

#cart-card {
    width: 25vw;
    display: flex;
    flex-direction: column;
    margin-top: 5vh;
    margin-left: 10vw;
}

#cart-page-container2 {
  display: flex;
  /* justify-content: center; */
  height: 100%;
  width: 100%;
}

#cart-left {
  width: 60vw;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 5vh;
  padding-right: 5vw;
}

#cart-right {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 2vh;
  padding: 5vh;
  height: 25vh;
  width: 20vw;
  margin-left: 5vh;
  margin-top: 5vh;
}

#cart-right-heading {
    background-color: transparent;
    font-weight: bolder;
    font-size: 4vh;
}

#cart-right-price {
    background-color: transparent;
    font-size: 2vh;
}

.buy-button {
    border-style: solid;
}

#update-cart {
    margin-top: 20vh;
    cursor: pointer;
    background-color: #4000ff;
    padding: 0.5vh 1.5vh 0.5vh 1.5vh;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s ease-in-out;
    height: 4vh;
    border-radius: 2vh;
}

</style>
