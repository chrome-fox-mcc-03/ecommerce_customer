import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import UserLogin from '../views/UserLogin'
import UserRegister from '../views/UserRegister'
import ProductList from '../views/ProductList'
import Promos from '../views/Promos'
import ProductDetail from '../views/ProductDetail'
import Cart from '../views/Cart'
import CheckoutHistory from '../views/CheckoutHistory'
import CheckoutSuccess from '../views/CheckoutSuccess'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (!token) {
        next()
      } else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegister,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (!token) {
        next()
      } else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductList,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  },
  {
    path: '/cart/history',
    name: 'CheckoutHistory',
    component: CheckoutHistory,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  },
  {
    path: '/checkoutsuccess',
    name: 'CheckoutSuccess',
    component: CheckoutSuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === '/cart') {
        next()
      } else {
        const currentPath = from.path
        next({ path: currentPath })
      }
    }
  },
  {
    path: '/promos',
    name: 'Promos',
    component: Promos
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
