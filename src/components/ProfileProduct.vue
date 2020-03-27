<template>
    <tr>
      <td>{{ index }}</td>
      <td><img class="uk-preserve-width" :src="productInCart.Product.image_url" width="50" alt=""></td>
      <td>{{ productInCart.Product.name }}</td>
      <td>{{ productInCart.quantity }}</td>
      <td>{{ getInvoice }}</td>
      <td>{{ getStatus }}</td>
      <td>
        <div class="btn-action">
          <button :href="`#pay-confirmation-${productInCart.id}`" uk-toggle class="uk-button uk-button-text" type="button">Pay</button>
          |
          <button :href="`#delete-confirmation-${productInCart.id}`" uk-toggle class="uk-button uk-button-text" type="button">Remove</button>
        </div>
      </td>
      <!-- Delete confirmation modal -->
      <div :id="'delete-confirmation-'+productInCart.id" uk-modal>
        <div class="uk-modal-dialog uk-margin-auto-vertical">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="uk-modal-body" uk-overflow-auto>
            <h4>Are you sure want to remove {{ productInCart.Product.name }} </h4>
          </div>
          <div class="uk-modal-footer uk-text-right">
              <button class="uk-button uk-button-text uk-modal-close btn-cancel" type="button">Cancel</button>
              <button @click.prevent="removeItem" class="uk-button uk-button-text btn-remove" type="button">Remove</button>
          </div>
        </div>
      </div>

      <!-- Pay confirmation modal -->
      <div :id="'pay-confirmation-'+productInCart.id" uk-modal>
        <div class="uk-modal-dialog uk-margin-auto-vertical">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="uk-modal-header">
            <h2>Order Detail</h2>
          </div>
          <div class="uk-modal-body" uk-overflow-auto>
            <h2>{{ productInCart.Product.name }}</h2>
            <img :src="productInCart.Product.image_url" alt="">
            <p>Total Amount: <b>{{ getInvoice }}</b></p>
            <p>Quantity: <b>{{ productInCart.quantity }}</b></p>
          </div>
          <div class="uk-modal-footer uk-text-right">
              <button @click.prevent="pay" class="uk-button uk-button-text btn-remove" type="button">Pay</button>
              <button class="uk-button uk-button-text uk-modal-close btn-cancel" type="button">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="loading-buy">
        <loading-buy></loading-buy>
        <p>Your payment are being authorize, please wait a moment</p>
      </div>

      <!-- Payment confirmed -->
      <payment-confirmed></payment-confirmed>
    </tr>
</template>

<script>
import UIkit from 'uikit'
import LoadingBuy from './LoadingBuy'
import PaymentConfirmed from './PaymentConfirmed'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    LoadingBuy,
    PaymentConfirmed
  },
  props: ['productInCart', 'index'],
  created () {
  },
  methods: {
    pay () {
      this.isLoading = true
      this.$store.dispatch('pay', this.productInCart.id)
        .then(response => {
          UIkit.modal(`#pay-confirmation-${this.productInCart.id}`).hide()
          UIkit.modal('#payment-confirmed').show()
          setInterval(_ => {
            UIkit.modal('#payment-confirmed').hide()
          }, 1500)
          this.$emit('getCart')
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    removeItem () {
      this.isLoading = true
      this.$store.dispatch('removeItem', this.productInCart.id)
        .then(response => {
          UIkit.modal(`#delete-confirmation-${this.productInCart.id}`).hide()
          UIkit.notification({
            message: `Successfully remove ${this.productInCart.Product.name} from cart`,
            status: 'success',
            pos: 'top-center',
            timeout: 1500
          })
          this.$emit('getCart')
        })
        .catch(err => {
          UIkit.notification({
            message: err,
            status: 'danger',
            pos: 'top-center',
            timeout: 1500
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  computed: {
    getInvoice () {
      const invoice = this.productInCart.Product.price * this.productInCart.quantity
      let rupiah = ''
      const pricerev = invoice.toString().split('').reverse().join('')
      for (let i = 0; i < pricerev.length; i++) if (i % 3 === 0) rupiah += pricerev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    },
    getStatus () {
      return !this.productInCart.isPaid ? 'Not paid' : 'Paid'
    }
  }
}

</script>

<style scoped>
.btn-remove:hover{
  transform: scale(1.2);
  padding: 1px;
  border-radius: 5px;
}

.btn-cancel:hover{
  transform: scale(1.2);
  padding: 1px;
  border-radius: 5px;
}
.uk-modal-dialog{
  border-radius: 25px;
  text-align: center;
}
.uk-modal-body.uk-overflow-auto{
  min-height: 50px !important;
  max-height: 150px;
}
.uk-modal-footer{
  display: flex;
  justify-content: space-around;
  border-radius: 25px;
  border: none;
}
.uk-modal-header{
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom: #ff847c 3px solid;

}
.loading-buy{
  left: 0;
  top: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.8);
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
