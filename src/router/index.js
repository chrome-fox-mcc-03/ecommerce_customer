import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      isLogin: false,
      requiresAuth: true
    },
    component: Home
  },
  {
    path: '/login',
    name: 'LoginPanel',
    meta: {
      isLogin: true,
      requiresAuth: false
    },
    component: () => import('../components/LoginPanel')
  },
  {
    path: '/register',
    name: 'RegisterPanel',
    meta: {
      isLogin: true,
      requiresAuth: false
    },
    component: () => import('../components/RegisterPanel')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart'),
    meta: {
      isLogin: false,
      requiresAuth: true
    },
    children: [
      {
        path: 'checkout/:id',
        name: 'CheckoutCart',
        component: () => import('../components/CheckoutCart')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLogin)) {
    if (localStorage.access_token) {
      next({
        path: '/'
      })
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.access_token) {
      next()
    } else if (localStorage.access_token && to.path !== '/login') {
      next({
        path: '/'
      })
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
