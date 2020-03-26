import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false,
    products: [],
    filteredProducts: [],
    productDetail: {},
    productBuy: {},
    cart: {},
    carts: [],
    cartProduct: [],
    cartProductUpdate: {}
  },
  mutations: {
    SET_ISLOGIN (state, value) {
      state.isLogin = value
    },
    SET_ISLOADING (state, value) {
      state.isLoading = value
    },
    SET_PRODUCTS (state, value) {
      state.products = value
    },
    SET_FILTEREDPRODUCTS (state, value) {
      state.filteredProducts = value
    },
    SET_PRODUCTDETAIL (state, value) {
      state.productDetail = value
    },
    SET_PRODUCTBUY (state, value) {
      state.productBuy = value
    },
    SET_CART (state, value) {
      state.cart = value
    },
    SET_CARTS (state, value) {
      state.carts = value
    },
    SET_CARTPRODUCT (state, value) {
      state.cartProduct = value
    },
    SET_CARTPRODUCTUPDATE (state, value) {
      state.cartProductUpdate = value
    }
  },
  actions: {
    login (context, payload) {
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/customers/login',
        data: payload
      })
    },
    register (context, payload) {
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/customers/register',
        data: payload
      })
    },
    getProducts (context, payload) {
      context.commit('SET_ISLOADING', true)
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products'
      })
        .then(result => {
          context.commit('SET_PRODUCTS', result.data)
          context.commit('SET_FILTEREDPRODUCTS', result.data)
          console.log(result.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    getDetail (context, payload) {
      context.commit('SET_ISLOADING', true)
      const id = payload
      axios({
        method: 'GET',
        url: `http://localhost:3000/products/${id}`
      })
        .then(result => {
          context.commit('SET_PRODUCTDETAIL', result.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    getBuy (context, payload) {
      context.commit('SET_ISLOADING', true)
      const id = payload
      return axios({
        method: 'GET',
        url: `http://localhost:3000/products/${id}`
      })
    },
    assignCart (context, payload) {
      const token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: 'http://localhost:3000/carts',
        headers: {
          token
        }
      })
        .then(result => {
          if (result.data.length > 0) {
            const carts = result.data
            const currentCart = carts.filter(el => {
              return el.isPaid === false
            })
            console.log(currentCart)
            if (currentCart.length > 0) {
              context.commit('SET_CART', currentCart[0])
            } else {
              return axios({
                method: 'POST',
                url: 'http://localhost:3000/carts',
                headers: {
                  token
                }
              })
            }
          } else {
            return axios({
              method: 'POST',
              url: 'http://localhost:3000/carts',
              headers: {
                token
              }
            })
          }
        })
        .then(result => {
          console.log('>>>><<<<<<')
          console.log(result)
          console.log('>>>><<<<<<')
          if (result) {
            const newCart = result.data
            context.commit('SET_CART', newCart)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    buyProduct (context, payload) {
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/cartproducts',
        headers: {
          token
        },
        data: payload
      })
    },
    getCarts (context, payload) {
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      axios({
        method: 'GET',
        url: 'http://localhost:3000/carts',
        headers: {
          token
        }
      })
        .then(result => {
          context.commit('SET_CARTS', result.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    deleteCart (context, payload) {
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      const id = payload
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/carts/${id}`,
        headers: {
          token
        }
      })
        .then(result => {
          const condition = {
            icon: 'success',
            title: `Successfully delete cart with id ${id}`
          }
          context.dispatch('notification', condition)
          context.dispatch('getCarts')
        })
        .catch(err => {
          const condition = {
            icon: 'error',
            title: err.response.data.message
          }
          context.dispatch('notification', condition)
          console.log(err.response.data)
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    cartDetail (context, payload) {
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'GET',
        url: 'http://localhost:3000/cartproducts',
        headers: {
          token
        }
      })
    },
    deleteCartProduct (context, payload) {
      const id = payload
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'DELETE',
        url: `http://localhost:3000/cartproducts/${id}`,
        headers: {
          token
        }
      })
    },
    getUpdateCartProduct (context, payload) {
      const id = payload
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      axios({
        method: 'GET',
        url: `http://localhost:3000/cartproducts/${id}`,
        headers: {
          token
        }
      })
        .then(result => {
          console.log(result.data)
          context.commit('SET_CARTPRODUCTUPDATE', result.data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    updateCartProduct (context, payload) {
      const id = payload.id
      const token = localStorage.getItem('token')
      const quantity = payload.quantity
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'PATCH',
        url: `http://localhost:3000/cartproducts/${id}`,
        headers: {
          token
        },
        data: {
          quantity
        }
      })
    },
    editCartStatus (context, payload) {
      const id = payload
      const status = true
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'PATCH',
        url: `http://localhost:3000/carts/${id}`,
        headers: {
          token
        },
        data: {
          isPaid: status
        }
      })
    },
    notification (context, payload) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: payload.icon,
        title: payload.title
      })
      return ''
    }
  },
  modules: {
  }
})
