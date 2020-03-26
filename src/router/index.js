import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import landingPage from '../components/landingPage.vue'
import cart from '../components/cart.vue'
import costume from '../components/costume.vue'
import gundam from '../components/gundam.vue'
import figure from '../components/figure.vue'
import merchandise from '../components/merchandise.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: landingPage
  },
  {
    path: '/Cart',
    name: 'cart',
    component: cart,
    beforeEnter: (to, from, next) => {
      if (!localStorage.token) {
        router.push('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/Costume',
    name: 'costume',
    component: costume
  },
  {
    path: '/Merchandise',
    name: 'merchandise',
    component: merchandise
  },
  {
    path: '/Figure',
    name: 'figure',
    component: figure
  },
  {
    path: '/Gundam',
    name: 'gundam',
    component: gundam
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        router.push('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
