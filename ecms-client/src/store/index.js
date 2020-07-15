import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'
import app from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    Cart: [],
    Products: [],
    Order: [],
    Bgm: false
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_CART (state, payload) {
      state.Cart = payload
    },
    SET_PRODUCT (state, payload) {
      state.Products = payload
    },
    SET_ORDER (state, payload) {
      state.Order = payload
    },
    SET_BGM (state, payload) {
      state.Bgm = payload
    },
    SET_BGM1 (state, payload) {
      state.Bgm = !state.Bgm
    }
  },
  actions: {
    Login (context, payload) {
      Axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/user/login',
        method: 'POST',
        data: {
          Email: payload.Email,
          Password: payload.Password
        }
      })
        .then(result => {
          router.push('/')
          app.$Progress.finish()
          app.$toasted.show(`Welcome ${result.data.Email}`)
          localStorage.setItem('Access_Token', result.data.Access_Token)
          setTimeout(() => {
            context.dispatch('FetchProduct')
            context.dispatch('FetchCart')
            context.dispatch('FetchOrder')
          }, 500)
          context.commit('SET_LOGIN', true)
          context.commit('SET_BGM', true)
        })
        .catch(err => {
          app.$Progress.finish()
          app.$toasted.show(err)
          app.$toasted.show('Wrong Username / Password')
        })
    },
    Register (context, payload) {
      Axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/user/register',
        method: 'POST',
        data: {
          Email: payload.Email,
          Password: payload.Password
        }
      })
        .then(result => {
          app.$Progress.finish()
          app.$toasted.show('Register Success!!')
          router.push('login')
        })
        .catch((err) => {
          app.$Progress.finish()
          app.$toasted.error(`Register Error, ${err}`)
        })
    },
    FetchProduct (context, payload) {
      Axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/products',
        method: 'GET',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        }
      })
        .then(result => {
          context.commit('SET_PRODUCT', result.data)
        })
        .catch(err => {
          app.$toasted.show(`Failed Fetching Product, ${err}`)
        })
    },
    AddtoCart (context, payload) {
      Axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/products/cart',
        method: 'POST',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        },
        data: payload
      })
        .then(result => {
          app.$toasted.show('Successfully Added To Cart')
          context.dispatch('FetchCart')
        })
        .catch(err => {
          app.$toasted.show(`Failed to Add Cart, ${err}`)
        })
    },
    Checkout (context, payload) {
      app.$Progress.start()
      Axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/products/checkout',
        method: 'PATCH',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        }
      })
        .then(result => {
          app.$Progress.finish()
          context.dispatch('FetchCart')
          context.dispatch('FetchOrder')
          context.dispatch('FetchProduct')
          router.push('/')
          app.$toasted.show('Checkout Success!!')
          setTimeout(() => {
            router.push('/order')
          }, 500)
        })
        .catch(err => {
          app.$toasted.show(err)
          app.$Progress.finish()
          app.$toasted.show('Insufficient Stock')
        })
    },
    UpdateCart (context, payload) {
      app.$bvModal.hide(`Modal${payload.id}`)
      app.$Progress.start()
      Axios({
        url: `https://afternoon-atoll-02314.herokuapp.com/products/cart/${payload.id}`,
        method: 'PUT',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        },
        data: payload
      })
        .then(result => {
          app.$toasted.show('Successfully Updated')
          context.dispatch('FetchCart')
          router.push('/')
          app.$Progress.finish()
          setTimeout(() => {
            router.push('/cart')
          }, 500)
        })
        .catch(err => {
          app.$Progress.finish()
          app.$toasted.alert(err)
          app.$toasted.show('Failed to Update the Cart')
        })
    },
    DeleteCart (context, payload) {
      app.$bvModal.hide(`Modal${payload.id}`)
      app.$Progress.start()
      Axios({
        url: `https://afternoon-atoll-02314.herokuapp.com/products/cart/${payload.id}`,
        method: 'DELETE',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        }
      })
        .then(result => {
          app.$toasted.show('Successfully Deleted')
          context.dispatch('FetchCart')
          router.push('/')
          app.$Progress.finish()
          setTimeout(() => {
            router.push('/cart')
          }, 500)
        })
    },
    FetchOrder (context, payload) {
      Axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/products/order',
        method: 'GET',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        }
      })
        .then(result => {
          context.commit('SET_ORDER', result.data)
        })
        .catch(err => {
          app.$toasted.show(`Fail to Fetch, ${err}`)
        })
    },
    FetchCart (context, payload) {
      Axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/products/cart',
        method: 'GET',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        }
      })
        .then(result => {
          context.commit('SET_CART', result.data)
        })
        .catch(err => {
          app.$toasted.show(`Fail to Fetch, ${err}`)
        })
    },
    Logout (context, payload) {
      context.commit('SET_CART', [])
      context.commit('SET_PRODUCT', [])
      context.commit('SET_ORDER', [])
      context.commit('SET_LOGIN', false)
      context.commit('SET_BGM', false)
    }
  },
  modules: {
  },
  getters: {
  }
})
