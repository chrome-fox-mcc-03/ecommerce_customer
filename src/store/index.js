import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasLogin: false,
    products: [],
    carts: [],
    errorMessage: '',
    errorStatus: false,
    successMessage: '',
    succesStatus: false,
    isLoading: false,
    histories: []
  },
  mutations: {
    HAS_LOGIN (state) {
      state.hasLogin = true
    },
    LOGOUT (state) {
      state.hasLogin = false
    },
    SET_PRODUCTS (state, payload) {
      payload.sort((a, b) => a.id - b.id)
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_ERROR (state, payload) {
      state.errorStatus = true
      if (Array.isArray(payload.message)) state.errorMessage = payload.message.join(' and ')
      else state.errorMessage = payload.message
    },
    STOP_ERROR (state) {
      state.errorStatus = false
    },
    SET_SUCCESS (state, payload) {
      state.succesStatus = true
      state.successMessage = payload
    },
    STOP_SUCCESS (state) {
      state.succesStatus = false
    },
    STOP_SUCCESS_ERROR (state) {
      state.succesStatus = false
      state.errorStatus = false
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_HISTORIES (state, payload) {
      state.histories = payload
    }
  },
  actions: {
    registerCustomer (context, payload) {
      context.commit('SET_LOADING', true)
      return axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
    },
    loginCustomer (context, payload) {
      context.commit('SET_LOADING', true)
      return axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
    },
    fetchAllProducts (context) {
      context.commit('SET_LOADING', true)
      return axios({
        method: 'GET',
        url: '/products'
      })
    },
    fetchCarts (context) {
      if (localStorage.access_token) {
        context.commit('SET_LOADING', true)
        axios({
          method: 'GET',
          url: '/carts',
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(({ data }) => {
            context.commit('STOP_ERROR')
            context.commit('SET_LOADING', false)
            const payload = []
            data.forEach(el => {
              payload.push({
                id: el.id,
                UserId: el.UserId,
                ProductId: el.ProductId,
                status: el.status,
                quantity: el.quantity,
                totalPrice: el.price,
                name: el.Product.name,
                price: el.Product.price
              })
            })
            context.commit('SET_CARTS', payload)
          })
          .catch(({ response }) => {
            context.commit('SET_ERROR', response.data)
            context.commit('STOP_SUCCESS')
            context.commit('SET_LOADING', false)
          })
      }
    },
    createNewCart (context, payload) {
      context.commit('SET_LOADING', true)
      return axios({
        method: 'POST',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
    },
    addItemToCart (context, payload) {
      context.commit('SET_LOADING', true)
      return axios({
        method: 'PUT',
        url: `/carts/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload.data
      })
    },
    deleteItem (context, payload) {
      context.commit('SET_LOADING', true)
      return axios({
        method: 'DELETE',
        url: `/carts/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload.data
      })
    },
    checkout (context, payload) {
      context.commit('SET_LOADING', true)
      return axios({
        method: 'PUT',
        url: '/carts/checkout',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
    },
    histories (context) {
      context.commit('SET_LOADING', true)
      return axios({
        method: 'GET',
        url: '/carts/histories',
        headers: {
          access_token: localStorage.access_token
        }
      })
    }
  },
  modules: {
  }
})
