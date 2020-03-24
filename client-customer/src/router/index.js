import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import UserLogin from '../views/UserLogin'
import UserRegister from '../views/UserRegister'
import ProductList from '../views/ProductList'
import Blogs from '../views/Blogs'
import ProductDetail from '../views/ProductDetail'
import Cart from '../views/Cart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegister
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductList
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
