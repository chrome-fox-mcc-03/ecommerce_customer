import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
// import UIkit from 'uikit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false
  },
  mutations: {
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    }
  },
  actions: {
    getProducts (context) {
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'GET',
        url: 'https://ecommerce-cms-h8.herokuapp.com/products',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    getProductData (_, id) {
      return axios({
        method: 'GET',
        url: `https://ecommerce-cms-h8.herokuapp.com/products/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    register (context, payload) {
      context.commit('SET_ISLOADING', true)
      return axios({
        url: 'https://ecommerce-cms-h8.herokuapp.com/register',
        // url: 'http://localhost:3000/register',
        method: 'POST',
        data: payload
      })
    },
    login (_, payload) {
      return axios({
        url: 'https://ecommerce-cms-h8.herokuapp.com/login',
        method: 'POST',
        data: payload
      })
    },
    logout (state) {
      state.commit('SET_ISLOGIN', false)
      localStorage.clear()
      router.replace({ path: '/' })
    },
    getCart (_) {
      return axios({
        url: 'https://ecommerce-cms-h8.herokuapp.com/carts',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    addToCart (_, payload) {
      const { id, quantity } = payload
      return axios({
        url: `https://ecommerce-cms-h8.herokuapp.com/products/${id}`,
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          quantity
        }
      })
    },
    removeItem (_, id) {
      return axios({
        url: `https://ecommerce-cms-h8.herokuapp.com/carts/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    pay (_, id) {
      return axios({
        url: `https://ecommerce-cms-h8.herokuapp.com/carts/${id}`,
        method: 'PUT',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    payall (_, listId) {
      return axios({
        url: 'https://ecommerce-cms-h8.herokuapp.com/carts/payall',
        method: 'PUT',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          listId: listId
        }
      })
    }
  },
  getters: {
  }
})
