import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const url = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    total: 0
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_TOTAL (state, payload) {
      state.total = payload
    },
    ADD_TOTAL (state, payload) {
      state.total += payload
    },
    SUBSTRACT_TOTAL (state, payload) {
      state.total -= payload
    }
  },
  actions: {
    signin (context, payload) {
      return axios({
        method: 'post',
        url: `${url}/signin`,
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    signup (context, payload) {
      return axios({
        method: 'post',
        url: `${url}/signup`,
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchProducts (context, payload) {
      axios({
        method: 'get',
        url: `${url}/products`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCarts (context, payload) {
      axios({
        method: 'get',
        url: `${url}/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_CARTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (context, id) {
      return axios({
        method: 'post',
        url: `${url}/carts`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: id
        }
      })
    },
    increase (context, cartId) {
      return axios({
        method: 'patch',
        url: `${url}/carts/increase/${cartId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    decrease (context, cartId) {
      return axios({
        method: 'patch',
        url: `${url}/carts/decrease/${cartId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteCart (context, cartId) {
      return axios({
        method: 'delete',
        url: `${url}/carts/${cartId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  getters: {
  },
  modules: {
  }
})
