import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formLogin: true,
    isLogin: false,
    isLoading: false,
    redirectLogo: '/',
    name: '',
    products: [],
    error: ''
  },
  mutations: {
    CHANGE_FORM (state) {
      state.formLogin = !state.formLogin
    },
    SET_USER (state) {
      state.name = localStorage.name
    },
    SET_LOADING (state) {
      state.isLoading = !state.isLoading
    },
    SET_LOGIN (state) {
      state.isLogin = !state.isLogin
    },
    CHANGE_LINK_LOGO (state, link) {
      state.redirectLogo = link
    },
    LOGOUT (state) {
      state.isLogin = false
      state.name = ''
      state.role = ''
      localStorage.clear()
      router.push('/')
    },
    SET_PRODUCT (state, products) {
      state.products = products
    },
    SET_ERROR (state, error) {
      state.error = error
    }
  },
  actions: {
    register ({ state, commit }, data) {
      commit('SET_LOADING')
      commit('SET_USER', { name: data.name, role: data.role })
      const { name, email, password } = data
      axios({
        method: 'post',
        url: 'https://agile-beyond-79709.herokuapp.com/user/register',
        data: {
          name,
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.token = data.access_token
          localStorage.name = data.name
          commit('SET_LOGIN')
          router.push('/')
        })
        .catch(err => {
          commit('SET_ERROR', err)
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    login ({ commit }, data) {
      commit('SET_LOADING')
      const { email, password } = data
      axios({
        method: 'post',
        url: 'https://agile-beyond-79709.herokuapp.com/user/login',
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.token = data.access_token
          localStorage.name = data.name
          commit('SET_LOGIN')
          commit('SET_USER')
          if (data.role === 'customer') {
            router.push('/')
          } else {
            commit('CHANGE_LINK_LOGO', '/store')
            router.push('/store')
          }
        })
        .catch(err => {
          commit('SET_ERROR', err)
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    getProducts ({ commit }) {
      commit('SET_LOADING')
      axios({
        method: 'get',
        url: 'https://agile-beyond-79709.herokuapp.com/product',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCT', data)
        })
        .catch(err => commit('SET_ERROR', err))
        .finally(_ => {
          commit('SET_LOADING')
        })
    }
  },
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => Number(product.id) === Number(id))
    },
    getTwentyProduct: (state) => {
      return state.products.slice(0, 20)
    }
  }
})
