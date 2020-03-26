import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Product from '../views/Product'
import Login from '../views/Login'
import Register from '../views/Register'
import Cart from '../views/Cart'
import History from '../views/History'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Product',
    component: Product
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/carts',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/history',
    name: 'History',
    component: History
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('checkLoginState')

  if (to.path === '/login' || to.path === '/register') {
    if (store.state.isLogin) {
      next({
        name: 'Home'
      })
    } else {
      next()
    }
  } else {
    if (store.state.isLogin) {
      next()
    } else {
      next({
        name: 'Login'
      })
    }
  }
})

export default router
