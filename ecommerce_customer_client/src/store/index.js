import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    isLogin: false,
    profile: {},
    product: {}
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    ADD_TO_CART (state, payload) {
      const isProductInCart = state.cart.find(item => {
        return item.product.id === payload.product.id
      })
      if (isProductInCart) {
        isProductInCart.quantity += payload.quantity
        return
      }
      state.cart.push(payload)
    },
    SET_CART (state, payload) {
      payload.cart.forEach(element => {
        state.cart.push({ product: element.Product, quantity: element.quantity })
      })
    },
    REMOVE_PRODUCT_IN_CART (state, payload) {
      state.cart = state.cart.filter(item => {
        return item.product.id !== payload.product.id
      })
    },
    REMOVE_ALL_PRODUCT_IN_CART (state) {
      state.cart = []
    },
    SET_LOGIN_STATUS (state, payload) {
      state.isLogin = payload
    },
    SET_PROFILE (state, payload) {
      state.profile = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    }
  },
  actions: {
    onFetchProduct ({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product'
      })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data.result)
        }).catch((err) => {
          Vue.notify({
            group: 'auth',
            type: 'error',
            title: 'Cannot fetch data!',
            text: 'Server internal error! ' + err.message
          })
        })
    },

    onRegisterUser ({ dispatch, commit }, { email, password }) {
      axios({
        method: 'POST',
        url: `http://localhost:3000/register/${email}`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          // dispatch('createCart')
          Vue.notify({
            group: 'auth',
            type: 'success',
            title: 'Registration Succeed',
            text: 'Your account has been created! ' + data.email
          })
        }).catch((err) => {
          Vue.notify({
            group: 'auth',
            type: 'error',
            title: 'Registration Failed',
            text: 'Failed to create your account, please check your input! ' + err.message
          })
        })
    },

    onLoginUser ({ dispatch, commit }, { email, password }) {
      axios({
        method: 'POST',
        url: `http://localhost:3000/login/${email}`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          commit('SET_LOGIN_STATUS', true)
          commit('SET_PROFILE', { email })
          Vue.notify({
            group: 'auth',
            type: 'success',
            title: 'Login Succeed',
            text: 'Happy shopping!' + email
          })
        }).catch((err) => {
          Vue.notify({
            group: 'auth',
            type: 'error',
            title: 'Login Failed',
            text: 'Failed to login, please check your input! ' + err.message
          })
        })
    },

    addProductToCart ({ commit }, { product, quantity }) {
      const accessToken = localStorage.getItem('access_token')

      if (accessToken) {
        if (quantity) {
          commit('ADD_TO_CART', { product, quantity })
          axios({
            method: 'POST',
            url: 'http://localhost:3000/addtocart',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              product,
              quantity
            }
          })
            .then(({ data }) => {
              Vue.notify({
                group: 'auth',
                type: 'success',
                title: 'Added to cart!',
                text: 'Your item has been successfully added to cart'
              })
            }).catch((err) => {
              Vue.notify({
                group: 'auth',
                type: 'error',
                title: 'Add to cart Failed',
                text: 'Failed to add item! ' + err.message
              })
            })
        } else {
          Vue.notify({
            group: 'auth',
            type: 'error',
            title: 'Minimum Quantity',
            text: 'Minimum quantity at least 1'
          })
        }
      } else {
        Vue.notify({
          group: 'auth',
          type: 'error',
          title: 'Add to cart Failed',
          text: 'Please Login first'
        })
      }
    },

    createCart ({ commit }) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          localStorage.setItem('cart', data.cartId)
        }).catch((err) => {
          Vue.notify({
            group: 'auth',
            type: 'error',
            title: 'Cart generate error',
            text: 'Failed to generate your cart, please retry login! ' + err.message
          })
        })
    },

    fetchCart ({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/cartitem',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_CART', { cart: data.result })
        }).catch((_) => {
          Vue.notify({
            group: 'auth',
            type: 'primary',
            title: 'Checkout our products and Go add some stuff! :)',
            text: ''
          })
        })
    },

    removeProduct ({ commit }, { product }) {
      commit('REMOVE_PRODUCT_IN_CART', { product })
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/cartitem/${product.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Vue.notify({
            group: 'auth',
            type: 'success',
            title: 'Product removed!',
            text: 'Your item has been successfully removed from cart'
          })
        }).catch((err) => {
          Vue.notify({
            group: 'auth',
            type: 'error',
            title: 'Remove product Failed',
            text: err.message
          })
        })
    },

    removeAllProduct ({ commit }) {
      commit('REMOVE_ALL_PRODUCT_IN_CART')
      axios({
        method: 'DELETE',
        url: 'http://localhost:3000/cartitem/',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Vue.notify({
            group: 'auth',
            type: 'success',
            title: 'Cart cleared!',
            text: 'Your cart has been successfully cleared'
          })
        }).catch((err) => {
          Vue.notify({
            group: 'auth',
            type: 'error',
            title: 'Remove product Failed',
            text: err.message
          })
        })
    },

    removeCart ({ commit }) {
      axios({
        method: 'DELETE',
        url: 'http://localhost:3000/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Vue.notify({
            group: 'auth',
            type: 'success',
            title: 'Cart cleared!',
            text: 'Your cart has been successfully cleared'
          })
        }).catch((err) => {
          Vue.notify({
            group: 'auth',
            type: 'error',
            title: 'Removing cart Failed',
            text: err.message
          })
        })
    },

    onLogoutUser ({ dispatch, commit }) {
      commit('SET_LOGIN_STATUS', false)
      localStorage.clear()
      Vue.notify({
        group: 'auth',
        type: 'success',
        title: 'User Logged Out!',
        text: 'successfully logged out'
      })
    },

    showDetail ({ dispatch, commit }, { name, productId }) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/product/${productId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCT', { data })
          router.push('/show-detail')
        }).catch((err) => {
          Vue.notify({
            group: 'auth',
            type: 'error',
            title: 'Removing cart Failed',
            text: err.message
          })
        })
    }
  },
  getters: {
    countItemInCart (state) {
      return state.cart.length
    },
    countTotalPrice (state) {
      let total = 0
      state.cart.forEach(item => {
        total += (item.product.price * item.quantity)
      })

      return total
    }
  }
})
