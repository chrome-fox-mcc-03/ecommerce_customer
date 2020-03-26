<template>
  <b-card
    :title="item.name"
    :img-src="item.image_url"
    v-if="(item.stock - onCart) > 0"
    img-alt="Image"
    img-top
  >
    <b-card-text>
      Price: {{ item.price }}
    </b-card-text>
    <b-card-text>
      Stock: {{ item.stock }}
    </b-card-text>
    <b-card-text>
      On Cart: {{ onCart }}
    </b-card-text>
    <b-card-body>
      <div class="row align-items-center">
        <div class="col-6">
          <b-form-input type="number" min="0" :max="(item.stock - onCart)" v-model="amount" id="input-small" size="sm" placeholder=""></b-form-input>
        </div>
        <div class="col-6">
          <b-button :disabled="amount === 0 || item.stock === 0 || onCart === item.stock" @click="submitToCart(item.id)" variant="success" size="sm">Add To My Cart</b-button>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardText,
  BCardBody,
  BButton,
  BFormInput
} from 'bootstrap-vue'
import { mapState } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    item: Object,
    idx: Number
  },
  data () {
    return {
      amount: 0,
      toastCount: 0,
      onCart: 0
    }
  },
  methods: {
    submitToCart (id) {
      const payload = {
        itemId: this.item.id,
        itemName: this.item.name,
        amount: this.amount
      }
      this.$store.dispatch('appendItemToCart', payload)
    }
  },
  computed: {
    ...mapState({
      customerCart: state => state.customerCart
    })
  },
  created () {
    this.customerCart.forEach(cartItem => {
      if (cartItem.itemId === this.item.id) {
        this.onCart = cartItem.quantity
      }
    })
  },
  components: {
    BCard,
    BCardText,
    BCardBody,
    BButton,
    BFormInput
  }
}
</script>
