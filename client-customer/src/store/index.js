import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isLogin: false,
    product: {},
    products: [],
    cart: []
  },
  mutations: {
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    login ({ commit, dispatch }, payload) {
      commit('SET_ISLOADING', true)
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          commit('SET_ISLOGIN', true)
          dispatch('fetchProducts')
          dispatch('fetchCart')
          router.push('/')
          Vue.notify({
            group: 'foo',
            type: 'success',
            title: 'Login success'
          })
        })
        .catch(({ response }) => {
          response.data.errors.forEach((el) => {
            Vue.notify({
              group: 'foo',
              type: 'error',
              title: el
            })
          })
        })
        .finally((_) => {
          commit('SET_ISLOADING', false)
        })
    },
    register ({ commit, dispatch }, payload) {
      commit('SET_ISLOADING', true)
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          commit('SET_ISLOGIN', true)
          dispatch('fetchProducts')
          dispatch('fetchCart')
          router.push('/')
          Vue.notify({
            group: 'foo',
            type: 'success',
            title: 'Register success'
          })
        })
        .catch(({ response }) => {
          response.data.errors.forEach((el) => {
            Vue.notify({
              group: 'foo',
              type: 'error',
              title: el
            })
          })
        })
        .finally((_) => {
          commit('SET_ISLOADING', false)
        })
    },
    logout ({ commit }, payload) {
      commit('SET_PRODUCTS', [])
      commit('SET_CART', [])
      commit('SET_ISLOGIN', false)
      localStorage.clear()
      router.push('/')
    },
    fetchProducts ({ commit }, payload) {
      commit('SET_ISLOADING', true)
      axios({
        method: 'get',
        url: 'http://localhost:3000/products',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data.data)
        })
        .catch(({ response }) => {
          response.data.errors.forEach((el) => {
            Vue.notify({
              group: 'foo',
              type: 'error',
              title: el
            })
          })
        })
        .finally((_) => {
          commit('SET_ISLOADING', false)
        })
    },
    fetchCart ({ commit }, payload) {
      commit('SET_ISLOADING', true)
      axios({
        method: 'get',
        url: 'http://localhost:3000/carts',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_CART', data.data)
        })
        .catch(({ response }) => {
          response.data.errors.forEach((el) => {
            Vue.notify({
              group: 'foo',
              type: 'error',
              title: el
            })
          })
        })
        .finally((_) => {
          commit('SET_ISLOADING', false)
        })
    },
    addToCart ({ commit, dispatch }, payload) {
      commit('SET_ISLOADING', true)
      axios({
        method: 'post',
        url: 'http://localhost:3000/carts',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload
        }
      })
        .then(({ data }) => {
          dispatch('fetchProducts')
          dispatch('fetchCart')
          Vue.notify({
            group: 'foo',
            type: 'success',
            title: 'Add product success'
          })
        })
        .catch(({ response }) => {
          response.data.errors.forEach((el) => {
            Vue.notify({
              group: 'foo',
              type: 'error',
              title: el
            })
          })
        })
        .finally((_) => {
          commit('SET_ISLOADING', false)
        })
    },
    reduceFromCart ({ commit, dispatch }, payload) {
      commit('SET_ISLOADING', true)
      const id = payload
      axios({
        method: 'put',
        url: `http://localhost:3000/carts/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchProducts')
          dispatch('fetchCart')
          Vue.notify({
            group: 'foo',
            type: 'warning',
            title: 'Reduce product success'
          })
        })
        .catch(({ response }) => {
          response.data.errors.forEach((el) => {
            Vue.notify({
              group: 'foo',
              type: 'error',
              title: el
            })
          })
        })
        .finally((_) => {
          commit('SET_ISLOADING', false)
        })
    },
    deleteItem ({ commit, dispatch }, payload) {
      commit('SET_ISLOADING', true)
      const id = payload
      axios({
        method: 'delete',
        url: `http://localhost:3000/carts/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchProducts')
          dispatch('fetchCart')
          Vue.notify({
            group: 'foo',
            type: 'warning',
            title: 'Item deleted'
          })
        })
        .catch(({ response }) => {
          response.data.errors.forEach((el) => {
            Vue.notify({
              group: 'foo',
              type: 'error',
              title: el
            })
          })
        })
        .finally((_) => {
          commit('SET_ISLOADING', false)
        })
    },
    getDetailProduct ({ commit, dispatch }, payload) {
      commit('SET_ISLOADING', true)
      const id = payload
      axios({
        method: 'GET',
        url: `http://localhost:3000/products/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCT', data.data)
        })
        .catch(({ response }) => {
          response.data.errors.forEach((el) => {
            Vue.notify({
              group: 'foo',
              type: 'error',
              title: el
            })
          })
        })
        .finally((_) => {
          commit('SET_ISLOADING', false)
        })
    }
  },
  getters: {
    getUnpaidCart: state => {
      return state.cart.filter(el => el.isPaid === false)
    },
    getPaidCart: state => {
      return state.cart.filter(el => el.isPaid === true)
    },
    getProductsCategory1: state => {
      return state.products.filter(el => el.category === 'food and beverages')
    },
    getProductsCategory2: state => {
      return state.products.filter(el => el.category === 'electronic')
    },
    getProductsCategory3: state => {
      return state.products.filter(el => el.category === 'fashion')
    },
    getProductsCategory4: state => {
      return state.products.filter(el => el.category === 'hobby')
    },
    getProductsCategory5: state => {
      return state.products.filter(el => el.category === 'automotive')
    },
    getProductsCategory6: state => {
      return state.products.filter(el => el.category === 'others')
    }
  }
})
