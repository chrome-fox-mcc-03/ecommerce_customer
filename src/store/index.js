import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataUrl: 'http://localhost:3000',
    products: [],
    isLogin: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    getProducts ({ commit, state }) {
      axios({
        method: 'get',
        url: `${state.dataUrl}/products`
      })
        .then(response => {
          const { data } = response
          commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart ({ commit, state }, payload) {
      const { ProductId, quantity } = payload
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
      return axios({
        method: 'get',
        url: `${state.dataUrl}/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    updateCart ({ commit, state }, payload) {
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
      return axios({
        method: 'delete',
        url: `${state.dataUrl}/carts/${CartItemId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    login ({ commit, state }, payload) {
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
