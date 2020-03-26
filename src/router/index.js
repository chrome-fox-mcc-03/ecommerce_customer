import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import RegisterForm from '../views/RegisterForm.vue'
import CatalogPage from '../views/CatalogPage.vue'
import CartPage from '../views/CartPage.vue'
import TxnLog from '../views/TxnLog.vue'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
console.log('TEST FOR ROUTER/INDEX.JS')
const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/register',
    name: 'RegisterForm',
    component: RegisterForm
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/catalog',
    name: 'CatalogPage',
    component: CatalogPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/txnlog',
    name: 'TxnLog',
    component: TxnLog,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')

    if (token) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
