import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    itemsCart: [],
    loading: true,
    total: 0,
    category: [],
    findOneItem: [],
    rate: [],
    filter: '',
    err: [],
    login: false
  },
  mutations: {
    SET_ITEM (state, payload) {
      state.items = payload
    },
    SET_ITEM_CART (state, payload) {
      state.itemsCart = payload
    },
    SET_QTY (state, payload) {
      state.itemsCart.push(payload)
    },
    SET_TOTAL (state, payload) {
      state.total = payload
    },
    SET_CATEGORY (state, payload) {
      state.category = payload
    },
    SET_FINDONE (state, payload) {
      state.findOneItem = payload
    },
    SET_FILTER (state, payload) {
      state.filter = payload
    },
    SET_ERR (state, payload) {
      state.err = payload
    },
    SET_LOGIN (state, payload) {
      state.login = payload
    }
  },
  actions: {
    fetchItem ({ commit }) {
      return axios({
        method: 'get',
        url: 'http://localhost:3000/product'
      })
        .then(data => {
          setTimeout(e => {
            this.state.loading = false
          }, 1000)
          data.data.forEach(el => {
            const price = el.price.toLocaleString('id-ID')
            el.price = price
            if (el.ratings[0].rate != null) {
              const rate = Math.round(el.ratings[0].rate / el.ratings[0].hit)
              el.ratings[0].rate = rate
            } else {
              el.ratings[0].rate = 0
            }
          })

          commit('SET_ITEM', data.data)
        })
        .catch(err => {
          commit('SET_ERR', err.response.data.message)
        })
    },
    fetchCart ({ commit }) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/Cart',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          let total = 0
          const test = data.data.filter(el => el.Status === false)
          test.forEach(el => {
            let subtotal = 0
            subtotal += el.Production.price * el.Stock
            el.Production.price = subtotal
            total += el.Production.price
            const test = el.Production.price.toLocaleString('id-ID')
            el.Production.price = test
          })
          commit('SET_ITEM_CART', test)
          commit('SET_TOTAL', total.toLocaleString('id-ID'))
        })
        .catch(err => {
          commit('SET_ERR', err.response.data.message)
        })
    },
    addToCart ({ commit }, payload) {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/cart',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          idProduct: payload.id,
          stock: 1
        }
      })
    },
    deleteFromCart ({ commit }, payload) {
      return axios({
        url: `http://localhost:3000/cart/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        },
        method: 'delete'
      })
    },
    minQty ({ commit }, payload) {
      return axios({
        url: `http://localhost:3000/cart/desc/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        },
        method: 'patch'
      })
    },
    category ({ commit }) {
      axios({
        url: 'http://localhost:3000/cart/category',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          commit('SET_CATEGORY', data.data)
        })
        .catch(err => {
          commit('SET_ERR', err.response.data.message)
        })
    },
    fetchOne ({ commit }, payload) {
      axios({
        url: `http://localhost:3000/product/${payload}`,
        method: 'get'
      })
        .then(data => {
          commit('SET_FINDONE', data.data)
        })
        .catch(err => {
          commit('SET_ERR', err.response.data.message)
        })
    },
    addRate ({ commit }, payload) {
      axios({
        url: 'http://localhost:3000/product/rate',
        method: 'post',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          rate: payload.rate,
          id: payload.id
        }
      })
        .then(data => {
          commit('SET_ERR', data.data)
        })
        .catch(err => {
          commit('SET_ERR', err.response.data.message)
        })
    },
    checkOut ({ commit }) {
      return axios({
        method: 'get',
        url: 'http://localhost:3000/cart/checkout',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    test ({ commit }, payload) {
      commit('SET_ITEM', payload)
    },
    login ({ commit }, payload) {
      return axios({
        url: 'http://localhost:3000/loginUser',
        data: {
          email: payload.email,
          password: payload.password
        },
        method: 'post'
      })
    },
    register ({ commit }, payload) {
      return axios({
        url: 'http://localhost:3000/registerUser',
        data: {
          email: payload.email,
          password: payload.password
        },
        method: 'post'
      })
    }
  },
  getters: {
    costume: state => {
      if (state.filter) {
        const data = state.items.filter(el => el.Category.name === 'Costume')
        return data.filter(el => el.name.includes(state.filter))
      } else {
        if (state.items) {
          return state.items.filter(el => el.Category.name === 'Costume')
        }
      }
    },
    gundam: state => {
      if (state.filter) {
        const data = state.items.filter(el => el.Category.name === 'Gundam')
        return data.filter(el => el.name.includes(state.filter))
      } else {
        if (state.items) {
          return state.items.filter(el => el.Category.name === 'Gundam')
        }
      }
    },
    merchandise: state => {
      if (state.filter) {
        const data = state.items.filter(el => el.Category.name === 'Merchandies')
        return data.filter(el => el.name.includes(state.filter))
      } else {
        if (state.items) {
          return state.items.filter(el => el.Category.name === 'Merchandies')
        }
      }
    },
    figure: state => {
      if (state.filter) {
        const data = state.items.filter(el => el.Category.name === 'Figure')
        return data.filter(el => el.name.includes(state.filter))
      } else {
        if (state.items) {
          return state.items.filter(el => el.Category.name === 'Figure')
        }
      }
    },
    findOne: state => {
      if (state.filter) {
        return state.items.filter(el => el.name.includes(state.filter))
      } else {
        return state.items
      }
    }
  },
  modules: {
  }
})
