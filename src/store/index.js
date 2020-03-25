import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notification: '',
    products: [],
    cart: []
  },
  mutations: {
    SET_NOTIFICATION (state, payload) {
      state.notification = payload
    },
    SET_PRODUCT (state, payload) {
      state.products = payload
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
    },
    getProduct (context, id) {
      return axios({
        method: 'GET',
        url: `http://localhost:3000/product/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
