import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'
import VueToastify from 'vue-toastify'
Vue.use(VueToastify)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    successMessage: '',
    errorHandler: '',
    isNavLogin: 'login',
    cart: [],
    products_home: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_ERROR_HANDLER (state, payload) {
      state.errorHandler = payload
    },
    SET_IS_NAV_LOGIN (state, payload) {
      state.isNavLogin = payload
    },
    SET_SUCCESS_MESSAGE (state, payload) {
      state.successMessage = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_PRODUCTS_HOME (state, payload) {
      state.products_home = payload
    }
  },
  actions: {
    fetchProduct (context) {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_PRODUCTS', data)
        })
        .catch(({ response }) => {
          context.commit('SET_ERROR_HANDLER', response.data.errObj[0])
        })
    },
    registerOn (context, payload) {
      console.log('MASUK STORE')
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/customers/register',
        data: payload
      })
        .then(({ data }) => {
          localStorage.cartId = data.cartId
          context.commit('SET_IS_NAV_LOGIN', 'login')
          context.commit('SET_SUCCESS_MESSAGE', 'Register is successfully')
          setTimeout(() => {
            context.commit('SET_SUCCESS_MESSAGE', '')
          }, 5000)
        })
        .catch(({ response }) => {
          const messageErr = response.data.errObj[0]
          context.commit('SET_ERROR_HANDLER', messageErr)
          setTimeout(() => {
            context.commit('SET_ERROR_HANDLER', '')
          }, 5000)
        })
    },
    loginOn (context, payload) {
      console.log('masuk STORE loGIN')
      return Axios({
        method: 'POST',
        url: 'http://localhost:3000/customers/login',
        data: payload
      })
    },
    fetchOneProduct (context, payload) {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/products/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCT', data.dataItem)
        })
    },
    addToCart (context, payload) {
      context.commit('SET_CART', payload.cart)
    },
    fetchCart (context) {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/customers/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('SET_CART', data.products)
        })
        .catch(({ response }) => {
          console.log(response)
          const messageErr = response.data.errors[0]
          context.commit('SET_ERROR_HANDLER', messageErr)
          setTimeout(() => {
            context.commit('SET_ERROR_HANDLER', '')
          }, 5000)
        })
    },
    addNewProductToCart (context, payload) {
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/customers/products/' + payload.productId,
        data: {
          cartId: localStorage.cartId,
          quantity: payload.cart.qty

        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log('ADD SUCCESS NIH')
          context.dispatch('fetchCart')
        })
        .catch(({ response }) => {
          const messageErr = response.data.errors[0]
          context.commit('SET_ERROR_HANDLER', messageErr)
          setTimeout(() => {
            context.commit('SET_ERROR_HANDLER', '')
          }, 5000)
        })
    },
    updateQtyProduct (context, payload) {
      Axios({
        method: 'PUT',
        url: 'http://localhost:3000/customers/products/' + payload.productId,
        data: {
          cartId: localStorage.cartId,
          quantity: payload.cart.qty
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log('UDAH KE UPDATE NIH')
          context.dispatch('fetchCart')
        })
        .catch(({ response }) => {
          const messageErr = response.data.errors[0]
          context.commit('SET_ERROR_HANDLER', messageErr)
          setTimeout(() => {
            context.commit('SET_ERROR_HANDLER', '')
          }, 5000)
        })
    },
    deleteItemFromCart (context, payload) {
      Axios({
        method: 'DELETE',
        url: 'http://localhost:3000/customers/products/' + payload.productId,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          cartId: localStorage.cartId
        }
      })
        .then(({ data }) => {
          console.log('MASUK DELETE ITEM FROM CART')
          context.dispatch('fetchCart')
        })
        .catch(({ response }) => {
          const messageErr = response.data.errors[0]
          context.commit('SET_ERROR_HANDLER', messageErr)
          setTimeout(() => {
            context.commit('SET_ERROR_HANDLER', '')
          }, 5000)
        })
    },
    checkoutAllItems (context, payload) {
      console.log('INI DI STORE')
      return Axios({
        method: 'POST',
        url: 'http://localhost:3000/customers/checkout',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          cartId: localStorage.cartId,
          cart: payload
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$vToastify.success('Checkout Is Successfully')
          router.push('/dashboard')
        })
        .catch(({ response }) => {
          console.log(response)
          this.$vToastify.error('Sorry, Stock is not already exists now, Please checkout again!')
        })
    },
    fetchProductsHome (context) {
      return Axios({
        method: 'GET',
        url: 'http://localhost:3000/products/home'
      })
    }
  },
  modules: {
  }
})
