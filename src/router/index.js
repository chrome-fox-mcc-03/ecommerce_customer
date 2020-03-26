import Vue from 'vue'
import VueRouter from 'vue-router'
// import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import ProductPage from '../views/ProductPage.vue'
import Products from '../components/Products.vue'
import DetailProduct from '../components/DetailProduct.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/user',
    name: 'user'
  },
  {
    path: '/product',
    component: ProductPage,
    children: [
      {
        path: '',
        component: Products
      },
      {
        path: ':id',
        component: DetailProduct,
        props: true
      }
    ]
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      requiresAuth: true
    }
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
        path: '/register'
      })
    }
  } else {
    next()
  }
})

export default router
