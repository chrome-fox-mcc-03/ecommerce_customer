import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/LoginPage.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../components/login/LoginForm.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../components/login/RegisterForm.vue'),
      },
    ],
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem('access_token');

    if (token) {
      next();
    } else {
      next({
        path: '/login',
      });
    }
  } else {
    next();
  }
});
export default router;
