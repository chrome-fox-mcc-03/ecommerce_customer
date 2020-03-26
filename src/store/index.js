import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)
// https://peaceful-fortress-31291.herokuapp.com

export default new Vuex.Store({
  state: {
    notification: '',
    products: [],
    carts: [],
    isLoading: false
  },
  mutations: {
    SET_NOTIFICATION (state, payload) {
      state.notification = payload
    },
    SET_PRODUCT (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      state.carts = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    register (context, payload) {
      const email = payload.email
      const password = payload.password
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/user/register',
        data: {
          email,
          password
        }
      })
    },
    login (context, payload) {
      const email = payload.email
      const password = payload.password
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data: {
          email,
          password
        }
      })
    },
    logout (context) {
      localStorage.clear()
      router.push({ path: '/' })
      context.commit('SET_NOTIFICATION', {
        msg: 'logout success',
        color: 'bg-success'
      })
    },
    fetchData (context, payload) {
      context.commit('SET_LOADING', true)
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCT', data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_=> {
          context.commit('SET_LOADING', false)
        })
    },
    getProduct (context, id) {
      context.commit('SET_LOADING', true)
      return axios({
        method: 'GET',
        url: `http://localhost:3000/product/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    addCart (context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/cart',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload
        }
      })
    },
    fetchCart (context, payload) {
      context.commit('SET_LOADING', true)
      axios({
        method: 'GET',
        url: 'http://localhost:3000/cart',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        context.commit('SET_CART', data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(_=> {
        context.commit('SET_LOADING', false)
      })
    },
    increase (context, id) {
      return axios({
        method: 'PATCH',
        url: `http://localhost:3000/cart/increase/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    decrease (context, id) {
      return axios({
        method: 'PATCH',
        url: `http://localhost:3000/cart/decrease/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteCart (context, id) {
      return axios({
        method: 'DELETE',
        url: `http://localhost:3000/cart/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
