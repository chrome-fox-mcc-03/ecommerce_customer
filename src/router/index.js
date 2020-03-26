import Vue from 'vue'
import VueRouter from 'vue-router'
// import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import ProductPage from '../views/ProductPage.vue'
import Products from '../components/Products.vue'
import Register from '../views/Register.vue'

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
        path: ':category',
        component: Products,
        props: true
      }
    ]
  },
  {
    path: '/register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
