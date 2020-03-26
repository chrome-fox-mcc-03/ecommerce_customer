<template>
<div class="container">
<div class="layout-product">
    <div class="card is-rounded card-product" shadow>
        <div class="card-image is-rounded">
            <figure class="image is-rounded">
            <img :src="image_url" alt="Placeholder image" class="img-card">
            </figure>
        </div>
        <div class="card-content">
            <p class="title is-5">
                {{name}}
            </p>
            <div class="media">
              <div class="media-left">
                <h3>{{this.rupiahFormat(price)}} </h3>
              </div>
            </div>
            <h3>{{description}}</h3>
        </div>
        <div class="card-footer">
            <button class="button is-primary" @click.prevent="addCart(id)" >
            <b-icon pack="fas" icon="cart-plus"></b-icon>
            <span>Add Cart</span>
          </button>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  name: 'DetailProduct',
  data () {
    return {
      id: '',
      name: '',
      price: '',
      stock: '',
      image_url: '',
      category: '',
      description: ''
    }
  },
  methods: {
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
  },
  created () {
    this.$store.dispatch('getProductById', this.$route.params.id)
      .then(response => {
        const data = response.data
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.stock = data.stock
        this.image_url = data.image_url
        this.category = data.category
        this.description = data.description
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
}
</script>

<style scoped>
.layout-product{
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
}
.img-card{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.card{
    width: 30%;
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
