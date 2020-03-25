import Vue from 'vue'
import Vuex from 'vuex'
import axiosCostumer from '../config/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: []
  },
  mutations: {
    PRODUCTS (state, data) {
      state.products = data
    },
    CART (state, data) {
      state.cart = data
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axiosCostumer({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('PRODUCTS', data)
        })
        .catch(({ response }) => {
          const { data } = response
          const { error } = data
          this.$vToastify.error(error)
        })
    },
    fetchCart ({ commit }) {
      axiosCostumer({
        method: 'GET',
        url: '/cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('CART', data)
        })
        .catch(({ response }) => {
          const { data } = response
          const { error } = data
          this.$vToastify.error(error)
        })
    }
  },
  modules: {
  }
})
