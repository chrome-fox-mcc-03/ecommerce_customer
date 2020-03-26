<template>
    <div class="card is-rounded card-product" shadow>
        <div class="klik" @click.prevent="goToDetail(product.id)">
            <div class="card-image is-rounded">
            <figure class="image is-rounded">
            <img :src="product.image_url" alt="Placeholder image" class="img-card">
            </figure>
        </div>
        <div class="card-content">
            <p class="title is-5">
                {{product.name}}
            </p>
            <div class="media">
            <div class="media-left">
                <h3>{{this.rupiahFormat(product.price)}} </h3>
            </div>
            <div class="media-right">
                <h3></h3>
            </div>
            </div>
        </div>
        </div>
        <div class="card-footer">
          <b-tooltip
            :label="this.product.description"
            size="is-small"
            position="is-bottom"
            multilined>
            <button class="button is-primary" @click.prevent="addCart(product.id)" >
            <b-icon pack="fas" icon="cart-plus"></b-icon>
            <span>Add Cart</span>
          </button>
        </b-tooltip>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CardProduct',
  props: ['product'],
  methods: {
    goToDetail (productId) {
      alert(productId)
    },
    addCart (productId) {
      const payload = {
        ProductId: productId,
        quantity: 1
      }
      if (!this.isLogin) {
        this.$buefy.toast.open({
          duration: 3000,
          message: 'Please Login first',
          position: 'is-top',
          type: 'is-danger'
        })
      } else {
        this.$store.dispatch('addCart', payload)
          .then(response => {
            this.$buefy.snackbar.open({
              duration: 3000,
              message: 'Success add cart',
              type: 'is-success',
              position: 'is-top',
              actionText: 'see cart',
              queue: false,
              onAction: () => {
                this.$router.push('/cart')
              }
            })
          })
          .catch(error => {
            const errors = error.response.data.errors
            this.$buefy.toast.open({
              duration: 3000,
              message: errors[0],
              position: 'is-top-left',
              type: 'is-danger'
            })
          })
          .finally(_ => {
            this.$store.commit('SET_LOADING', false)
          })
      }
    },
    rupiahFormat (price) {
      const priceString = price.toString().split('').reverse().join('')
      let rupiah = ''
      for (let i = 0; i < priceString.length; i++) {
        if (i % 3 === 0) rupiah += priceString.substr(i, 3) + '.'
      }
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style scoped>
.img-card{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.card{
    width: 15%;
    height: 30%;
    margin: 5px;
}
.klik{
    cursor: pointer;
}
.card-content{
    padding-top: 3px;
    min-height: 15vh;
}
.title{
  min-height: 5vh;
}
.is-rounded{
    border-radius: 10px;
}
.card-footer{
    display: flex;
    justify-content: center;
    border: none;
    padding-top: 0px;
    padding-bottom: 5px;
}
</style>
