import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// const url = 'http://localhost:3000'
const url = 'https://polar-badlands-09758.herokuapp.com'

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    total: 0,
    isLoading: false
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
    },
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
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
      context.commit('SET_ISLOADING', true)
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
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    fetchCarts (context, payload) {
      context.commit('SET_ISLOADING', true)
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
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
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
    addToCartWithBody (context, payload) {
      return axios({
        method: 'post',
        url: `${url}/carts/alt`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload.id,
          product_qty: payload.product_qty
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
    },
    findOneShoes (context, id) {
      return axios({
        method: 'get',
        url: `${url}/products/${id}`,
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
