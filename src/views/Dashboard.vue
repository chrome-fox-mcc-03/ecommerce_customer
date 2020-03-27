<template>
  <div class="dashboard">
    <div class="dashboard-highlight uk-flex-center uk-child-width-expand@s" uk-grid>
      <div uk-slider="center: true; autoplay: true; autoplay-interval: 3500">
        <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">
          <ul class="uk-slider-items uk-child-width-1-2@s uk-grid">
            <product-highlight v-for="(highlight, index) in highlights" :key="index" :highlight="highlight"></product-highlight>
          </ul>
          <a class="uk-position-center-left uk-position-small" uk-slidenav-previous uk-slider-item="previous"></a>
          <a class="uk-position-center-right uk-position-small" uk-slidenav-next uk-slider-item="next"></a>
        </div>
        <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
      </div>
    </div>
    <div class="dashboard-list uk-flex-center uk-child-width-expand@s" uk-grid>
      <product-card v-for="product in products" :key="product.id" :product="product"></product-card>
    </div>
    <a class="to-top" uk-totop uk-scroll></a>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
import ProductHighlight from '../components/ProductHighlight'
export default {
  data () {
    return {
      products: [],
      isLoading: false,
      highlights: []
    }
  },
  components: {
    ProductCard,
    ProductHighlight
  },
  methods: {
    fetchProducts () {
      this.isLoading = true
      this.$store.dispatch('getProducts')
        .then(response => {
          this.products = [...response.data.response]
          for (let i = 0; i < 5; i++) {
            const random = Math.floor(Math.random() * this.products.length) + 1
            this.highlights.push(this.products[random])
          }
        })
        .catch(err => {
          this.errMessage = err.response
        })
        .finally(_ => {
          this.isLoading = false
        })
    }
  },
  created () {
    this.isLoading = true
    this.fetchProducts()
    // this.highlight = this.$store.state.highlight
  }
}
</script>

<style scoped>
.dashboard{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.dashboard-highlight{
  left: auto;
  margin: auto;
  width: 45%;
}
.uk-position-small{
  color: black;
}
.uk-position-small:hover{
  color: gray;
}
.to-top{
  position: fixed;
  right: 2%;
  bottom: 5%;
  background-color: #e84a5f;
  color: white;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
            0 2px 2px rgba(0,0,0,0.12),
            0 4px 4px rgba(0,0,0,0.12),
            0 8px 8px rgba(0,0,0,0.12),
            0 16px 16px rgba(0,0,0,0.12);
}
.to-top:hover{
  transform: scale(1.3);
}
</style>
