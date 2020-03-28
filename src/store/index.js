import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// const url = 'https://shrouded-meadow-59142.herokuapp.com'
const url = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    message: {
      isMessage: false
    },
    isLoading: false,
    products: [],
    modalAdd: false,
    productId: 0,
    carts: [],
    productIdx: 0,
    modalDelete: {
      status: false,
      id: 0
    },
    total: 0,
    history: []
  },
  mutations: {
    SET_MESSAGE (state, payload) {
      state.message = payload
    },
    SET_LOADING (state) {
      state.isLoading = !state.isLoading
    },
    SET_ISMESSAGE (state) {
      state.message.isMessage = false
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_MODAL_ADD (state) {
      state.modalAdd = !state.modalAdd
    },
    SET_PRODUCT_ID (state, payload) {
      state.productId = payload
    },
    SET_CART (state, payload) {
      state.carts = payload
    },
    SET_PRODUCT_IDX (state, payload) {
      state.productIdx = payload
    },
    SET_MODAL_DELETE (state, payload) {
      state.modalDelete = payload
    },
    SET_TOTAL (state, payload) {
      state.total += payload
    },
    RESET_TOTAL (state) {
      state.total = 0
    },
    SET_HISTORY (state, payload) {
      state.history = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      commit('SET_LOADING')
      const { username, email, password } = payload
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `${url}/register`,
          data: {
            username, email, password
          }
        })
          .then(({ data }) => {
            commit('SET_MESSAGE', {
              isMessage: true,
              title: 'Success!',
              message: data.message
            })
            resolve(true)
          })
          .catch(err => {
            commit('SET_MESSAGE', {
              isMessage: true,
              title: 'Error!',
              message: err.response.data.message
            })
            reject(err)
          })
          .finally(_ => {
            commit('SET_LOADING')
          })
      })
    },
    login ({ commit }, payload) {
      commit('SET_LOADING')
      const { email, password } = payload
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `${url}/login`,
          data: {
            email, password
          }
        })
          .then(({ data }) => {
            const { token, message } = data
            localStorage.setItem('token', token)
            commit('SET_MESSAGE', {
              isMessage: true,
              title: 'Success!',
              message
            })
            resolve(true)
          })
          .catch(err => {
            commit('SET_MESSAGE', {
              isMessage: true,
              title: 'Error!',
              message: err.response.data.message
            })
            reject(err)
          })
          .finally(_ => {
            commit('SET_LOADING')
          })
      })
    },
    fetchProducts ({ commit }) {
      commit('SET_LOADING')
      axios({
        method: 'get',
        url: `${url}/product`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          const products = data.data.filter(el => {
            return el.stock > 0
          })
          commit('SET_PRODUCTS', products)
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'Error!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    addToCart ({ commit, state, dispatch }, payload) {
      commit('SET_LOADING')
      axios({
        method: 'post',
        url: `${url}/cart`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: state.productId,
          amount: +payload
        }
      })
        .then(({ data }) => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'Success!',
            message: data.message
          })
          dispatch('fetchCart')
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'Error!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    fetchCart ({ commit }) {
      commit('SET_LOADING')
      axios({
        method: 'get',
        url: `${url}/cart`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_CART', data.data)
          commit('RESET_TOTAL')
          data.data.forEach(el => {
            commit('SET_TOTAL', el.Product.price * el.amount)
          })
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'Error!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    updateAmount ({ commit, dispatch }, payload) {
      commit('SET_LOADING')
      const { id, newAmount } = payload
      axios({
        method: 'patch',
        url: `${url}/cart/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          newAmount
        }
      })
        .then(({ data }) => {
          dispatch('fetchCart')
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'Error!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    destroyCart ({ commit, dispatch, state }) {
      commit('SET_LOADING')
      axios({
        method: 'delete',
        url: `${url}/cart/${state.modalDelete.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'Success!',
            message: data.message
          })
          dispatch('fetchCart')
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'Error!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    checkoutCart ({ commit, dispatch }) {
      commit('SET_LOADING')
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `${url}/cart`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_MESSAGE', {
              isMessage: true,
              title: 'Success!',
              message: data.message
            })
            dispatch('fetchCart')
            dispatch('fetchProducts')
            dispatch('fetchHistory')
            resolve(true)
          })
          .catch(err => {
            commit('SET_MESSAGE', {
              isMessage: true,
              title: 'Error!',
              message: err.response.data.message
            })
            reject(err)
          })
          .finally(_ => {
            commit('SET_LOADING')
          })
      })
    },
    fetchHistory ({ commit }) {
      commit('SET_LOADING')
      axios({
        method: 'get',
        url: `${url}/cart/history`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_HISTORY', data.data)
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'Error!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    }
  },
  modules: {
  }
})
