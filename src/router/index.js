import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import M from 'materialize-css'

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
    ],
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('token')) {
        M.toast({
          html: '<span>Please login first!</span>',
          classes: 'large red rounded',
          displayLength: 3000
        })
        next('/login')
      } else next()
    }
  },
  {
    path: '/carts',
    component: () => {
      return import('../views/Carts')
    },
    children: [
      {
        path: '',
        name: 'Carts',
        component: () => {
          return import('../components/CartsTable')
        }
      },
      {
        path: 'history',
        name: 'History',
        component: () => {
          return import('../components/CartsHistory')
        }
      }
    ],
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('token')) {
        M.toast({
          html: '<span>Please login first!</span>',
          classes: 'large red rounded',
          displayLength: 3000
        })
        next('/login')
      } else next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
