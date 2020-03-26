import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueToastify from 'vue-toastify'
import router from '../router/index.js'

Vue.use(VueToastify, {
  errorDuration: 2000,
  theme: 'dark',
  position: 'bottom-right'
})
Vue.use(Vuex)

const alert = new Vue()

const localhost = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    products: [],
    isLoading: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    login: function ({ commit }, registerData) {
      axios({
        method: 'POST',
        url: `${localhost}/login`,
        data: {
          email: registerData.email,
          password: registerData.password
        }
      })
        .then(response => {
          // console.log(response)
          localStorage.setItem('token', response.data.token)
          router.push('/')
        })
        .catch(err => {
          // console.log(err)
          alert.$vToastify.error({
            title: 'Error',
            body: err.response.data
          })
        })
    },
    register: function ({ commit }, registerData) {
      axios({
        method: 'POST',
        url: `${localhost}/register`,
        data: {
          email: registerData.email,
          password: registerData.password
        }
      })
        .then(response => {
          // console.log(response)
          localStorage.setItem('token', response.data.token)
          router.push('/')
        })
        .catch(err => {
          // console.log(err)
          alert.$vToastify.error({
            title: 'Error',
            body: err.response.data
          })
        })
    },
    getProducts: function ({ commit }) {
      commit('SET_LOADING', true)
      axios({
        method: 'GET',
        url: `${localhost}/purchase/read`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          // console.log(response)
          commit('SET_PRODUCTS', response.data)
        })
        .catch(err => {
          alert.$vToastify.error({
            title: 'Error',
            body: err.response.data
          })
        })
        .finally(_ => {
          commit('SET_LOADING', false)
        })
    }
  },
  modules: {
  }
})
