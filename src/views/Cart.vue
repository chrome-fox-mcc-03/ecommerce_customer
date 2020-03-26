<template>
<div class="container">
    <div class="layout-card">
        <div class="card card-item">
            <ItemCart v-for="(item) in items" :key="item.id" :item="item" @inputQty='inputQty'  @deleteCart='deleteCart' @rupiahFormat='rupiahFormat' />
        </div>
        <div class="card card-total">
            <div class="content">
                <div class="media">
                  <div class="Header-amount">
                    <h3 class="title is-4">Shopping Summary</h3>
                  </div>
                  <div class="body-amount">
                    <h4>Total Price:</h4>
                    <h4><b>{{totalPrice}}</b></h4>
                  </div>
                  <div class="footer-amount">
                    <b-button @click="buySubmit" type="is-primary" expanded rounded>Buy ({{totalItems}})</b-button>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ItemCart from '../components/ItemCart'
export default {
  name: 'Cart',
  data () {
    return {
      items: [],
      totalPrice: 0,
      totalItems: 0
    }
  },
  components: {
    ItemCart
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
        .then(response => {
          const { data } = response
          this.items = data.sort((a, b) => a.id - b.id)
          this.totalAmount(this.items)
        })
        .catch(error => {
          const errors = error.response.data.errors
          this.$buefy.toast.open({
            duration: 3000,
            message: errors[0],
            position: 'is-top',
            type: 'is-danger'
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    },
    inputQty (payload) {
      this.$store.dispatch('updateCart', payload)
        .then(response => {
          this.getCart()
        })
        .catch(error => {
          const errors = error.response.data.errors
          this.$buefy.toast.open({
            duration: 3000,
            message: errors[0],
            position: 'is-top',
            type: 'is-danger'
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    },
    deleteCart (CartItemId) {
      this.$store.dispatch('deleteCart', CartItemId)
        .then(response => {
          console.log(response)
          this.getCart()
        })
        .catch(error => {
          const errors = error.response.data.errors
          this.$buefy.toast.open({
            duration: 3000,
            message: errors[0],
            position: 'is-top',
            type: 'is-danger'
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    },
    totalAmount (data) {
      let amount = 0
      let item = 0
      for (let i = 0; i < data.length; i++) {
        amount += (data[i].quantity * data[i].Product.price)
        item += data[i].quantity
      }
      amount = this.rupiahFormat(amount)
      this.totalItems = item
      this.totalPrice = amount
    },
    rupiahFormat (price) {
      const priceString = price.toString().split('').reverse().join('')
      let rupiah = ''
      for (let i = 0; i < priceString.length; i++) {
        if (i % 3 === 0) rupiah += priceString.substr(i, 3) + '.'
      }
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    },
    buySubmit () {
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Coming Soon',
        position: 'is-top',
        type: 'is-success'
      })
    }
  },
  created () {
    this.getCart()
  }

}
</script>

<style scoped>
.layout-card{
    display: flex;
    justify-content: center;
    align-content: flex-start;
    align-items: flex-start;
    height: 100vh;
    padding: 10px;
}

.card-item{
    width: 55%;
    margin-right: 10px;
    border-radius: 10px;
}

.card-total{
    width: 30%;
    height: 20%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
}

.media{
  padding: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
}

.content{
  width: 90%;
}

.body-amount{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.footer-amount{
  width: 100%;
}

</style>
