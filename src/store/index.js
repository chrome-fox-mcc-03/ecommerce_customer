import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const server = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false,
    products: [],
    carts: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
      if (payload === false) {
        localStorage.clear()
      }
    }
  },
  getters: {
    cart: (state) => (payload) => {
      const productId = payload.id
      const result = state.carts.filter(cart => {
        return cart.ProductId === productId && cart.isPaid === false
      })

      return result
    }
  },
  actions: {
    getProducts ({ commit }, payload) {
      return axios({
        url: server + '/product',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((result) => {
          commit('SET_PRODUCTS', result.data.data)
        }).catch((err) => {
          throw err
        })
    },

    login ({ commit }, payload) {
      return axios({
        url: server + '/login',
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },

    register ({ commit }, payload) {
      return axios({
        url: server + '/register',
        method: 'post',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
    },

    getCarts ({ commit }, payload) {
      return axios({
        url: server + '/cart',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      }).then((result) => {
        commit('SET_CARTS', result.data.data)
      }).catch((err) => {
        throw err
      })
    },

    addToCart ({ commit }, payload) {
      return axios({
        url: server + '/cart',
        method: 'post',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          productId: payload.id,
          qty: payload.qty
        }
      })
    },

    deleteCart ({ commit }, payload) {
      return axios({
        url: server + '/cart/' + payload.id,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    updateCart ({ commit }, payload) {
      return axios({
        url: server + '/cart/' + payload.id,
        method: 'put',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          qty: payload.qty,
          isPaid: payload.isPaid
        }
      })
    }

  },
  modules: {
  }
})
