import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const ecommerceAPI = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'https://pacific-harbor-70520.herokuapp.com'
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: localStorage.getItem('access_token') || '',
    products: [],
    product: {
      name: '',
      Category: { name: '' }
    },
    cartitems: []
  },
  mutations: {
    SET_ACCESS_TOKEN (state, data) {
      localStorage.setItem('access_token', data)
      state.access_token = data
    },
    LOGOUT (state) {
      state.access_token = ''
    },
    SET_PRODUCTS (state, products) {
      state.products = products
    },
    SET_PRODUCT (state, product) {
      state.product = product
    },
    SET_CART (state, data) {
      state.cartitems = data
    },
    ADD_TO_CART (state, cartitem) {
      state.cartitems.push(cartitem)
    },
    UPDATE_CART_ITEM (state, cartitem) {
      state.cartitems = [...state.cartitems.filter(el => el.id !== cartitem.id), cartitem]
    },
    DELETE_CART_ITEM (state, id) {
      state.cartitems = [...state.cartitems.filter(el => el.id !== id)]
    },
    CHECKOUT (state) {
      state.cartitems = []
    }
  },
  actions: {
    submitSignUp ({ commit }, data) {
      return new Promise((resolve, reject) => {
        ecommerceAPI.post('/register', data)
          .then(({ data }) => {
            commit('SET_ACCESS_TOKEN', data.data.access_token)
            resolve('/')
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    submitLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        ecommerceAPI.post('/login', data)
          .then(({ data }) => {
            commit('SET_ACCESS_TOKEN', data.access_token)
            resolve('/')
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getProducts ({ commit }) {
      ecommerceAPI.get('/products')
        .then(({ data }) => {
          commit('SET_PRODUCTS', data.products)
        })
        .catch(_ => {
        })
    },
    getProduct ({ commit }, id) {
      ecommerceAPI.get(`/products/${id}`)
        .then(({ data }) => {
          commit('SET_PRODUCT', data.product)
        })
        .catch(_ => {
        })
    },
    addToCart ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        if (state.cartitems.some(item => item.Product.id === id)) {
          const filter = state.cartitems.filter(item => {
            return item.Product.id === id
          })
          const cartitem = filter[0]
          const data = {
            quantity: cartitem.quantity + 1,
            ProductId: cartitem.Product.id
          }
          ecommerceAPI.put(`/cartitems/${cartitem.id}`, data, {
            headers: {
              access_token: state.access_token
            }
          })
            .then(({ data }) => {
              commit('UPDATE_CART_ITEM', data.cartitem)
              resolve(data)
            })
            .catch(err => {
              reject(err)
            })
        } else {
          const data = {
            quantity: 1,
            ProductId: id
          }
          ecommerceAPI.post('/cartitems', data, {
            headers: {
              access_token: state.access_token
            }
          })
            .then(({ data }) => {
              commit('ADD_TO_CART', data.cartitem)
              resolve(data)
            })
            .catch(err => {
              reject(err)
            })
        }
      })
    },
    getCart ({ commit, state }) {
      ecommerceAPI.get('/cartitems', {
        headers: {
          access_token: state.access_token
        }
      })
        .then(({ data }) => {
          commit('SET_CART', data.cartitems)
        })
        .catch(_ => {
        })
    },
    changeQuantity ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        ecommerceAPI.put(`/cartitems/${data.id}`, data, {
          headers: {
            access_token: state.access_token
          }
        })
          .then(({ data }) => {
            commit('UPDATE_CART_ITEM', data.cartitem)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteCartItem ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        ecommerceAPI.delete(`/cartitems/${id}`, {
          headers: {
            access_token: state.access_token
          }
        })
          .then(({ data }) => {
            commit('DELETE_CART_ITEM', id)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    checkout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        ecommerceAPI.get('/cartitems/checkout', {
          headers: {
            access_token: state.access_token
          }
        })
          .then(({ data }) => {
            commit('CHECKOUT')
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {
    totalCartItemPrice (state) {
      let total = 0

      state.cartitems.forEach(el => {
        total += el.Product.price * el.quantity
      })
      return total
    }
  }
})
