<template>
  <div class="uk-card uk-card-hover uk-width-1-5@m">
    <div v-if="loading" class="loading-screen">
      <loading>Please Wait</loading>
    </div>
    <div class="uk-card-header" :href="`#product-detail-${product.id}`" uk-toggle>
        <div class="uk-grid-small uk-flex-middle">
            <div class="uk-width-auto product-image-container">
              <img v-show="!picLoading" @load="picLoaded()" :src="product.image_url" width="140" height="140" :alt="product.name">
              <loading-pic v-show="picLoading"></loading-pic>
            </div>
        </div>
    </div>
    <div class="uk-card-body" :href="`#product-detail-${product.id}`" uk-toggle>
        <h3 class="uk-overflow-hidden">{{ product.name }}</h3>
        <p style="cursor: default;">{{ getRupiah }}</p>
        <p style="cursor: default;">Stock: {{ product.stock }}</p>
    </div>
    <div class="uk-card-footer">
        <div class="footer-nav">
        <a class="uk-button uk-button-text btn-detail" :href="`#product-detail-${product.id}`" uk-toggle>Detail</a>
          |
        <button @click.prevent="addToCart" class="uk-button uk-button-text btn-add">Add to Cart</button>
        </div>
    </div>
    <product-detail :product="product" :id="'product-detail-'+product.id"></product-detail>
  </div>
</template>

<script>
import LoadingPic from '../components/LoadingPic'
import UIkit from 'uikit'
import Loading from '../components/Loading'
import ProductDetail from '../components/ProductDetail'
export default {
  data () {
    return {
      addQuantity: 1,
      priceRupiah: '',
      picLoading: true,
      loading: false
    }
  },
  methods: {
    deleteProduct () {
      this.loading = true
      this.$store.dispatch('deleteProduct', this.product.id)
        .then(response => {
          this.$emit('fetchProducts')
        })
        .catch(err => {
          if (err.response.status === 403) {
            const errors = err.response.data.message
            UIkit.notification({
              message: `${errors}`,
              status: 'danger',
              pos: 'top-right',
              timeout: 1500
            })
          } else {
            UIkit.notification({
              message: 'Product not found! Please refresh page',
              status: 'danger',
              pos: 'bottom-center',
              timeout: 1500
            })
          }
        })
        .finally(_ => {
          this.loading = false
        })
    },
    picLoaded () {
      this.picLoading = false
    }
  },
  props: ['product'],
  components: {
    LoadingPic,
    Loading,
    ProductDetail
  },
  computed: {
    getRupiah () {
      let rupiah = ''
      const pricerev = this.product.price.toString().split('').reverse().join('')
      for (let i = 0; i < pricerev.length; i++) if (i % 3 === 0) rupiah += pricerev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  },
  created () {
    this.priceRupiah = this.getRupiah
    this.$store.dispatch('getProducts')
  }
}

</script>

<style scoped>
.uk-card{
  margin: 10px;
  padding: 0;
  border: 1px solid lightgray;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.75);
}
.uk-card-header{
  max-height: 35%;
  min-height: 35%;
  padding-bottom: 15%;
}
.btn-detail:hover{
  background-color: rgba(255, 15, 15, 0.2);
  border-radius: 5px;
  transform: scale(1.2, 1.2);
}
.btn-add:hover{
  background-color: rgba(15, 135, 255, 0.2);
  border-radius: 5px;
  transform: scale(1.2, 1.2);
}
.product-image-container{
  display: flex;
  justify-content: center;
}
.uk-card-body{
  padding: 25px;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
p{
  margin: 0px;
  padding: 0px;
}
h3{
  font-size: 1.2em;
  font-weight: bold;
  text-overflow: clip clip;
}
.uk-card-footer{
  padding-bottom: 0;
}
.footer-nav{
  display: flex;
  justify-content: space-around;
}

.loading-screen{
  top: 0;
  left: 0;
  padding-top: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
