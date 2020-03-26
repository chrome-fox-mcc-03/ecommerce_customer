import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      const { email, password } = payload
      return axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
          email,
          password
        }
      })
    },
    register ({ commit }, payload) {
      const { email, password } = payload
      return axios({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
          email,
          password
        }
      })
    },
    getAllProduct ({ commit }, payload) {
      return axios({
        url: 'http://localhost:3000/product',
        headers: {
          token: localStorage.getItem('token')
        },
        method: 'GET'
      })
    },
    addToCart ({ commit }, payload) {
      console.log(payload)
      const { amount, id } = payload // ada price tapi ga diambil
      return axios({
        url: 'http://localhost:3000/cart',
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          quantity: amount,
          ProductId: id
        }
      })
    },
    getCartByUserId ({ commit }, payload) {
      return axios({
        url: 'http://localhost:3000/cart',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteCart ({ commit }, payload) {
      const id = payload.idCart
      return axios({
        url: `http://localhost:3000/cart/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
