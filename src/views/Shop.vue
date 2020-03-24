<template>
  <div class="shop container-fluid">
    <b-overlay :show="$store.state.pageLoading" rounded="sm">
      <b-card-group columns>
        <b-card
          v-for="(item, i) in products"
          :key="i"
          :title="item.name"
          :img-src="item.image_url"
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
            Seller: {{ item.seller }}
          </b-card-text>
          <b-card-body>
            <b-button @click="submitToCart(item.id)" variant="success" size="sm">Add To My Cart</b-button>
          </b-card-body>
        </b-card>
      </b-card-group>
    </b-overlay>
  </div>
</template>

<script>
import {
  BCardGroup,
  BCard,
  BCardText,
  BCardBody,
  BButton,
  BOverlay
} from 'bootstrap-vue'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      products: state => state.products
    })
  },
  methods: {
    submitToCart (id) {
      console.log(id)
    },
    ...mapActions({
      fetchProduct: 'fetchFromShop'
    })
  },
  created () {
    this.fetchProduct()
    console.log(this.products)
  },
  components: {
    BCardGroup,
    BCard,
    BCardText,
    BCardBody,
    BButton,
    BOverlay
  }
}
</script>

<style scoped>
  .shop{
    height: 90vh;
    overflow-y: scroll;
    overflow-x: hidden;
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
