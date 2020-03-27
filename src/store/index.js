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
    error: '',
    carts: [],
    category: ''
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
    },
    ADD_CART (state, data) {
      state.carts.push(data)
    },
    SET_CART (state, data) {
      state.carts = data
    },
    CHECK_LOGIN (state) {
      if (localStorage.token) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
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
          commit('SET_ERROR', '')
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
          commit('SET_ERROR', '')
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
    },
    addCart ({ commit }, data) {
      if (localStorage.token) {
        commit('SET_LOADING')
        axios({
          method: 'post',
          url: 'https://agile-beyond-79709.herokuapp.com/cart',
          headers: {
            token: localStorage.token
          },
          data
        })
          .then(({ data }) => {
            commit('ADD_CART', data)
            router.push('/cart')
          })
          .catch(err => {
            commit('SET_ERROR', err)
          })
          .finally(_ => {
            commit('SET_LOADING')
          })
      } else {
        router.push('/register')
      }
    },
    getCart ({ commit }) {
      commit('SET_LOADING')
      axios({
        method: 'get',
        url: 'https://agile-beyond-79709.herokuapp.com/cart',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('SET_CART', data)
        })
        .catch(err => {
          commit('SET_ERROR', err)
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    editQtt ({ commit, dispatch }, data) {
      if (data.purchase) {
        commit('SET_LOADING')
        axios({
          method: 'patch',
          url: `https://agile-beyond-79709.herokuapp.com/cart/${data.id}`,
          headers: {
            token: localStorage.token
          },
          data: {
            quantity: data.quantity,
            purchase: true
          }
        })
          .then(_ => {
            dispatch('getCart')
          })
          .catch(err => {
            commit('SET_ERROR', err)
          })
          .finally(_ => {
            commit('SET_LOADING')
          })
      } else {
        commit('SET_LOADING')
        axios({
          method: 'patch',
          url: `https://agile-beyond-79709.herokuapp.com/cart/${data.id}`,
          headers: {
            token: localStorage.token
          },
          data: {
            quantity: data.quantity,
            purchase: false
          }
        })
          .then(_ => {
            dispatch('getCart')
          })
          .catch(err => {
            commit('SET_ERROR', err)
          })
          .finally(_ => {
            commit('SET_LOADING')
          })
      }
    },
    deleteCart ({ commit, dispatch }, id) {
      commit('SET_LOADING')
      axios({
        method: 'delete',
        url: `https://agile-beyond-79709.herokuapp.com/cart/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(_ => {
          dispatch('getCart')
        })
        .catch(err => {
          commit('SET_ERROR', err)
        })
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
    },
    getCartNotPurchase: (state) => {
      return state.carts.filter(el => {
        return el.purchase === false
      })
    }
  }
})
