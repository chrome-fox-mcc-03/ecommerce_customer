import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Products: [],
    successObj: {},
    errorObj: {},
    isLoading: false,
    isLogin: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.Products = payload
    },
    SET_SUCCESSOBJ (state, payload) {
      state.successObj = payload
    },
    set_ERROROBJ (state, payload) {
      state.errorObj = payload
    },
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    fetchProducts (context) {
      context.commit('SET_ISLOADING', true)
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/products'
      })
        .then(res => {
          context.commit('SET_PRODUCTS', res.data)
        })
        .catch(err => {
          context.commit('SET_ERROROBJ', err)
        })
        .finally(() => {
          context.commit('SET_ISLOADING', false)
        })
    }
  },
  getters: {
  }
})
