<template>
<div>
  <Navbar/>
  <section class="jumbotron text-center mt-5">
      <div class="container">
          <h1 class="jumbotron-heading">YOUR CART</h1>
      </div>
  </section>
  <div class="container mb-4">
      <div class="row">
          <div class="col-12">
              <div class="table-responsive">
                  <table class="table table-striped">
                      <thead>
                          <tr>
                              <th scope="col"> </th>
                              <th scope="col">Product</th>
                              <th scope="col">Available</th>
                              <th scope="col" class="text-center">Quantity</th>
                              <th scope="col" class="text-right">Price</th>
                              <th> </th>
                          </tr>
                      </thead>
                      <tbody v-if="products.length > 0">
                          <tr v-for="(product,i) in products" :key="i">
                              <td><img :src="`${image[i]}`" style="width:50px;height:50px" /> </td>
                              <td>{{nameProduct[i]}}</td>
                              <td>In stock</td>
                              <td><input class="form-control" type="number"  v-model="quantity[i]" @keyup="increment(i)" @click="increment(i)" /></td>
                              <td class="text-right">Rp {{price[i]}}</td>
                              <td class="text-right"><button class="btn btn-sm btn-danger" @click="deleteCart(idCart[i])"><i class="fa fa-trash"></i> </button> </td>
                          </tr>
                          <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td><strong>Total</strong></td>
                              <td class="text-right"><strong>Rp {{total}}</strong></td>
                          </tr>
                      </tbody>
                      <tr v-else>
                        <td colspan="6" class="text-center">Data Not Found</td>
                      </tr>
                  </table>
              </div>
          </div>
          <div class="col mb-2 mt-5">
              <div class="row">
                  <div class="col-sm-12  col-md-6">
                      <router-link class="btn btn-block btn-light" to="/" >Continue Shopping</router-link>
                  </div>
                  <div class="col-sm-12 col-md-6 text-right">
                      <button class="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <Footer class="footer" />
</div>
</template>

<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default {
  data () {
    return {
      products: [],
      idCart: [],
      nameProduct: [],
      quantity: [],
      fixedPrice: [],
      price: [],
      image: [],
      total: 0
    }
  },
  components: {
    Navbar,
    Footer
  },
  methods: {
    deleteCart (idCart) {
      this.$store.commit('SET_ISLOADING', true)
      this.$store.dispatch('deleteCart', { idCart })
        .then((data) => {
          return this.$store.dispatch('getCartByUserId')
        })
        .then((result) => {
          this.products = result.data
          this.nameProduct = result.data.map((el) => { return el.Product.name })
          this.idCart = result.data.map((el) => { return el.id })
          this.quantity = result.data.map((el) => { return el.quantity })
          this.fixedPrice = result.data.map((el) => { return el.Product.price })
          this.price = result.data.map((el) => { return el.Product.price })
          this.image = result.data.map((el) => { return el.Product.image_url })
          for (let i = 0; i < this.price.length; i++) {
            for (let j = 0; j < this.quantity.length; j++) {
              if (i === j) {
                this.price[i] *= this.quantity[j]
                break
              }
            }
          }
          this.total = this.price.reduce((accumulator, currentValue) => { return accumulator + currentValue })
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.$store.commit('SET_ISLOADING', false)
        })
    },
    increment (index) {
      this.price[index] = this.fixedPrice[index] * this.quantity[index]
      this.total = this.price.reduce((accumulator, currentValue) => { return accumulator + currentValue })
      console.log(index)
    }
  },
  created () {
    this.$store.commit('SET_ISLOADING', true)
    this.$store.dispatch('getCartByUserId')
      .then((result) => {
        this.products = result.data
        this.nameProduct = result.data.map((el) => { return el.Product.name })
        this.idCart = result.data.map((el) => { return el.id })
        this.quantity = result.data.map((el) => { return el.quantity })
        this.fixedPrice = result.data.map((el) => { return el.Product.price })
        this.price = result.data.map((el) => { return el.Product.price })
        this.image = result.data.map((el) => { return el.Product.image_url })
        for (let i = 0; i < this.price.length; i++) {
          for (let j = 0; j < this.quantity.length; j++) {
            if (i === j) {
              this.price[i] *= this.quantity[j]
              break
            }
          }
        }
        this.total = this.price.reduce((accumulator, currentValue) => { return accumulator + currentValue })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.$store.commit('SET_ISLOADING', false)
      })
  }
}
</script>

<style scoped>
.footer {
  margin-top: 16.3rem;
}
</style>
