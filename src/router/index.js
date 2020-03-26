import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import LandingPage from "../views/LandingPage";
import DashboardPage from "../views/DashboardPage";
import DashboardCart from "../components/DashboardCart";
import DashboardProduct from "../components/DashboardProduct";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "LandingPage",
    component: LandingPage,
    meta: {
      requiresAuth: false,
      title: "TCG E-commerce | Landing Page"
    }
  },
  {
    path: "/carts",
    component: DashboardPage,
    meta: {
      requiresAuth: true,
      title: "TCG E-commerce | Dashboard Page"
    },
    children: [
      {
        path: "",
        name: "Cart",
        component: DashboardCart,
        meta: {
          requiresAuth: true,
          title: "TCG E-commerce | Dashboard Page"
        }
      },
      {
        path: "buy",
        name: "BuyProduct",
        component: DashboardProduct,
        meta: {
          requiresAuth: true,
          title: "TCG E-commerce | Buy Products"
        }
      }
    ]
  },
  {
    path: "*",
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
