<template>
  <div>
    <sui-card-group :items-per-row="1">
      <sui-card v-for="({ id, name, image_url, price, stock, Type }, i) in products" :key="i">
        <sui-image :src="image_url" />
        <sui-card-content>
          <sui-menu compact>
            <sui-card-header is="sui-menu-item">
              <sui-icon name="box" color="brown" /> Stock
              <sui-label color="red" floating>
                {{stock}}
              </sui-label>
            </sui-card-header>
          </sui-menu>
          <sui-card-description is="sui-label" :color="label(Type.type)" tag style="float: right;">
            {{Type.type}}
          </sui-card-description>
          <sui-card-header style="margin-top: 1vh;">{{name}}</sui-card-header>
          <sui-card-description>
            Rp. {{price.toLocaleString()}}
          </sui-card-description>
        </sui-card-content>
        <sui-button attached="bottom" color="green" @click="addToCart(id, i)">
          <sui-icon name="cart" /> Add to cart
        </sui-button>
      </sui-card>
    </sui-card-group>
  </div>
</template>

<script>
export default {
  name: 'ImageCard2Example',
  data () {
    return {
      cardOneActive: false
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    label (type) {
      if (type === 'helmet') {
        return 'red'
      } else {
        return 'blue'
      }
    },
    addToCart (id, idx) {
      this.$store.commit('SET_MODAL_ADD')
      this.$store.commit('SET_PRODUCT_ID', id)
      this.$store.commit('SET_PRODUCT_IDX', idx)
    }
  }
}
</script>
