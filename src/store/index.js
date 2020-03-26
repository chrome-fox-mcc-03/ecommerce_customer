import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
// import router from '../router'
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
    products_home: [],
    categories: [],
    product_detail: {}
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
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_PRODUCT_DETAIL (state, payload) {
      state.product_detail = payload
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
          context.commit('SET_PRODUCTS', data)
        })
        .catch(({ response }) => {
          context.commit('SET_ERROR_HANDLER', response.data.errObj[0])
        })
    },
    registerOn (context, payload) {
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
    },
    fetchProductsHome (context) {
      return Axios({
        method: 'GET',
        url: 'http://localhost:3000/products/home'
      })
    },
    fetchCategories (context) {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/categories'
      })
        .then(({ data }) => {
          context.commit('SET_CATEGORIES', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  modules: {
  }
})
