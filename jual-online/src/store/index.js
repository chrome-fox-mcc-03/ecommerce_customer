import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueToastify from 'vue-toastify'
import router from '../router/index.js'

Vue.use(VueToastify, {
  errorDuration: 2000,
  theme: 'dark',
  position: 'bottom-right'
})
Vue.use(Vuex)

const alert = new Vue()

const localhost = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    products: [],
    isLoading: false,
    cart: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    login: function ({ commit }, registerData) {
      axios({
        method: 'POST',
        url: `${localhost}/login`,
        data: {
          email: registerData.email,
          password: registerData.password
        }
      })
        .then(response => {
          // console.log(response)
          localStorage.setItem('token', response.data.token)
          router.push('/')
        })
        .catch(err => {
          // console.log(err)
          alert.$vToastify.error({
            title: 'Error',
            body: err.response.data
          })
        })
    },
    register: function ({ commit }, registerData) {
      axios({
        method: 'POST',
        url: `${localhost}/register`,
        data: {
          email: registerData.email,
          password: registerData.password
        }
      })
        .then(response => {
          // console.log(response)
          localStorage.setItem('token', response.data.token)
          router.push('/')
        })
        .catch(err => {
          // console.log(err)
          alert.$vToastify.error({
            title: 'Error',
            body: err.response.data
          })
        })
    },
    getProducts: function ({ commit }) {
      commit('SET_LOADING', true)
      axios({
        method: 'GET',
        url: `${localhost}/purchase/read`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          // console.log(response)
          commit('SET_PRODUCTS', response.data)
        })
        .catch(err => {
          alert.$vToastify.error({
            title: 'Error',
            body: err.response.data
          })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    addToCart: function ({ commit }, cartData) {
      axios({
        method: 'POST',
        url: `${localhost}/purchase/add-to-cart/${cartData.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          quantity: cartData.quantity
        }
      })
        .then(response => {
          alert.$vToastify.success({
            title: 'Success',
            body: `Adding ${cartData.name} to cart. See your checkout form to proceed.`
          })
        })
        .catch(err => {
          alert.$vToastify.error({
            title: 'Error',
            body: err.response.data
          })
        })
    },
    getCart: function ({ commit }) {
      axios({
        method: 'GET',
        url: `${localhost}/purchase/cart`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          commit('SET_CART', response.data)
          console.log(response.data)
        })
        .catch(err => {
          alert.$vToastify.error({
            title: 'Error',
            body: err.response.data
          })
        })
    }
  },
  modules: {
  }
})
