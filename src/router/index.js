import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import Home from '../components/Home.vue'
import Products from '../components/Products.vue'
import Checkout from '../views/Checkout.vue'
import CategoryProduct from '../views/CategoryProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'products',
        name: 'Products',
        component: Products
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: Checkout
      }
    ]
  },
  {
    path: '/categories/:id',
    name: 'CategoryProduct',
    component: CategoryProduct
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
