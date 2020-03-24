import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vuex: 'Vue available',
    serverUrl: 'http://localhost:3000/customer',
    pageLoading: false,
    userLogin: false,
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
    }
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
    }
  },
  actions: {
    register ({ state, commit }, payload) {
      // console.log(payload)
      commit('startLoading')
      axios({
        url: `${state.serverUrl}/register`,
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
        url: `${state.serverUrl}/login`,
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
    }
  }
})
