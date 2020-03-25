<template>
  <div>
    <b-overlay :show="$store.state.pageLoading" rounded="sm">
      <div class="cart-view overflow-auto">
        <b-table responsive :sticky-header="true" striped hover :items="$store.state.customerCart" :fields="fields">
          <template v-slot:cell(total_price)="items">{{ items.item.quantity * items.item.price }}</template>
          <template v-slot:cell(image)="items">
            <b-img-lazy
              :src="items.item.image_url"
              height="75px"
            >
            </b-img-lazy>
          </template>
          <template v-slot:cell(quantity)="items">
            <b-input-group style="width:150px;">
              <b-form-input
                :disabled="toggleQty"
                size="sm"
                v-model="items.item.quantity"
                type="number"
                :max="items.item.stock"
                min="0"
              >
              </b-form-input>
              <b-input-group-append>
                <b-button
                  squared-left
                  size="sm"
                  variant="outline-success"
                  @click="attemptUpdate(items.item.id, items.item.quantity)"
                >
                  Update
                </b-button>
              </b-input-group-append>
            </b-input-group>
            <!-- {{ items.item.quantity  }} -->
          </template>
          <template v-slot:cell(actions)="items">
            <b-button
              squared
              class="mx-1"
              size="sm"
              variant="danger"
              @click="attemptDelete(items.item.id)"
            >
              Delete
            </b-button>
          </template>
        </b-table>
      </div>
      <div class="my-1">
        <b-button @click="clearCart" class="mx-1">Clear all</b-button>
        <b-button @click="checkoutCart" class="mx-1">Checkout</b-button>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import {
  BOverlay,
  BTable,
  BButton,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImgLazy
} from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      fields: ['id', 'image', 'name', 'quantity', 'price', 'total_price', 'actions'],
      toggleQty: true
    }
  },
  methods: {
    attemptUpdate (id, qty) {
      const payload = {
        cartItemId: id,
        qty
      }
      if (this.toggleQty === true) {
        this.toggleQty = false
      } else {
        // console.log('update qty', payload)
        if (qty === 0) {
          // delete
          this.deleteCartItem({ cartItemId: id })
        } else {
          // update
          this.updateCartItemQty(payload)
        }
      }
    },
    attemptDelete (id) {
      // console.log('delete cart', id)
      this.deleteCartItem({ cartItemId: id })
    },
    clearCart () {
      console.log('clear')
    },
    checkoutCart () {
      console.log('checkout')
    },
    ...mapActions({
      fetchCart: 'fetchCart',
      deleteCartItem: 'deleteCartItem',
      updateCartItemQty: 'updateCartItemQty'
    })
  },
  components: {
    BOverlay,
    BTable,
    BButton,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BImgLazy
  },
  created () {
    this.fetchCart()
    console.log(this.$store.state.customerCart)
  }
}
</script>

<style scoped>
  .cart-view {
    height: 80vh;
  }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #2d4659;
      box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  }
</style>
