import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import cors from 'cors'

Vue.use(Vuex)
Vue.use(cors)
const URL = 'http://localhost:3000'
// let data
export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    txns: [],
    txn: {},
    carts: [],
    cart: {},
    cartInfo: {
      id: null,
      UserId: null,
      ProductId: null,
      total_qty: 0,
      totalPrice: 0
    },
    users: [],
    user: {},
    token: '',
    isLogin: false,
    isLoading: false,
    total: 0,
    is_paid: false
  },
  mutations: {
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_TXNS (state, payload) {
      state.txns = payload
    },
    SET_TXN (state, payload) {
      state.txn = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_PRODUCTINFO (state, payload) {
      state.productInfo.id = payload.id
      state.productInfo.name = payload.name
      state.productInfo.category = payload.category
      state.productInfo.image_url = payload.image_url
      state.productInfo.price = payload.price
      state.productInfo.stock = payload.stock
    },
    SET_TOTAL (state, payload) {
      state.total = payload
    },
    ADD_TOTAL (state, payload) {
      state.total += payload
    },
    SUBSTRACT_TOTAL (state, payload) {
      state.total -= payload
    },
    SET_USERS (state, payload) {
      state.users = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_IS_PAID (state, payload) {
      state.is_paid = payload
    }
  },
  actions: {
    login (context, payload) {
      console.log('>>> LOGIN USER @ VUEX STORE')
      return axios({
        method: 'post',
        url: `${URL}/login`,
        data: payload
      })
    },

    register (context, payload) {
      console.log('>>> REGISTER USER @ VUEX STORE')
      return axios({
        method: 'post',
        url: `${URL}/register`,
        data: payload
      })
    },

    getProducts (context, payload) {
      console.log('>>> FETCH PRODUCTS @ VUEX STORE')
      console.log('--- VUEJS.STORE ACTIONS: GET PRODUCTS ---')
      context.commit('SET_LOADING', true)
      axios({
        method: 'get',
        url: `${URL}/products`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log('SUCCESS FETCHING PRODUCTS')
          console.log(response.data.data)
          const allProducts = response.data.data
          context.commit('SET_PRODUCTS', allProducts)
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          // console.log(error.response.data.error);
          this.$toasted.error(err.response.data.errors, {
            position: 'bottom-center'
          })
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },

    getCarts (context, payload) {
      console.log('FETCHING ALL CARTS FROM VUEX/STORE')
      axios({
        method: 'get',
        url: `${URL}/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log('CARTS RETRIEVED')
          const arr = response.data.response
          console.log(arr)
          context.commit('SET_CARTS', arr)
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          const errArr = err.response.data.errors
          console.log(err.response.data.errors)
          errArr.forEach(el => {
            this.$toasted.error(el, {
              position: 'bottom-center'
            })
          })
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },

    getTxnLog (context, payload) {
      console.log('FETCHING DONE TXN FROM VUEX/STORE')
      axios({
        method: 'get',
        url: `${URL}/carts/history`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log('TXNS RETRIEVED')
          const arr = response.data.response
          console.log(arr)
          context.commit('SET_TXNS', arr)
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          const errArr = err.response.data.errors
          console.log(err.response.data.errors)
          errArr.forEach(el => {
            this.$toasted.error(el, {
              position: 'bottom-center'
            })
          })
        })
        .finally(_ => {
          context.commit('SET_LOADING', false)
        })
    },

    add2Cart (context, payload) {
      console.log('ADDING PRODUCT TO CART, FROM VUEX STORE')
      return axios({
        method: 'post',
        url: `${URL}/carts`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload
        }
      })
    },

    addQty (context, payload) {
      return axios({
        method: 'patch',
        url: `${URL}/carts/add/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    reduceQty (context, cartId) {
      return axios({
        method: 'patch',
        url: `${URL}/carts/remove/${cartId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    deleteCart (context, cartId) {
      return axios({
        method: 'delete',
        url: `${URL}/carts/${cartId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    checkout (context, cartId) {
      console.log('CHECKING OUT')
      return axios({
        method: 'patch',
        url: `${URL}/carts/checkout/${cartId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {}
})
