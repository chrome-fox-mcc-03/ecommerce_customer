import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import { SnotifyPosition } from 'vue-snotify'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vuex: 'Vue available',
    serverUrl: 'http://localhost:3000',
    pageLoading: false,
    userLogin: false,
    pageNum: 1,
    pageSize: 20,
    notifTimeout: 4000,
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
    products: []
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
      router.push({ name: 'Profile' })
    },
    userLogout (state, payload) {
      state.cred.id = 0
      state.cred.email = ''
      state.cred.token = ''
      state.cred.name = ''
      state.cred.avaurl = ''
      state.userLogin = false
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
          item.stock -= amount
        }
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
          console.log(err.response.data)
          commit('showError', err.response.data.error)
        })
        .finally(_ => {
          commit('stopLoading')
        })
    },
    appendItemToCart ({ state, commit, dispatch }, payload) {
      const { itemId, itemName, amount } = payload
      commit('startLoading')
      // append amount of itemId
      // add to CartProduct, axios
      // if success update product locally
      // if fail, fetch product, showError, update product locally
      setTimeout(() => {
        console.log(payload)
        commit('removeAmountItemId', payload)
        commit('stopLoading')
        dispatch('notifSuccess', `${amount} pc${amount > 1 ? 's' : ''} of "${itemName}" added to cart`)
        // dispatch('notifError', `test error too`)
      }, 1000)
    },
    notifSuccess ({ state }, message) {
      // console.log(this._vm.$snotify)
      this._vm.$snotify.success(message, {
        timeout: state.notifTimeout,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        position: SnotifyPosition.rightTop
      })
    },
    notifError ({ state }, message) {
      // console.log(this._vm.$snotify)
      this._vm.$snotify.error(message, {
        timeout: state.notifTimeout,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        position: SnotifyPosition.rightTop
      })
    },
    notifSimple ({ state }, message) {
      this._vm.$snotify.simple(message, {
        timeout: state.notifTimeout,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        position: SnotifyPosition.rightTop
      })
    }
  }
})
