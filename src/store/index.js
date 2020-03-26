import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    carts: [],
    isLoading: false
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    signup (context, payload) {
      return axios({
        method: 'post',
        url: 'https://morning-citadel-50263.herokuapp.com/users/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    login (context, payload) {
      return axios({
        method: 'post',
        url: 'https://morning-citadel-50263.herokuapp.com/users/signin',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    getProducts ({ commit }) {
      commit('SET_LOADING', true)
      axios({
        method: 'get',
        url: 'https://morning-citadel-50263.herokuapp.com/products/customer',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data)
        })
        .catch(error => {
          this.$toasted.error(error.response.data)
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    addToCart (context, payload) {
      const quantity = 1
      axios({
        method: 'post',
        url: `https://morning-citadel-50263.herokuapp.com/carts/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          quantity
        }
      })
        .then(({ data }) => {
          this.$toasted.success('item has been added to your cart')
        })
        .catch(error => {
          this.$toasted.error(error.response.data)
        })
    },
    getCart ({ commit }) {
      commit('SET_LOADING', true)
      axios({
        method: 'get',
        url: 'https://morning-citadel-50263.herokuapp.com/carts',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_CARTS', data)
        })
        .catch(error => {
          this.$toasted.error(error.response.data)
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    editCart (context, payload) {
      return axios({
        method: 'patch',
        url: `https://morning-citadel-50263.herokuapp.com/carts/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          quantity: payload.quantity
        }
      })
    },
    deleteCart (context, payload) {
      return axios({
        method: 'delete',
        url: `https://morning-citadel-50263.herokuapp.com/carts/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
