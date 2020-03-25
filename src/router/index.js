import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/loginPage.vue'
import Register from '../views/registerPage.vue'
import Dashboard from '../views/Dashboard.vue'
import ListProduct from '../views/ListProduct.vue'
import DetailProduct from '../views/detailProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresLogout: true
    }
  },
  {
    path: '/login',
    name: 'loginPage',
    component: Login,
    meta: {
      requiresLogout: true
    }
  },
  {
    path: '/product',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'listProduct',
        component: ListProduct
      },
      {
        path:':id',
        name: 'detailProduct',
        component: DetailProduct
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else if (to.matched.some(record => record.meta.requiresLogout)) {
    if (!localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/product'
      })
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
