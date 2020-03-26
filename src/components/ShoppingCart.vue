<template>
  <div>
    <button class="btn btn-primary" data-toggle="modal" data-target="#shoppingCart">Cart <i class="fa fa-shopping-cart"></i> ({{ numInCart }})</button>

    <div id="shoppingCart" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Shopping cart</h5>
            <button class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <b-alert v-if="message"
          variant="info"
          :show="dismissCountDown"
          @dismiss-count-down="countDownChanged"
          >{{ message }}</b-alert>
          <b-alert v-if="error"
          variant="danger"
          :show="dismissCountDown"
          @dismiss-count-down="countDownChanged"
          >{{ error }}</b-alert>
          <div>
            <b-spinner small label="Small Spinner" v-if="loading"></b-spinner>
        </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Total Price</th>
                  <th>Edit/Remove</th>
              </thead>
              <tbody>
                <tr v-for="item in totalCart" :key='item.id'>
                  <td>{{ item.name.split(':')[0] }}</td>
                  <td>{{ item.price | rupiah }}</td>
                  <td><input type="number" class="form-control-sm"
                           style="width:5em"
                           :value="item.quantity"
                           v-on:input="handleQuantityChange($event, item.stock)"/></td>
                  <td>{{ item.totalPrice | rupiah }}</td>
                  <td>
                    <button class="btn btn-sm btn-success mr-3" @click="updateQuantity(item.id)"><i class="fa fa-check"></i></button>
                    <button class="btn btn-sm btn-danger" @click="removeFromCart(item.id)">&times;</button>
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>{{ total | rupiah }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">Keep shopping</button>
            <b-button v-b-modal.modal-multi-1 variant="primary" data-dismiss="modal">Check out</b-button>
            <b-modal id="modal-multi-1" size="sm" title="PROCEED TO PAYMENT" ok-only ok-title="Cancel" no-stacking>
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">

                  <b-form-group label="Your Name:">
                    <b-form-input
                      v-model="form.name"
                      required
                      placeholder="Enter name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Card Number:">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fa fa-credit-card"></i></span>
                        </div>
                        <input v-model="form.cardNumber" class="form-control" placeholder="#### #### #### ####" required v-cardformat:formatCardNumber>
                    </div>
                  </b-form-group>

                  <b-form-group label="Card Expiry:">
                    <input v-model="form.cardExpiry" class="form-control" placeholder="MM/YYYY" required v-cardformat:formatCardExpiry>
                  </b-form-group>

                  <b-form-group label="Card CVC:">
                    <input v-model="form.cardCVC" class="form-control" placeholder="###" required v-cardformat:formatCardCVC>
                  </b-form-group>
                  <div>
                      <b-spinner small label="Small Spinner" v-if="loading"></b-spinner>
                  </div>
                  <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
                  <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { rupiah } from '../filters'

export default {
  name: 'ShoppingCart',
  data () {
    return {
      quantity: 0,
      error: '',
      dismissCountDown: 2,
      loading: false,
      message: false,
      form: {
        name: '',
        cardNumber: '',
        cardCVC: '',
        cardExpiry: ''
      },
      show: true
    }
  },
  computed: {
    numInCart () {
      this.fetchCart()
      let quantity = 0
      this.$store.state.cart.forEach(el => {
        quantity += el.quantity
      })
      return quantity
    },
    totalCart () {
      this.fetchCart()
      return this.$store.state.cart
    },
    total () {
      return this.$store.state.cart.reduce((acc, cur) => acc + cur.totalPrice, 0)
    }
  },
  filters: {
    rupiah
  },
  methods: {
    ...mapActions(['fetchCart', 'updateCart', 'checkoutCart']),
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    removeFromCart (id) {
      this.error = ''
      this.loading = true
      this.$store.dispatch('deleteCart', id)
        .then(result => {
          this.fetchCart()
          this.message = 'success remove cart'
          this.loading = false
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
      this.message = false
      this.dismissCountDown = 2
    },
    handleQuantityChange (e, stock) {
      this.message = false
      if (e.target.value > 0) {
        if (e.target.value > stock) {
          this.error = 'stock has reached maximum'
          e.target.value = stock
        } else {
          this.quantity = e.target.value
        }
      } else {
        this.quantity = 1
        e.target.value = this.quantity
      }
      this.dismissCountDown = 4
    },
    updateQuantity (id) {
      this.error = ''
      this.loading = true
      const data = {
        id,
        quantity: this.quantity
      }
      this.updateCart(data)
        .then(result => {
          this.fetchCart()
          this.message = 'success update quantity'
          this.loading = false
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
      this.message = false
      this.dismissCountDown = 2
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.loading = true
      this.$store.state.cart.forEach(el => {
        this.checkoutCart({
          id: el.id,
          ProductId: el.ProductId,
          quantity: el.quantity
        })
      })
      this.loading = false
      this.$router.push('history')
      this.fetchCart()
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.cardNumber = ''
      this.form.cardCVC = ''
      this.form.cardExpiry = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  created () {
    this.fetchCart()
  }

}
</script>

<style scoped>
.table td, .table th {
    padding: 0.3rem;
}
</style>
