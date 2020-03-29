import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('../components/HomePage.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/Register.vue')
      },
      {
        path: 'history',
        name: 'Transaction',
        component: () => import('../views/History.vue'),
        beforeEnter: (to, from, next) => {
          if (!localStorage.token) {
            next('/login')
          } else {
            next()
          }
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
