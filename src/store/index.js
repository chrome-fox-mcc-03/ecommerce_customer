import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataUrl: 'https://enigmatic-tundra-28075.herokuapp.com',
    products: [],
    isLogin: false,
    isLoading: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    getProducts ({ commit, state }) {
      commit('SET_LOADING', true)
      axios({
        method: 'get',
        url: `${state.dataUrl}/products`
      })
        .then(response => {
          const { data } = response
          commit('SET_PRODUCTS', data)
          commit('SET_LOADING', false)
        })
        .catch(error => {
          const errors = error.response.data.errors
          this.$buefy.toast.open({
            duration: 3000,
            message: errors[0],
            position: 'is-top',
            type: 'is-danger'
          })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    },
    addCart ({ commit, state }, payload) {
      const { ProductId, quantity } = payload
      commit('SET_LOADING', true)
      return axios({
        method: 'post',
        url: `${state.dataUrl}/carts`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId, quantity
        }
      })
    },
    getCart ({ commit, state }) {
      commit('SET_LOADING', true)
      return axios({
        method: 'get',
        url: `${state.dataUrl}/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    updateCart ({ commit, state }, payload) {
      commit('SET_LOADING', true)
      const CartItemId = payload.CartItemId
      const quantity = payload.quantity
      return axios({
        method: 'put',
        url: `${state.dataUrl}/carts/${CartItemId}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          quantity
        }
      })
    },
    deleteCart ({ commit, state }, CartItemId) {
      commit('SET_LOADING', true)
      return axios({
        method: 'delete',
        url: `${state.dataUrl}/carts/${CartItemId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    login ({ commit, state }, payload) {
      commit('SET_LOADING', true)
      const { email, password } = payload
      return axios({
        method: 'post',
        url: `${state.dataUrl}/customers/login`,
        data: {
          email, password
        }
      })
    },
    register ({ commit, state }, payload) {
      commit('SET_LOADING', true)
      const { name, email, password } = payload
      return axios({
        method: 'post',
        url: `${state.dataUrl}/customers/register`,
        data: {
          name, email, password
        }
      })
    }
  },
  modules: {
  }
})
