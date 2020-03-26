<template>
<div class="row border" style="margin-top: -1px" data-app>
  <div class="col-12 col-sm-12 col-md-2 text-center">
      <img class="img-responsive" :src="product.imageUrl" alt="prewiew" width="120">
  </div>
  <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
    <h5 class="product-name"><strong>{{product.name}}</strong></h5>
    <h5>
      <small>{{product.description}}</small>
    </h5>
  </div>
  <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row d-flex align-items-center">
    <div class="col-3 col-sm-3 col-md-6 text-md-right pr-0">
      <h6><strong>Rp {{formattedPrice}} <span class="text-muted">x</span></strong></h6>
    </div>
    <div class="col-md-4">
      <div class="quantity">
        <input type="button" @click="increment" value="+" class="plus">
        <input type="number" v-model="cart.quantity" class="qty">
        <input type="button" @click="decrement" value="-" class="minus">
      </div>
    </div>
    <div class="col-2 col-sm-2 col-md-2 text-right">
      <v-btn class="mx-2" fab dark small style="background-color: #dc3545" @click="delDialog = true">
        <v-icon dark>mdi-delete</v-icon>
      </v-btn>
      <v-dialog v-model="delDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure?</v-card-title>
          <v-card-text>You won't be able to revert this!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="delDialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="deleteItem(cart.id)">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
  <hr>
</div>
</template>

<script>
export default {
  name: 'CartBody',
  props: ['cart'],
  data () {
    return {
      delDialog: false
    }
  },
  computed: {
    product () {
      return this.cart.Product
    },
    formattedPrice () {
      return this.product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  },
  methods: {
    deleteItem (id) {
      this.$store.dispatch('deleteItem', id)
    },
    increment () {
      this.cart.quantity += 1
    },
    decrement () {
      if (this.cart.quantity > 1) this.cart.quantity -= 1
    }
  }
}
</script>

<style>
.compacted {
    width: 10px;
}
</style>
