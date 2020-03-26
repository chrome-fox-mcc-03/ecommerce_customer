import Vue from 'vue'
import VueRouter from 'vue-router'
import Swal from 'sweetalert2'

import Home from '../views/Home.vue'
import Welcome from '../views/Welcome'
import Products from '../views/Products'
import Carts from '../views/Carts'
import Login from '../components/Login'
import Register from '../components/Register'

Vue.use(VueRouter)

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    redirect: {
      name: 'Login'
    },
    children: [
      {
        path: 'register',
        component: Register,
        name: 'Register'
      },
      {
        path: 'login',
        component: Login,
        name: 'Login'
      }
    ]
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/carts',
    name: 'Carts',
    component: Carts,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Please login first!'
      })
      next({
        path: '/welcome'
      })
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if ((to.name === 'Login' || to.name === 'Register') && token) next({ name: 'Products' })
  else next()
})

export default router
