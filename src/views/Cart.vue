<template>
<div class="container">
    <div class="layout-card">
        <div class="card card-item">
            <ItemCart v-for="(item) in items" :key="item.id" :item="item" @inputQty='inputQty'  @deleteCart='deleteCart' />
        </div>
        <div class="card card-total">
            <div class="content">
                <div class="media">
                    <h3>ini total belanja</h3>
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
      items: []
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
        })
        .catch(error => {
          console.log(error, 'ini error')
        })
    },
    inputQty (payload) {
      this.$store.dispatch('updateCart', payload)
        .then(response => {
          console.log(response)
          this.getCart()
        })
        .catch(error => {
          console.log(error, 'ini error')
        })
    },
    deleteCart (CartItemId) {
      this.$store.dispatch('deleteCart', CartItemId)
        .then(response => {
          console.log(response)
          this.getCart()
        })
        .catch(error => {
          console.log(error, 'ini error')
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
    border-radius: 10px;
}

</style>
