import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import { SnotifyPosition } from 'vue-snotify'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vuex: 'Vue available',
    appName: 'ecommercecustomerclient',
    serverUrl: 'http://localhost:3000',
    pageLoading: false,
    userLogin: false,
    pageNum: 1,
    pageSize: 20,
    notifTimeout: 3500,
    cred: {
      id: 0,
      email: '',
      token: '',
      name: '',
      avaurl: ''
    },
    errorMsg: {
      msg: '',
      color: 'danger',
      show: false
    },
    products: [],
    customerCart: []
  },
  mutations: {
    startLoading (state) {
      state.pageLoading = true
    },
    stopLoading (state) {
      state.pageLoading = false
    },
    userLogin (state, payload) {
      state.cred.id = payload.id
      state.cred.email = payload.email
      state.cred.token = payload.token
      state.cred.name = payload.name
      state.cred.avaurl = payload.avaurl
      state.userLogin = true
      localStorage.setItem(state.appName, JSON.stringify({ token: state.cred.token }))
      router.push({ name: 'Profile' })
    },
    userLogout (state, payload) {
      state.cred.id = 0
      state.cred.email = ''
      state.cred.token = ''
      state.cred.name = ''
      state.cred.avaurl = ''
      state.userLogin = false
      localStorage.removeItem(state.appName)
      router.push({ name: 'Login' })
    },
    showError (state, message) {
      state.errorMsg.msg = message
      state.errorMsg.show = true
    },
    removeError (state) {
      state.errorMsg.msg = ''
      state.errorMsg.show = false
    },
    emptyProduct (state) {
      state.products = []
    },
    fillProduct (state, payload) {
      payload.forEach(item => {
        state.products.push(item)
      })
    },
    removeAmountItemId (state, payload) {
      const { itemId, amount } = payload
      state.products.forEach(item => {
        if (item.id === itemId) {
          item.stock -= Number(amount)
        }
      })
      state.customerCart.forEach(item => {
        if (item.itemId === itemId) {
          item.quantity += Number(amount)
        }
      })
    },
    fillCart (state, payload) {
      state.customerCart = payload
    },
    removeCartId (state, id) {
      state.customerCart = state.customerCart.filter(item => {
        return item.itemId !== id
      })
    },
    updateCartQtyId (state, payload) {
      const cartItemId = payload.cartItemId
      const qty = Number(payload.qty)
      state.customerCart.forEach(item => {
        if (item.id === cartItemId) {
          item.quantity = qty
        }
      })
    },
    clearCart (state) {
      state.customerCart = []
    },
    checkoutCart (state) {
      state.customerCart.forEach(cartItem => {
        state.products.forEach(product => {
          if (cartItem.itemId === product.id) {
            product.stock -= cartItem.quantity
          }
        })
      })
    }
  },
  actions: {
    register ({ state, commit }, payload) {
      // console.log(payload)
      commit('startLoading')
      axios({
        url: `${state.serverUrl}/customer/register`,
        method: 'POST',
        data: payload
      })
        .then(result => {
          // console.log(result.data)
          commit('userLogin', result.data.user)
        })
        .catch(err => {
          // console.log(err.response.data.errors)
          commit('showError', err.response.data.errors[0])
        })
        .finally(_ => {
          commit('stopLoading')
        })
    },
    login ({ state, commit }, payload) {
      // console.log(payload)
      commit('startLoading')
      axios({
        url: `${state.serverUrl}/customer/login`,
        method: 'POST',
        data: payload
      })
        .then(result => {
          // console.log(result.data)
          commit('userLogin', result.data.user)
        })
        .catch(err => {
          // console.log(err.response)
          commit('showError', err.response.data.error)
        })
        .finally(_ => {
          commit('stopLoading')
        })
    },
    fetchFromShop ({ state, commit }) {
      commit('startLoading')
      commit('emptyProduct')
      commit('removeError')
      axios({
        url: `${state.serverUrl}/customer/shop?page=${state.pageNum}&size=${state.pageSize}`,
        method: 'GET',
        headers: {
          token: state.cred.token
        }
      })
        .then(result => {
          commit('fillProduct', result.data.products)
        })
        .catch(err => {
          // console.log(err.response.data)
          commit('showError', err.response.data.error)
        })
        .finally(_ => {
          commit('stopLoading')
        })
    },
    appendItemToCart ({ state, commit, dispatch }, payload) {
      const { itemId, itemName, amount } = payload
      // append amount of itemId
      // add to CartProduct, axios
      // if success update product locally
      // if fail, fetch product, showError, update product locally
      const body = {
        itemId,
        amount
      }
      commit('startLoading')
      axios({
        url: `${state.serverUrl}/customer/cart`,
        method: 'POST',
        headers: {
          token: state.cred.token
        },
        data: body
      })
        .then(result => {
          const msg = itemName + ':' + result.data.message
          dispatch('notifSuccess', msg)
          commit('removeAmountItemId', payload)
        })
        .catch(err => {
          const msg = err.response.data.error
          dispatch('notifError', msg)
        })
        .finally(_ => {
          commit('stopLoading')
          dispatch('fetchCart')
        })
    },
    fetchCart ({ state, commit, dispatch }) {
      console.log('fetch cart')
      commit('startLoading')
      axios({
        url: `${state.serverUrl}/customer/cart`,
        method: 'GET',
        headers: {
          token: state.cred.token
        }
      })
        .then(result => {
          commit('fillCart', result.data.cartItems)
        })
        .catch(err => {
          dispatch('notifError', err.response.data.error)
        })
        .finally(_ => {
          commit('stopLoading')
        })
    },
    deleteCartItem ({ state, commit, dispatch }, payload) {
      const { cartItemId } = payload
      let msg = ''
      console.log(cartItemId, 'will be deleted')
      commit('startLoading')
      axios({
        url: `${state.serverUrl}/customer/cart/${cartItemId}`,
        method: 'DELETE',
        headers: {
          token: state.cred.token
        }
      })
        .then(result => {
          msg = result.data.message
          commit('removeCartId', cartItemId)
          dispatch('fetchCart')
          dispatch('notifSuccess', msg)
        })
        .catch(err => {
          dispatch('notifError', err.response.data.error)
        })
        .finally(_ => {
          commit('stopLoading')
        })
    },
    updateCartItemQty ({ state, commit, dispatch }, payload) {
      // apdet axios
      const cartItemId = payload.cartItemId
      const qty = Number(payload.qty)
      axios({
        url: `${state.serverUrl}/customer/cart/${cartItemId}`,
        method: 'PATCH',
        headers: {
          token: state.cred.token
        },
        data: {
          amount: qty
        }
      })
        .then(result => {
          commit('updateCartQtyId', payload)
          dispatch('notifSuccess', result.data.message)
        })
        .catch(err => {
          dispatch('notifError', err.response.data.error)
        })
        .finally(_ => {
          dispatch('fetchCart')
          commit('stopLoading')
        })
    },
    clearCart ({ state, commit, dispatch }) {
      commit('clearCart')
    },
    checkoutCart ({ state, commit, dispatch }) {
      commit('checkoutCart')
    },
    notifSuccess ({ state }, message) {
      // console.log(this._vm.$snotify)
      this._vm.$snotify.success(message, {
        timeout: state.notifTimeout,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        position: SnotifyPosition.rightTop
      })
    },
    notifError ({ state }, message) {
      // console.log(this._vm.$snotify)
      this._vm.$snotify.error(message, {
        timeout: state.notifTimeout,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        position: SnotifyPosition.rightTop
      })
    },
    notifSimple ({ state }, message) {
      this._vm.$snotify.simple(message, {
        timeout: state.notifTimeout,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        position: SnotifyPosition.rightTop
      })
    }
  }
})
