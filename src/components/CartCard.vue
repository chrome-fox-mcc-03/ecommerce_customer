<template>
  <div class="card mb-3" style="border: none;">
    <div class="row no-gutters">
      <div class="col-md-2">
        <img :src="`${cart.Product.image}`" class="card-img" style="width: auto; height: 240px" alt="" />
      </div>
      <div class="col-md-10 item">
        <div class="card-body d-flex">
          <div class="d-flex col-md-2 col-sm-5 col-xs-10 value" style="max-width: 200px">
            <h5 class="card-title">{{ cart.Product.name }}</h5>
          </div>
          <div class="d-flex col-md-2 col-sm-5 col-xs-10 value">
            <h5 class="card-text">Rp. {{ cart.Product.price }}</h5>
          </div>
          <div class="d-flex col-md-2 col-sm-5 col-xs-10 quantity">
            <a @click.prevent="increase(cart.id)"><i class="fas fa-plus-circle"></i></a>
            <h5 class="card-text">{{ cart.quantity}}</h5>
            <a @click.prevent="decrease(cart.id)"><i class="fas fa-minus-circle"></i></a>
          </div>
          <div class="d-flex col-md-2 col-sm-5 col-xs-10 value">
            <h5 class="card-text">Rp. {{ total(cart.Product.price, cart.quantity) }}</h5>
          </div>
          <div class="d-flex col-md-2 col-sm-5 col-xs-10 option" >
            <a @click.prevent="deleteCart(cart.id)"><i class="fas fa-times-circle"></i></a>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'cartCard',
  props: ['cart'],
  methods: {
    total: function(price, quantity) {
      return price*quantity
    },
    increase: function (id) {
      this.$store.dispatch('increase', id)
      .then(_=> {
        this.$store.dispatch('fetchCart')
      })
      .catch(err => {
        console.log(err)
      })
    },
    decrease: function (id) {
      this.$store.dispatch('decrease', id)
      .then(_=> {
        this.$store.dispatch('fetchCart')
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteCart: function (id) {
      this.$store.dispatch('deleteCart', id)
      .then(_=> {
        this.$store.dispatch('fetchCart')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

.item{
  display: flex;
  align-content: center;
}

.card-body{
  justify-content: space-evenly;
  min-height: 150px;
}

.quantity,
.value,
.option{
  align-items: center;
  justify-content: space-evenly;
}

.quantity a{
  background: #494848;
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
}

.quantity a i{
  font-size: 20px;
  color: #fff;
  padding: 10px;
}

.option a{
  background: #494848;
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
}

.option a i{
  font-size: 20px;
  color: #fff;
  padding: 10px;
}

</style>