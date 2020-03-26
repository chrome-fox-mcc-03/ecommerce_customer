import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueToastify from 'vue-toastify'

Vue.use(VueToastify, {
  errorDuration: 2000,
  succesDuration: 2000,
  theme: 'light',
  position: 'bottom-center'
})
Vue.use(Vuex)
const notifier = new Vue()

export default new Vuex.Store({
  state: {
    nowLoading: false,
    highlightedItems: [],
    randomProducts: [],
    allProducts: [],
    isLogin: false,
    passwordToLogin: '',
    cart: {},
    history: {}
  },
  mutations: {
    CHANGE_NOWLOADING (state) {
      state.nowLoading = !state.nowLoading
    },
    SET_HIGHLIGHTED_ITEMS (state, payload) {
      state.highlightedItems = payload
    },
    SET_RANDOM_PRODUCTS (state, payload) {
      state.randomProducts = payload
    },
    SET_ALL_PRODUCTS (state, payload) {
      state.allProducts = payload
    },
    CHANGE_USERDATA (state, payload) {
      for (const key in payload) {
        state.userData[key] = payload[key]
      }
    },
    CHANGE_LOGIN_STATUS (state) {
      state.isLogin = !state.isLogin
    },
    SET_PASS_LOGIN (state, payload) {
      state.passwordToLogin = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_HISTORY (state, payload) {
      state.history = payload
    }
  },
  actions: {
    login ({ commit, state }, payload) {
      commit('CHANGE_NOWLOADING')
      return new Promise((resolve, reject) => {
        axios({
          url: 'https://ancient-crag-74194.herokuapp.com/loginCustomer',
          method: 'POST',
          data: payload
        })
          .then(result => {
            localStorage.setItem('token', result.data.token)
            commit('CHANGE_LOGIN_STATUS')
            notifier.$vToastify.success({
              title: 'Success',
              body: 'Welcome!'
            })
            resolve(result)
          })
          .catch(err => {
            notifier.$vToastify.error({
              title: 'Ouch!',
              body: err.response.data.msg
            })
          })
          .finally(() => {
            commit('CHANGE_NOWLOADING')
          })
      })
    },
    register ({ commit, state, dispatch }, payload) {
      commit('SET_PASS_LOGIN', payload.password)
      commit('CHANGE_NOWLOADING')
      axios({
        url: 'https://ancient-crag-74194.herokuapp.com/register',
        method: 'POST',
        data: payload
      })
        .then(result => {
          dispatch('login', {
            email: result.data.email,
            password: state.passwordToLogin
          })
        })
        .catch(err => {
          notifier.$vToastify.error({
            title: 'Ouch!',
            body: err.response.data.msg
          })
        })
        .finally(() => {
          commit('CHANGE_NOWLOADING')
        })
    },
    fetchHighlightedItems ({ commit }) {
      commit('CHANGE_NOWLOADING')
      axios({
        url: 'https://ancient-crag-74194.herokuapp.com/highlighted',
        method: 'GET'
      })
        .then(result => {
          commit('SET_HIGHLIGHTED_ITEMS', '')
          commit('SET_HIGHLIGHTED_ITEMS', result.data)
        })
        .catch(err => {
          notifier.$vToastify.error({
            title: 'Ouch!',
            body: err.response.data.msg
          })
        })
        .finally(() => {
          commit('CHANGE_NOWLOADING')
        })
    },
    fetchRandomProduct ({ commit }) {
      commit('CHANGE_NOWLOADING')
      axios({
        url: 'https://ancient-crag-74194.herokuapp.com/allProduct',
        method: 'GET'
      })
        .then(result => {
          commit('SET_RANDOM_PRODUCTS', '')
          let j, x, i
          for (i = result.data.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            x = result.data[i]
            result.data[i] = result.data[j]
            result.data[j] = x
          }
          commit('SET_RANDOM_PRODUCTS', result.data.slice(0, 4))
        })
        .catch(err => {
          notifier.$vToastify.error({
            title: 'Ouch!',
            body: err.response.data.msg
          })
        })
        .finally(() => {
          commit('CHANGE_NOWLOADING')
        })
    },
    fetchAllProduct ({ commit }) {
      commit('CHANGE_NOWLOADING')
      axios({
        url: 'https://ancient-crag-74194.herokuapp.com/allProduct',
        method: 'GET'
      })
        .then(result => {
          commit('SET_ALL_PRODUCTS', result.data)
        })
        .catch(err => {
          notifier.$vToastify.error({
            title: 'Ouch!',
            body: err.response.data.msg
          })
        })
        .finally(() => {
          commit('CHANGE_NOWLOADING')
        })
    },
    logout ({ commit }) {
      commit('CHANGE_NOWLOADING')
      return new Promise((resolve, reject) => {
        localStorage.clear()
        commit('CHANGE_LOGIN_STATUS')
        notifier.$vToastify.success({
          title: 'Success!',
          body: 'thank you come again!'
        })
        resolve()
      })
        .finally(() => {
          commit('CHANGE_NOWLOADING')
        })
    },
    addToCart ({ commit }, payload) {
      commit('CHANGE_NOWLOADING')
      axios({
        url: 'https://ancient-crag-74194.herokuapp.com/cart',
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          quantity: 1,
          product_id: payload
        }
      })
        .then(result => {
          notifier.$vToastify.success({
            title: 'Success',
            body: 'Item Added to cart'
          })
        })
        .catch(err => {
          notifier.$vToastify.error({
            title: 'Ouch!',
            body: err.response.data.msg
          })
        })
        .finally(() => {
          commit('CHANGE_NOWLOADING')
        })
    },
    fetchCart ({ commit }, payload) {
      commit('CHANGE_NOWLOADING')
      axios({
        url: 'https://ancient-crag-74194.herokuapp.com/cart',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(result => {
          const ordered = []
          result.data.Products.forEach(el => {
            if (el.CartProduct.status === 'Ordered') {
              ordered.push(el)
            }
          })
          commit('SET_CART', ordered)
        })
        .catch(err => {
          notifier.$vToastify.error({
            title: 'Ouch!',
            body: err.response.data.msg
          })
        })
        .finally(() => {
          commit('CHANGE_NOWLOADING')
        })
    },
    editQuantity ({ commit, action }, payload) {
      commit('CHANGE_NOWLOADING')
      return new Promise((resolve, reject) => {
        axios({
          url: 'https://ancient-crag-74194.herokuapp.com/cart',
          method: 'PUT',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            product_id: payload.id,
            quantity: payload.num,
            totalQuantity: payload.quantity
          }
        })
          .then(result => {
            resolve()
          })
          .catch(err => {
            notifier.$vToastify.error({
              title: 'Ouch!',
              body: err.response.data.msg
            })
          })
          .finally(() => {
            commit('CHANGE_NOWLOADING')
          })
      })
    },
    deleteCartProduct ({ commit, action }, payload) {
      commit('CHANGE_NOWLOADING')
      return new Promise((resolve, reject) => {
        axios({
          url: 'https://ancient-crag-74194.herokuapp.com/cart',
          method: 'DELETE',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            product_id: payload.id
          }
        })
          .then(result => {
            resolve()
          })
          .catch(err => {
            notifier.$vToastify.error({
              title: 'Ouch!',
              body: err.response.data.msg
            })
          })
          .finally(() => {
            commit('CHANGE_NOWLOADING')
          })
      })
    },
    checkout ({ commit }, payload) {
      commit('CHANGE_NOWLOADING')
      return new Promise((resolve, reject) => {
        axios({
          url: 'https://ancient-crag-74194.herokuapp.com/cart/checkOut',
          method: 'PUT',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(result => {
            notifier.$vToastify.success({
              title: 'Success!',
              body: 'Thanks for the purchase!'
            })
            resolve()
          })
          .catch(err => {
            notifier.$vToastify.error({
              title: 'Ouch!',
              body: err.response.data.msg
            })
          })
          .finally(() => {
            commit('CHANGE_NOWLOADING')
          })
      })
    }
  },
  modules: {
  }
})
