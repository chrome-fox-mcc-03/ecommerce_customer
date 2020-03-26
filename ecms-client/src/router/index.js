import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('Access_Token')
      if (token) {
        next()
      } else {
        next({ name: 'Home' })
      }
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('Access_Token')
      if (token) {
        next()
      } else {
        next({ name: 'Home' })
      }
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('Access_Token')
      if (token) {
        next()
      } else {
        next({ name: 'Home' })
      }
    }
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
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
