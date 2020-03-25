<template>
    <div>
        <h1 class="title is-2 has-text-black-ter is-family-secondary has-text-centered">My Cart</h1><br>
        <div v-if="!isCartEmpty" class="columns">
            <div class="column"></div>
            <div class="column is-three-quarters">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th><abbr title="ID">#</abbr></th>
                            <th>Product</th>
                            <th style="text-align: center">Quantity</th>
                            <th>Price/item</th>
                            <th>Total Price</th>
                            <th style="text-align: center">Remove Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in cart" :key="index" >
                            <th>{{ index+1 }}</th>
                            <td>
                                <router-link :to="`/products/${item.Product.id}`">{{ item.Product.name }}
                                </router-link>
                            </td>
                            <td>
                                <div class="columns">
                                    <div class="column is-4">
                                        <a @click="reduceFromCart(item.id)" class="button is-warning is-small">
                                            <i class="fas fa-minus"></i>
                                        </a>
                                    </div>
                                    <div class="column is-4">
                                        {{ item.quantity }}
                                    </div>
                                    <div class="column is-4">
                                        <a @click="addToCart(item.Product.id)" class="button is-success is-small">
                                            <i class="fas fa-plus"></i>
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td>{{ item.Product.price }}</td>
                            <td>{{ item.totalPrice }}</td>
                            <td style="text-align: center">
                                <a @click="deleteItem(item.id)" class="button is-danger is-small">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column"></div>
        </div>
        <div v-if="!isCartEmpty" class="columns">
            <div class="column"></div>
            <div class="column is-three-quarters">
                <div style="text-align: right" class="column is-4 is-offset-8">
                    <router-link to='/cart' class="button is-link">
                        <i class="fas fa-money-check"></i>
                        <p class="has-text-link">...</p>
                        Pay Now
                    </router-link>
                </div>
            </div>
            <div class="column"></div>
        </div>
        <div v-if="isCartEmpty" class="columns">
            <div class="column"></div>
                <div class="column is-one-third">
                    <lottie-player
                        src="https://assets10.lottiefiles.com/datafiles/vhvOcuUkH41HdrL/data.json"
                        background="transparent"
                        speed="1"
                        style="width: 500px; height: 500px;"
                        loop
                        autoplay >
                    </lottie-player>
                </div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Cart',
  computed: {
    cart () {
      return this.$store.state.cart
    },
    isCartEmpty () {
      if (this.$store.state.cart.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
    },
    reduceFromCart (id) {
      this.$store.dispatch('reduceFromCart', id)
    },
    deleteItem (id) {
      this.$store.dispatch('deleteItem', id)
    }
  }
}
</script>

<style scoped>
    div.column.is-4 {
        text-align: center;
    }
</style>
