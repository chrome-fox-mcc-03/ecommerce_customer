<template>
  <div class="cart-card">
    <div class="cart-img">
      <img :src="`${cart.Product.image_url}`" class="shoes-img" alt="shoes">
    </div>
    <div class="cart-desc">
      <h2>{{ cart.Product.name }}</h2>
      <p>{{ cart.Product.category }}</p>
    </div>
    <div class="cart-qty">
      <div @click="increase(cart.id)">
        <i class="fas fa-caret-square-up"></i>
      </div>
      <h2>{{ cart.product_qty }}</h2>
      <div @click="decrease(cart.id)">
        <i class="fas fa-caret-square-down"></i>
      </div>
    </div>
    <div class="cart-price">
      <h2>IDR {{ subtotal }}</h2>
    </div>
    <div class="add-btn">
      <img @click="deleteCart(cart.id)" src="../assets/dlt-x.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['cart'],
  methods: {
    increase (cartId) {
      this.$store.dispatch('increase', cartId)
        .then(({ data }) => {
          console.log(data)
          this.$router.push('/cart')
          this.$store.dispatch('fetchCarts')
          this.$store.commit('ADD_TOTAL', this.subtotal)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    decrease (cartId) {
      this.$store.dispatch('decrease', cartId)
        .then(({ data }) => {
          console.log(data)
          this.$router.push('/cart')
          this.$store.dispatch('fetchCarts')
          this.$store.commit('SUBSTRACT_TOTAL', this.subtotal)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    deleteCart (cartId) {
      this.$store.dispatch('deleteCart', cartId)
        .then(({ data }) => {
          console.log(data)
          this.$router.push('/cart')
          this.$store.dispatch('fetchCarts')
          this.$store.commit('SUBSTRACT_TOTAL', this.subtotal)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  computed: {
    subtotal () {
      return this.cart.Product.price * this.cart.product_qty
    }
  }
}
</script>

<style lang="scss">

.cart-card {
  height: 10rem;
  width: 100%;
  background-color: $primary;
  display: flex;
  margin-bottom: 1rem;
  box-shadow: 4px 5px 6px -2px rgba(0,0,0,0.26);
  p {
    margin: 0;
  }
  position: relative;
}
.cart-img {
  @include flexCenterCol();
  width: 20%;
  background-color: rgb(255, 255, 255);
}
.cart-desc {
  @include flexCenterCol();
  padding: 1rem 2rem;
  align-items: flex-start;
  width: 40%;
  // background-color: rgb(172, 37, 37);
  h2 {
    margin: 0;
    font-weight: 600;
    color: white;
  }
}
.cart-qty {
  @include flexCenterCol();
  width: 10%;
  h2 {
    margin: .5rem 0;
    color: white;
  }
  // background-color: rgb(212, 29, 29);
}
.cart-price {
  @include flexCenterCol();
  padding: 1rem .5rem;
  width: 30%;
  h2 {
    margin: .5rem 0;
    color: white;
  }
  // background-color: rgb(255, 47, 47);
}
.fa-caret-square-up {
  transition: .3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
    color: rgb(39, 200, 221);
  }
}
.fa-caret-square-down {
  transition: .3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
    color: rgb(255, 105, 5);
  }
}
.add-btn {
  img {
    width: 30px;
    height: 30px;
  }
}
</style>
