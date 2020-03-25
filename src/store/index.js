import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

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
    }
  },
  actions: {
    register (_, payload) {
      return axios({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: payload
      })
    },
    login (_, payload) {
      return axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: payload
      })
    },
    logout (state) {
      state.commit('SET_ISLOGIN', false)
      localStorage.clear()
      router.replace({ path: '/' })
    }
  },
  modules: {
  }
})
