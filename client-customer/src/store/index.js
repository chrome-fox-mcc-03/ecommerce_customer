import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    cart: []
  },
  mutations: {
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    login ({ commit, dispatch }, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          commit('SET_ISLOGIN', true)
          dispatch('fetchProducts')
          dispatch('fetchCart')
          router.push('/')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    register ({ commit, dispatch }, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          commit('SET_ISLOGIN', true)
          dispatch('fetchProducts')
          dispatch('fetchCart')
          router.push('/')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    logout ({ commit }, payload) {
      commit('SET_PRODUCTS', [])
      commit('SET_CART', [])
      commit('SET_ISLOGIN', false)
      localStorage.clear()
      router.push('/')
    },
    fetchProducts ({ commit }, payload) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/products',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data.data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    fetchCart ({ commit }, payload) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/carts',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_CART', data.data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    addToCart ({ dispatch }, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/carts',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload
        }
      })
        .then(({ data }) => {
          dispatch('fetchProducts')
          dispatch('fetchCart')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  modules: {
  }
})
