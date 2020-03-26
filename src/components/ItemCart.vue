<template>
  <div class="card-content">
                <div class="media">
                    <div class="media-left">
                    <figure class="image is-128x128">
                    <img :src="item.Product.image_url" alt="Placeholder image">
                    </figure>
                    </div>
                    <div class="media-content">
                    <p class="">{{item.Product.name}}</p>
                    <p class="">{{this.rupiahFormat(item.Product.price)}}</p>
                    <div class="cart-form">
                        <b-field label="Quantity">
                        <b-field grouped>
                        <b-numberinput size="is-small" v-model="quantity" @input="inputQty(item.id, quantity)" min="0" expanded>
                        </b-numberinput>
                        <p class="control">
                            <a @click="deleteCart(item.id)">
                        <b-icon pack="fas" icon="trash" type="is-danger" >halo</b-icon>
                            </a>
                        </p>
                        </b-field>
                        </b-field>
                    </div>
                    </div>
                </div>
            </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['item'],
  data () {
    return {
      quantity: this.item.quantity
    }
  },
  methods: {
    inputQty (itemId, quantity) {
      const payload = {
        CartItemId: itemId,
        quantity
      }
      this.$emit('inputQty', payload)
    },
    deleteCart (CartItemId) {
      console.log(CartItemId, 'ini delete')
      this.$emit('deleteCart', CartItemId)
    },
    rupiahFormat (price) {
      const priceString = price.toString().split('').reverse().join('')
      let rupiah = ''
      for (let i = 0; i < priceString.length; i++) {
        if (i % 3 === 0) rupiah += priceString.substr(i, 3) + '.'
      }
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  }
}
</script>

<style scoped>
.card-content{
    display: flex;
}

.cart-form{
    display: flex;
    padding: 0;
    margin-top: 2px;
}

.klik{
    cursor: pointer;
}
</style>
