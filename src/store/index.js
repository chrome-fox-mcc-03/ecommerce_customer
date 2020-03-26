import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const ecommerceAPI = axios.create({
  baseURL: 'http://localhost:3000'
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: localStorage.getItem('access_token') || '',
    products: [],
    product: {},
    carts: []
  },
  mutations: {
    SET_ACCESS_TOKEN (state, data) {
      state.access_token = data
    },
    LOGOUT (state) {
      state.access_token = ''
    },
    SET_PRODUCTS (state, products) {
      state.products = products
    },
    SET_PRODUCT (state, product) {
      state.product = product
    }
  },
  actions: {
    submitSignUp ({ commit }, data) {
      return new Promise((resolve, reject) => {
        ecommerceAPI.post('/register', data)
          .then(({ data }) => {
            commit('SET_ACCESS_TOKEN', data.data.access_token)
            resolve('/')
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    submitLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        ecommerceAPI.post('/login', data)
          .then(({ data }) => {
            commit('SET_ACCESS_TOKEN', data.access_token)
            resolve('/')
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getProducts ({ commit }) {
      ecommerceAPI.get('/products')
        .then(({ data }) => {
          commit('SET_PRODUCTS', data.products)
          console.log(data.products)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProduct ({ commit }, id) {
      ecommerceAPI.get(`/products/${id}`)
        .then(({ data }) => {
          commit('SET_PRODUCT', data.product)
          console.log(data.product)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart ({ commit, state }, id) {
      if (state.carts.some(item => item.id === id)) {
        console.log('change the count')
      } else {
        ecommerceAPI.post()
        console.log('added to cart')
      }
    }
  },
  modules: {
  }
})
