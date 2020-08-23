import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    cart: [],
    loading: false,
    error: '',
    sold: []
  },
  mutations: {
    SET_ISLOGIN (state) {
      state.isLogin = true
    },
    SET_CART (state, cart) {
      state.cart = cart
    },
    SET_SOLD (state, cart) {
      state.sold = cart
    },
    SET_LOADING (state, boolean) {
      state.loading = boolean
    },
    SHOW_ERROR (state, error) {
      state.error = error
    },
    SET_LOGOUT (state) {
      state.cart = []
      state.isLogin = false
      localStorage.clear()
    },
    SET_PRODUCTS (state, products) {
      state.products = products
    }
  },
  actions: {
    register (context, data) {
      return axios({
        method: 'POST',
        url: '/register',
        data
      })
    },
    login (context, data) {
      return axios({
        method: 'POST',
        url: '/login',
        data,
        loading: false
      })
    },
    fetchProduct (context) {
      context.commit('SET_LOADING', true)
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data.products)
          context.commit('SET_LOADING', false)
        })
        .catch(err => {
          context.commit('SHOW_ERROR', err.response.data.error)
          context.commit('SET_LOADING', false)
        })
    },
    fetchCart (context) {
      context.commit('SET_LOADING', true)
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          const filterFalse = data.filter(el => {
            return el.status === false
          })
          const filterTrue = data.filter(el => {
            return el.status === true
          })
          context.commit('SET_CART', filterFalse)
          context.commit('SET_SOLD', filterTrue)
          context.commit('SET_LOADING', false)
        })
        .catch(err => {
          // console.log(err.response.data.error, '------errrr')
          context.commit('SHOW_ERROR', err.response.data.error)
          context.commit('SET_LOADING', false)
        })
    },
    addToCart (context, data) {
      return axios({
        method: 'POST',
        url: '/carts',
        data,
        headers: {
          token: localStorage.token
        }
      })
    },
    deleteCart (context, id) {
      return axios({
        method: 'DELETE',
        url: `/carts/${id}`,
        headers: {
          token: localStorage.token
        }
      })
    },
    updateCart (context, data) {
      return axios({
        method: 'PUT',
        url: `/carts/${data.id}`,
        data,
        headers: {
          token: localStorage.token
        }
      })
    },
    checkoutCart (context, data) {
      return axios({
        method: 'PUT',
        url: '/checkout',
        data,
        headers: {
          token: localStorage.token
        }
      })
    }
  },
  getters: {
    forSale: state => state.products
  }
})
