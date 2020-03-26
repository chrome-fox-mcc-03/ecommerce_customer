<template>
    <div>
        <h1 class="title is-2 has-text-black-ter is-family-secondary has-text-centered">Checkout History</h1><br>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-three-quarters">
            <router-link to="/cart" class="button is-primary is-outlined is-rounded">
                View Cart
            </router-link>
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th><abbr title="ID">#</abbr></th>
                            <th>Product</th>
                            <th style="text-align: center">Quantity</th>
                            <th style="text-align: right">Price/item</th>
                            <th style="text-align: right">Total Paid</th>
                            <th style="text-align: center">Checkout at</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in paidCart" :key="index" >
                            <th>{{ index+1 }}</th>
                            <td>
                              <router-link :to="`/products/${item.Product.id}`">{{ item.Product.name }}
                              </router-link>
                            </td>
                            <td style="text-align: center">
                              {{ item.quantity }}
                            </td>
                            <td style="text-align: right">{{ item.Product.price | currency }}</td>
                            <td style="text-align: right">{{ item.totalPrice | currency }}</td>
                            <td style="text-align: center">
                              {{ new Date(item.updatedAt).toString().substring(4, 25) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column"></div>
        </div>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-three-quarters">
                <div class="columns">
                    <div class="column is-3"></div>
                    <div class="column is-3">
                        <p class="is-size-4" style="text-align: right">Total Spent:</p>
                    </div>
                    <div class="column is-3" style="text-align: right">
                        <p class="is-size-4 has-text-weight-semibold">
                            {{ totalPaid | currency }}
                        </p>
                    </div>
                    <div class="column is-3" style="text-align: right">
                    </div>
                </div>
            </div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Cart',
  computed: {
    paidCart () {
      return this.$store.getters.getPaidCart
    },
    totalPaid () {
      const arrTotalPrice = this.paidCart.map((el) => {
        return el.totalPrice
      })
      return arrTotalPrice.reduce((a, b) => a + b, 0)
    }
  }
}
</script>

<style scoped>
    div.column.is-4 {
        text-align: center;
    }
</style>
