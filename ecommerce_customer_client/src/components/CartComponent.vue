<template>
    <div style="right:0; left:auto; min-width:20vw">
        <div>
            <div class="py-1 px-2 d-flex justify-content-between"
                v-for="item in cart" :key="item.id"
            >
                <div>
                  <b-img thumbnail fluid :src="item.product.image_url" alt="Image 1" style="width:50px"></b-img>
                    <strong>{{item.product.name}}</strong>
                    <br>
                    Qty : {{item.quantity}} x {{item.product.price | currency}}
                    <hr>
                </div>
                <div>
                    <a href="#" class="badge badge-secondary" @click.prevent="removeProduct(item.product)">remove</a>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between px-2">
            <span>Total Price : {{countTotalPrice | currency}}</span>
            <a href="#" @click.prevent="removeAllProduct()">Clear Cart</a>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CartComponent',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['countTotalPrice'])
  },
  methods: {
    removeProduct (product) {
      this.$store.dispatch('removeProduct', { product })
    },
    removeAllProduct () {
      this.$store.dispatch('removeAllProduct')
    }
  },
  mounted () {
    this.$store.dispatch('fetchCart')
    // console.log(this.cart, 'cart component')
  }

}
</script>

<style>

</style>
