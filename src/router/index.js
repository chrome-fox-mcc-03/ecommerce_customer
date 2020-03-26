import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    },
    redirect: {
      name: 'ProductList'
    },
    children: [
      {
        path: 'products',
        name: 'ProductList',
        component: () => import('../components/ProductList.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../components/ProductCart.vue')
      },
      {
        path: 'confirm',
        name: 'Confirmation',
        component: () => import('../components/ConfirmationPage.vue')
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('../components/History.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/FormLogin.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/FormRegister.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
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
