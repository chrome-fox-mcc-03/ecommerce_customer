<template>
  <div id="item-details" class="row">
    <div class="col s12">
      <h2 class="header">{{ item.name }}</h2>
      <div class="card horizontal">
        <div class="card-image">
          <img :src="item.imageUrl">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <h3>Rp {{ price }}</h3>
            <h5>Stock: {{ item.stock }}</h5>
            <p>{{ item.Category.name }}</p>
            <div class="row">
              <div class="col s2 quantity-btn">
                <a href="#" @click.prevent="decrease"><i class="material-icons right">remove_circle</i></a>
              </div>
              <form class="col 8">
                <div class="input-field inline">
                  <input id="quantity" type="number" min="1" class="validate" v-model="quantity">
                  <span class="helper-text" data-error="Order quantity invalid">Order quantity</span>
                </div>
              </form>
              <div class="col s2 quantity-btn">
                <a href="#" @click.prevent="increase"><i class="material-icons left">add_circle</i></a>
              </div>
            </div>
          </div>
          <div class="card-action">
            <a href="#" type="submit" class="waves-effect waves-light btn" @click.prevent="addToCart">Add to cart<i class="material-icons left">add_shopping_cart</i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemDetails',
  data () {
    return {
      quantity: 1
    }
  },
  props: {
    itemId: String
  },
  computed: {
    item () {
      return this.$store.state.item
    },
    price () {
      if (this.item.price) {
        return this.item.price.toLocaleString('id')
      } else {
        return null
      }
    }
  },
  methods: {
    increase () {
      this.quantity = Number(this.quantity)
      let increase = 1
      if (this.quantity === this.item.stock) increase = 0
      this.quantity += Number(increase)
    },
    decrease () {
      let decrease = 1
      if (this.quantity === 1) decrease = 0
      this.quantity -= decrease
    },
    addToCart () {
      if (this.quantity < 1) {
        this.$store.commit('ERROR', 'Cannot order less than 1 item')
      } else if (this.quantity > this.item.stock) {
        this.$store.commit('ERROR', 'Item stock unavailable')
      } else {
        this.$store.dispatch('addToCart', {
          quantity: this.quantity,
          ItemId: +this.itemId
        })
          .then(() => {})
          .catch(err => {
            if (err.status === 401) {
              localStorage.removeItem('token')
              localStorage.removeItem('username')
              this.$router.push('/')
            }
          })
        this.quantity = 1
      }
    }
  },
  created () {
    this.$store.dispatch('fetchOneItem', { itemId: +this.itemId })
  }
}
</script>

<style scoped>
  #item-details h3,
  #item-details h5,
  #item-details p{
    text-align: start;
  }
  #item-details form input {
    text-align: center;
  }
  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
  .quantity-btn {
    padding-top: 3vh;
  }
</style>
