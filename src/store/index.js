import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../api/axiosInstance'
import M from 'materialize-css'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isLogin: false,
    items: [],
    item: {},
    categories: [],
    filterId: null,
    cart: {}
  },
  mutations: {
    LOADING (state) {
      state.isLoading = !state.isLoading
    },
    IS_LOGIN (state) {
      if (localStorage.getItem('token')) state.isLogin = true
      else state.isLogin = false
    },
    CATEGORIES (state, payload) {
      state.categories = payload.categories
    },
    ITEMS (state, payload) {
      state.items = payload.items
    },
    ITEM (state, payload) {
      state.item = payload.item
    },
    SET_FILTER_ID (state, payload) {
      state.filterId = payload
    },
    CART (state, payload) {
      state.carts = payload
    },
    SUCCESS (_, payload) {
      M.toast({
        html: `<span>${payload}</span>`,
        classes: 'large green rounded',
        displayLength: 3000
      })
    },
    ERROR (_, payload) {
      let error = ''
      if (payload.response) error = payload.response.data.errors.join(', ')
      else error = payload
      M.toast({
        html: `<span>${error}</span>`,
        classes: 'large red rounded',
        displayLength: 3000
      })
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('LOADING')
      return new Promise((resolve, reject) => {
        Axios({
          url: '/login',
          method: 'POST',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            commit('SUCCESS', 'Login successful')
            commit('IS_LOGIN')
            resolve(true)
          })
          .catch(err => {
            commit('ERROR', err)
            reject(err)
          })
          .finally(() => commit('LOADING'))
      })
    },
    register ({ commit }, payload) {
      commit('LOADING')
      return new Promise((resolve, reject) => {
        Axios({
          url: '/register',
          method: 'POST',
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            commit('SUCCESS', data.message)
            resolve(true)
          })
          .catch(err => {
            commit('ERROR', err)
            reject(err)
          })
          .finally(() => commit('LOADING'))
      })
    },
    fetchItems ({ commit }) {
      commit('LOADING')
      Axios({
        url: '/items',
        method: 'GET'
      })
        .then(({ data }) => {
          commit('ITEMS', data)
        })
        .catch(err => commit('ERROR', `Something went wrong... ${err}`))
        .finally(() => commit('LOADING'))
    },
    fetchOneItem ({ commit }, payload) {
      commit('LOADING')
      const { itemId } = payload
      Axios({
        url: `/items/${itemId}`,
        method: 'GET'
      })
        .then(({ data }) => {
          commit('ITEM', data)
        })
        .catch(err => commit('ERROR', err))
        .finally(() => commit('LOADING'))
    },
    fetchCategories ({ commit }) {
      Axios({
        url: '/categories',
        method: 'GET'
      })
        .then(({ data }) => {
          commit('CATEGORIES', { categories: data.categories })
        })
        .catch(err => commit('ERROR', `Something went wrong... ${err}`))
    },
    fetchCarts ({ commit }, payload) {
      commit('LOADING')
      const token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        Axios({
          url: '/carts',
          method: 'GET',
          headers: { token }
        })
          .then(({ data }) => {
            commit('CART', data.cart)
            resolve(true)
          })
          .catch(err => {
            const status = err.response.data.status
            if (status === 401) commit('ERROR', err)
            else commit('ERROR', `Something went wrong... ${err}`)
            reject(err.response.data)
          })
          .finally(() => commit('LOADING'))
      })
    },
    addToCart ({ commit }, payload) {
      commit('LOADING')
      const { quantity, ItemId } = payload
      const token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        Axios({
          url: '/carts/addCart',
          method: 'POST',
          headers: { token },
          data: { quantity, ItemId }
        })
          .then(({ data }) => commit('SUCCESS', data.message))
          .catch(err => {
            commit('ERROR', err)
            reject(err.response.data)
          })
          .finally(() => commit('LOADING'))
      })
    }
  },
  getters: {
    getItemsByCategory: (state) => {
      if (!state.filterId) return state.items
      else return state.items.filter(item => item.CategoryId === state.filterId)
    }
  }
})
