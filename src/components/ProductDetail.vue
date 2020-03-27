<template>
  <div uk-modal>
    <div class="uk-modal-dialog">
      <button class="uk-modal-close-default" type="button" uk-close></button>
      <div class="uk-modal-header">
        <h2 class="uk-modal-title">{{ product.name }}</h2>
      </div>
      <div class="uk-modal-body">
        <img :src="product.image_url" alt="">
        <p>{{ product.description }}</p>
        <p>Stock available: {{ product.stock }}</p>
        <p>Price: {{ getRupiah }}</p>
        <div class="uk-margin">
          <div uk-form-custom="target: > * > span:first-child">
            <label for="">Quantity: </label>
            <select v-model="addQuantity">>
              <option v-for="(option, index) in product.stock" :key="index" :value="index+1">{{ index+1 }}</option>
            </select>
            <button class="uk-button uk-button-default" type="button" tabindex="-1">
              <span></span>
              <span uk-icon="icon: chevron-down"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="uk-modal-footer uk-text-right uk-flex uk-flex-around">
        <button @click.prevent="addToCart" class="uk-button uk-button-text btn-add" type="button">Add to Cart</button>
        <button class="uk-button uk-button-text uk-modal-close btn-cancel" type="button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import UIkit from 'uikit'
export default {
  data () {
    return {
      addQuantity: 1,
      addId: this.product.id
    }
  },
  props: ['product'],
  computed: {
    getRupiah () {
      let rupiah = ''
      const pricerev = this.product.price.toString().split('').reverse().join('')
      for (let i = 0; i < pricerev.length; i++) if (i % 3 === 0) rupiah += pricerev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  },
  methods: {
    addToCart () {
      const payload = {
        id: this.addId,
        quantity: this.addQuantity
      }
      this.$store.dispatch('addToCart', payload)
        .then(response => {
          UIkit.modal(`#product-detail-${this.product.id}`).hide()
          UIkit.notification({
            message: `Successfully add ${this.product.name} to cart`,
            status: 'success',
            pos: 'top-center',
            timeout: 1000
          })
        })
        .catch(err => {
          UIkit.notification({
            message: err.response.data.message + ' please check your shopping cart',
            status: 'danger',
            pos: 'top-center',
            timeout: 2500
          })
        })
        .finally(() => {

        })
    }
  }
}
</script>

<style scoped>
.btn-cancel:hover {
  background-color: rgba(255, 15, 15, 0.2);
  border-radius: 5px;
  transform: scale(1.5, 1.5);
}

.btn-add:hover {
  background-color: rgba(15, 135, 255, 0.2);
  border-radius: 5px;
  transform: scale(1.5, 1.5);
}
</style>
