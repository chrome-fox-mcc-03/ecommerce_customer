import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
import Cart from '../views/Cart.vue'
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
    path: '/browse',
    name: 'Browse',
    component: Browse
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      login: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      login: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      login: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && !localStorage.getItem('token')) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
