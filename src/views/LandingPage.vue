<template>
  <div>
    <Header></Header>
    <!-- {{errorMessage}} -->
    <div class="message-response">
      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="variant"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p>{{myMessage}}</p>
      </b-alert>
    </div>
    <section id="main-home">
      <div class="left">
        <div class="fetch-products">
          <Product
            class="products"
            :products_home="products_home" ></Product>
        </div>
        <div class="carousel">
          <Carousel class="size"></Carousel>
        </div>
      </div>
      <div class="right">
        <!-- <h1>form login/register</h1> -->
        <NavLogin></NavLogin>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Carousel from '../components/Carousel.vue'
import NavLogin from '../components/NavLogin.vue'
import Product from '../components/Product.vue'

export default {
  name: 'LandingPage',
  components: {
    Header,
    Carousel,
    NavLogin,
    Product
  },
  data () {
    return {
      dismissSecs: 0,
      dismissCountDown: 0,
      myMessage: '',
      variant: '',
      products_home: []
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  },
  computed: {
    succesMessage () {
      return this.$store.state.successMessage
    },
    errorMessage () {
      return this.$store.state.errorHandler
    }
  },
  watch: {
    succesMessage: function (val) {
      if (this.$store.state.successMessage !== '') {
        this.dismissSecs = 5
        this.variant = 'success'
        this.myMessage = this.$store.state.successMessage
        this.showAlert()
      }
    },
    errorMessage: function (val) {
      if (this.$store.state.errorHandler !== '') {
        this.dismissSecs = 5
        this.variant = 'danger'
        this.myMessage = this.$store.state.errorHandler
        this.showAlert()
      }
    }

  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.access_token) {
      next()
    } else {
      next('/dashboard')
    }
  },
  created () {
    this.$store.dispatch('fetchProductsHome')
      .then(({ data }) => {
        console.log(data)
        this.products_home = data
      })
      .catch(({ response }) => {
        // this.$store.commit('SET_ERROR_HANDLER')
        console.log(response)
      })
  }
}
</script>

<style>
  #main-home {
    display: flex;
    flex-direction: row;
  }
  #main-home .left {
    width: 65%;
    display: flex;
    flex-direction: column;
  }
  #main-home .left .fetch-products {
    height: 55vh;
    /* background-color:aquamarine; */
  }
  #main-home .left .carousel {
    height: 100px;
    padding: 5px;
    margin: 0 auto;
  }
  #main-home .right {
    width: 35%;
    /* background-color: blue;
    background-image: linear-gradient(0deg, rgba(0,0,0,0.00) 0%,
    rgba(0, 0, 0, 0.50) 90%); */
  }
  .size {
    width: 100%;
    height: 100%;
  }
  .products {
    overflow-x: auto;
    padding: 10px;
  }
</style>
