import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    isLogin: false
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
    }
  },
  actions: {
    onFetchProduct ({ commit }) {
      Axios({
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

    onRegisterUser ({ commit }, { email, password }) {
      Axios({
        method: 'POST',
        url: `http://localhost:3000/register/${email}`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          // console.log(data)
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
      Axios({
        method: 'POST',
        url: `http://localhost:3000/login/${email}`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          dispatch('createCart')
          commit('SET_LOGIN_STATUS', true)
          Vue.notify({
            group: 'auth',
            type: 'success',
            title: 'Login Succeed',
            text: 'Happy shopping!'
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
      commit('ADD_TO_CART', { product, quantity })
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/addtocart',
        headers: {
          access_token: localStorage.getItem('access_token'),
          cartId: localStorage.getItem('cart')
        },
        data: {
          product,
          quantity
        }
      })
        .then(({ data }) => {
          console.log(data, 'inserted')
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
    },

    createCart ({ commit }) {
      console.log('calling ouut cart')
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'data')
          localStorage.setItem('cart', data.cartId)
        }).catch((err) => {
          console.log(err.name)
          Vue.notify({
            group: 'auth',
            type: 'error',
            title: 'Cart generate error',
            text: 'Failed to generate your cart, please retry login! ' + err.message
          })
        })
    },

    fetchCart ({ commit }) {
      console.log('remove item in cart')
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/cartitem',
        headers: {
          access_token: localStorage.getItem('access_token'),
          cartId: localStorage.getItem('cart')
        }
      })
        .then(({ data }) => {
          console.log(data.result, 'cart fetched')
          commit('SET_CART', { cart: data.result })
        }).catch((err) => {
          console.log(err)
        })
    },

    removeProduct ({ commit }, { product }) {
      console.log(product, 'removed item <<')
      commit('REMOVE_PRODUCT_IN_CART', { product })
      Axios({
        method: 'DELETE',
        url: `http://localhost:3000/cartitem/${product.id}`,
        headers: {
          access_token: localStorage.getItem('access_token'),
          cartId: localStorage.getItem('cart')
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
          console.log(err)
        })
    },

    removeAllProduct ({ commit }) {
      console.log('remove all')
      commit('REMOVE_ALL_PRODUCT_IN_CART')
      Axios({
        method: 'DELETE',
        url: 'http://localhost:3000/cartitem/',
        headers: {
          access_token: localStorage.getItem('access_token'),
          cartId: localStorage.getItem('cart')
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
          console.log(err)
        })
    },

    removeCart ({ commit }) {
      console.log('remove cart')
      Axios({
        method: 'DELETE',
        url: 'http://localhost:3000/cart',
        headers: {
          access_token: localStorage.getItem('access_token'),
          cartId: localStorage.getItem('cart')
        }
      })
        .then(({ data }) => {
          console.log('logged out')
        }).catch((err) => {
          console.log(err)
        })
    },

    onLogoutUser ({ dispatch, commit }) {
      commit('SET_LOGIN_STATUS', false)
      dispatch('removeCart')
      localStorage.clear()
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
