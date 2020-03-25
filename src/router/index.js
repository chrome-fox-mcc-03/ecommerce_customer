import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import CatalogPage from '../views/CatalogPage.vue'
import SigninPage from '../views/SigninPage.vue'
import SignupPage from '../views/SignupPage.vue'
import CartPage from '../views/CartPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/signin',
    name: 'SigninPage',
    component: SigninPage
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupPage
  },
  {
    path: '/catalog',
    name: 'CatalogPage',
    component: CatalogPage
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
