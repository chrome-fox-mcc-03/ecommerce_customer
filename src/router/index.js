import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Shop from '../views/Shop.vue'
import Cart from '../views/Cart.vue'
import store from '../store'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAnon: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAnon: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = 'Belanja'
  store.commit('startLoading')
  const storage = JSON.parse(localStorage.getItem(store.state.appName))
  let token = ''
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.userLogin) {
      next()
      store.commit('stopLoading')
    } else {
      if (storage) {
        token = storage.token
        axios({
          url: `${store.state.serverUrl}/customer/token`,
          method: 'GET',
          headers: {
            token
          }
        })
          .then(result => {
            store.commit('userLogin', result.data.user)
            next()
          })
          .catch(_ => {
            next({ path: '/login' })
            localStorage.removeItem(store.state.appName)
          })
          .finally(_ => {
            store.commit('stopLoading')
          })
        // axios cek token
      } else {
        next({ path: '/login' })
        store.commit('stopLoading')
      }
    }
  } else if (to.matched.some(record => record.meta.requiresAnon)) {
    if (store.getters.userLogin) {
      next({ path: '/profile' })
      store.commit('stopLoading')
    } else {
      if (storage) {
        token = storage.token
        axios({
          url: `${store.state.serverUrl}/customer/token`,
          method: 'GET',
          headers: {
            token
          }
        })
          .then(result => {
            next({ path: '/profile' })
            store.commit('userLogin', result.data.user)
          })
          .catch(_ => {
            next()
            localStorage.removeItem(store.state.appName)
          })
          .finally(_ => {
            store.commit('stopLoading')
          })
      } else {
        next()
        store.commit('stopLoading')
      }
    }
  } else {
    next()
    store.commit('stopLoading')
  }
})

export default router
