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
    name: 'Login',
    component: () => {
      return import('../views/Login')
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => {
      return import('../views/Register')
    }
  },
  {
    path: '/items',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Items.vue')
    },
    children: [
      {
        path: '',
        name: 'Items',
        component: () => {
          return import('../components/ItemList')
        }
      },
      {
        path: ':itemId',
        name: 'ItemDetails',
        props: true,
        component: () => {
          return import('../components/ItemDetails')
        }
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
