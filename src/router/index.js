import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
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
    meta: {
      requiresAuth: true
    },
    component: () => import('../components/RegisterPanel')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'checkout/:id',
        name: 'CheckoutCart',
        component: () => import('../components/CheckoutCart')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.loginPage)) {
//     if (localStorage.access_token) {
//       next({
//         path: '/'
//       })
//     }
//   }
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.access_token && to.path === '/login') {
//       next({
//         name: 'AdminPanel'
//       })
//     } else if (localStorage.access_token && to.path !== '/login') {
//       next()
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// }

export default router
