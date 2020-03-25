import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginPanel',
    component: () => import('../components/LoginPanel')
  },
  {
    path: '/register',
    name: 'RegisterPanel',
    component: () => import('../components/RegisterPanel')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart'),
    children: [
      {
        path: 'delete',
        name: 'DeleteCart',
        component: () => import('../components/DeleteCart')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
