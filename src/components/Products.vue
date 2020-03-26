<template>
    <div>
      <div id="card-container">
        <div id="product-heading">
        PRODUCTS
        </div>
        <div id="card" class="card" style="width: 18rem;" v-for="product in products" :key="product.id">
          <img class="card-img-top" id="card-img" :src="`${product.image_url}`" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title" id="card-title">{{ product.name }}, <span id="card-price">price: {{ product.price }}</span></h5>
            <a @click.prevent="addToCart(product.id)" class="btn btn-primary" id="add-cart-button">+</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Products',
  methods: {
    addToCart: function (id) {
      this.$store.dispatch('addToCart', id)
    }
  },
  computed: {
    products: function () {
      console.log(this.$store.state.products)
      return this.$store.state.products
    }
  },
  created: function () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style>
#product-heading {
  height: 10vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4vh;
  font-weight: bolder;
}

#card-container {
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  padding: 0vh 5vh 0 5vw;
  justify-content: center;
}

.card {
  height: 30vh;
}

#card {
  border-radius: 2vh;
  overflow: hidden;
  margin-right: 5vw;
  margin-bottom: 5vw;
}

#card-img {
  height: 100%;
  width: 100%;
}

.card-title {
  position: absolute;
  bottom: 0;
  font-size: 2vh;
  padding: 1vh;
  border-radius: 2vh;
  background-color: black;
  font-weight: bolder;
  max-width: 85%;
}

#card-title {
  color: #ee6f44;
}

#card-price {
  background-color: black;
  color: white;
}

.btn {
  position: absolute;
  top: 1.2vh;
  right: 2vh;
  padding: 1vh;
}

#add-cart-button {
  background-color: #4000ff;
  border-radius: 50%;
  padding: 0vh 1.5vh 0vh 1.5vh;
  font-size: 3vh;
  border: transparent;
  transition: 0.5s ease-in-out;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  color: white;
}

#add-cart-button:hover {
  background-color: black;
}
</style>
