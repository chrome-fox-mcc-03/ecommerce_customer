import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carts: [],
    products: [],
    successObj: {},
    errorObj: {},
    isLoading: false,
    isLogin: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_SUCCESSOBJ (state, payload) {
      state.successObj = payload
    },
    SET_ERROROBJ (state, payload) {
      state.errorObj = payload
    },
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    // #region cart related
    addToCart (context, ProductId) {
      const token = localStorage.getItem('token')

      context.commit('SET_ISLOADING', true)

      Axios({
        method: 'POST',
        url: 'http://localhost:3000/carts',
        headers: { token },
        data: {
          ProductId
        }
      })
        .then(res => {
          context.commit('SET_CARTS', res.data.carts)

          context.commit('SET_SUCCESSOBJ', res.data)
        })
        .catch(err => {
          context.commit('SET_ERROROBJ', err.response.data)
        })
        .finally(() => {
          context.commit('SET_ISLOADING', false)
        })
    },
    fetchCartItems (context) {
      const token = localStorage.getItem('token')

      context.commit('SET_ISLOADING', true)

      Axios({
        method: 'GET',
        url: 'http://localhost:3000/carts',
        headers: { token }
      })
        .then(res => {
          context.commit('SET_CARTS', res.data.carts)
        })
        .catch(err => {
          console.log(err.response.data)
          context.commit('SET_ERROROBJ', err.response.data)
        })
        .finally(() => {
          context.commit('SET_ISLOADING', false)
        })
    },
    saveCart (context, payload) {
      context.commit('SET_ISLOADING', true)

      const token = localStorage.getItem('token')
      const cartItems = context.state.carts

      Promise.all(cartItems.map(el => {
        return Axios({
          method: 'PUT',
          url: `http://localhost:3000/carts/${el.id}`,
          headers: { token },
          data: {
            quantity: el.quantity
          }
        })
      }))
        .then(res => {
          context.commit('SET_CARTS', res[cartItems.length - 1].data.carts)

          router.push({ name: 'Product' })
        })
        .catch(err => {
          console.log(err)
          context.commit('SET_ERROROBJ', err.response.data)
        })
        .finally(() => {
          context.commit('SET_ISLOADING', false)
        })
    },
    deleteItem (context, payload) {
      const token = localStorage.getItem('token')

      context.commit('SET_ISLOADING', true)

      Axios({
        method: 'DELETE',
        url: `http://localhost:3000/carts/${payload}`,
        headers: { token }
      })
        .then(res => {
          context.commit('SET_CARTS', res.data.carts)
          context.commit('SET_SUCCESSOBJ', res.data)
        })
        .catch(err => {
          context.commit('SET_ERROROBJ', err.response.data)
        })
        .finally(() => {
          context.commit('SET_ISLOADING', false)
        })
    },
    checkout (context) {
      const token = localStorage.getItem('token')

      context.commit('SET_ISLOADING', true)

      Axios({
        method: 'PUT',
        url: 'http://localhost:3000/carts/pay',
        headers: { token }
      })
        .then(res => {
          context.commit('SET_SUCCESSOBJ', res.data)

          router.push({ name: 'Product' })
        })
        .catch(err => {
          context.commit('SET_ERROROBJ', err.response.data)
        })
        .finally(() => {
          context.commit('SET_ISLOADING', false)
        })
    },
    // #endregion

    fetchProducts (context) {
      context.commit('SET_ISLOADING', true)
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/products'
      })
        .then(res => {
          context.commit('SET_PRODUCTS', res.data.products)
        })
        .catch(err => {
          context.commit('SET_ERROROBJ', err)
        })
        .finally(() => {
          context.commit('SET_ISLOADING', false)
        })
    },

    // #region user related
    checkLoginState (context, _) {
      const token = localStorage.getItem('token')

      if (token) context.commit('SET_ISLOGIN', true)
    },
    login (context, payload) {
      context.commit('SET_ISLOADING', true)
      const { email, password } = payload

      Axios({
        method: 'POST',
        url: 'http://localhost:3000/customer/login',
        data: {
          email,
          password
        }
      })
        .then(response => {
          const { token, name } = response.data

          localStorage.setItem('token', token)
          localStorage.setItem('name', name)

          context.commit('SET_ISLOGIN', true)

          context.commit('SET_SUCCESSOBJ', { message: 'You successfully logged in!' })

          router.push({ name: 'Home' })
        })
        .catch(err => {
          context.commit('SET_ERROROBJ', err.response.data)
        })
        .finally(() => {
          context.commit('SET_ISLOADING', false)
        })
    },
    logout (context, _) {
      localStorage.clear()

      context.commit('SET_ISLOGIN', false)
    },
    register (context, payload) {
      context.commit('SET_ISLOADING', true)

      const { name, email, password } = payload

      Axios({
        method: 'POST',
        // url: 'http://54.169.136.72/admin/register',
        url: 'http://localhost:3000/customer/register',
        data: {
          name,
          email,
          password
        }
      })
        .then(response => {
          const { token, name } = response.data

          localStorage.setItem('token', token)
          localStorage.setItem('name', name)

          context.commit('SET_ISLOGIN', true)

          context.commit('SET_SUCCESSOBJ', { message: 'You successfully logged in!' })

          router.push({ name: 'Home' })
        })
        .catch(err => {
          context.commit('SET_ERROROBJ', err.response.data)
        })
        .finally(() => {
          context.commit('SET_ISLOADING', false)
        })
    }
    // #endregion
  },
  getters: {
  }
})
