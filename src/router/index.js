import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    redirect: '/login',
    component: () => import('../views/Landing.vue'),
    meta: {
      authentication: false
    },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../components/Register.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      authentication: true
    }
  },
  {
    path: '/profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      authentication: true
    },
    children: [
      {
        path: '',
        name: 'Carts',
        component: () => import('../components/ProfileCart.vue')
      },
      {
        path: '/history',
        name: 'History',
        component: () => import('../components/ProfileHistory.vue')
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
  const token = localStorage.getItem('token')

  if (to.matched.some(record => record.meta.authentication)) {
    if (token) next()
    else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }

  if (to.path === '/register' || to.path === '/login') {
    if (token) {
      next({
        path: '/dashboard'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
