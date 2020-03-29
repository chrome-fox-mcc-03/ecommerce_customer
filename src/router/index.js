import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      auth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register'),
    meta: {
      auth: false
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Carts'),
    meta: {
      auth: true
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History'),
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        name: 'Login'
      })
    }
  } else {
    localStorage.clear()
    store.commit('SET_ISMESSAGE')
    next()
  }
})

export default router
