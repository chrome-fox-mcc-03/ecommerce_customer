import Vue from 'vue'
import Vuex from 'vuex'
import axiosCostumer from '../config/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    cartItem: {},
    isLoading: false
  },
  mutations: {
    PRODUCTS (state, data) {
      state.products = data
    },
    CART (state, data) {
      state.cart = data
    },
    CART_ITEM (state, data) {
      state.cartItem = data
    },
    SET_LOADING (state, data) {
      state.isLoading = data
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      commit('SET_LOADING', true)
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
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    fetchCart ({ commit }) {
      commit('SET_LOADING', true)
      return axiosCostumer({
        method: 'GET',
        url: '/cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('CART', data)
          // this.$router.push('/cart')
        })
        .catch(({ response }) => {
          const { data } = response
          const { error } = data
          this.$vToastify.error(error)
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    fetchCartItem ({ commit }, id) {
      commit('SET_LOADING', true)
      return axiosCostumer({
        method: 'GET',
        url: `/cart/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('CART_ITEM', data)
        })
        .catch(({ response }) => {
          const { data } = response
          const { error } = data
          this.$vToastify.error(error)
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    }
  },
  modules: {
  }
})
