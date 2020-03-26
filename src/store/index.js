import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'http://13.250.32.193'
export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false,
    registerPage: false,
    products: [],
    CartId: 0,
    carts: [],
    name: '',
    email: '',
    randomNumber: null,
    history: []
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_REGISTER_PAGE (state, payload) {
      state.registerPage = payload
    },
    SET_CART_ID (state, payload) {
      state.cartId = payload
    },
    SET_PRODUCT (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      state.carts = payload
    },
    SET_NAME (state, payload) {
      state.name = payload
    },
    SET_EMAIL (state, payload) {
      state.email = payload
    },
    SET_RANDOM_NUMBER (state, payload) {
      state.randomNumber = payload
    },
    SET_HISTORY (state, payload) {
      state.history = payload
    }
  },
  actions: {
    login (_, data) {
      return axios({
        url: baseUrl + '/users/login',
        method: 'post',
        data
      })
    },
    register (_, data) {
      return axios({
        url: baseUrl + '/users/register',
        method: 'POST',
        data
      })
    },
    fetchProduct ({ commit }, payload) {
      commit('SET_LOADING', true)
      axios({
        url: baseUrl + '/products',
        method: 'get',
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          commit('SET_PRODUCT', response.data.data)
        })
        .catch(err => {
          this.$toasted.error(err.response.data.message, {
            position: 'bottom-center'
          })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    addToCart (_, data) {
      return axios({
        url: baseUrl + `/carts/${data.id}`,
        method: 'POST',
        headers: {
          token: localStorage.token
        },
        data
      })
    },
    fetchCart ({ commit }, payload) {
      console.log('masukk ==========================')
      commit('SET_LOADING', true)
      axios({
        url: baseUrl + '/carts',
        method: 'GET',
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          console.log(response.data, '=================')
          commit('SET_CART', response.data)
        })
        .catch(err => {
          this.$toasted.error(err.response.data.message, {
            position: 'bottom-center'
          })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    decrease (_, data) {
      return axios({
        url: baseUrl + `/carts/${data.id}/minus`,
        method: 'post',
        headers: {
          token: localStorage.token
        }
      })
    },
    increase (_, data) {
      return axios({
        url: baseUrl + `/carts/${data.id}/add`,
        method: 'post',
        headers: {
          token: localStorage.token
        }
      })
    },
    deleteCart (_, data) {
      return axios({
        url: baseUrl + `/carts/${data.id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.token
        }
      })
    },
    checkout (state, data) {
      return axios({
        url: baseUrl + '/carts/checkout',
        method: 'post',
        headers: {
          token: localStorage.token
        },
        data
      })
    },
    isPaid (_, data) {
      return axios({
        method: 'PUT',
        url: baseUrl + '/cart',
        headers: {
          token: localStorage.token
        }
      })
    },
    getHistory ({ commit }) {
      commit('SET_LOADING', true)
      axios({
        method: 'GET',
        url: baseUrl + '/cart',
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          commit('SET_HISTORY', response.data)
        })
        .catch(err => {
          this.$toasted.error(err.response.data.message, {
            position: 'bottom-center'
          })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    }
  },
  getters: {
    getTotal (state) {
      let total = 0
      state.carts.forEach(el => {
        total += (el.quantity * el.Product.price)
      })
      return total
    }
  },
  modules: {
  }
})
