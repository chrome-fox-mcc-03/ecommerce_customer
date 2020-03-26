import Vue from "vue";
import Vuex from "vuex";
import { hitAPI } from "../helpers/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isLoading: false,
    user: {
      email: null,
      username: null,
      role: null
    }
  },
  mutations: {
    SET_USER(state, payload) {
      let { email, username, role } = payload;
      state.user.email = email;
      state.user.username = username;
      state.user.role = role;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_LOGIN(state, payload) {
      state.isLoggedIn = payload;
    }
  },
  actions: {
    login(context, payload) {
      context.commit("SET_LOADING", true);
      let { email, password } = payload;
      return hitAPI.post("/login", {
        email,
        password
      });
    },
    register(context, payload) {
      context.commit("SET_LOADING", true);
      let { email, password, username } = payload;
      return hitAPI
        .post("/register", {
          email,
          password,
          username
        })
        .then(() => {
          return context.dispatch("login", {
            email,
            password
          });
        });
    },
    fetchProducts(context) {
      context.commit("SET_LOADING", true);
      return hitAPI.get("/products", {
        headers: {
          token: localStorage.getItem("token")
        }
      });
    },
    fetchCarts(context) {
      context.commit("SET_LOADING", true);
      return hitAPI.get("/carts", {
        headers: {
          token: localStorage.getItem("token")
        }
      });
    },
    addToCart(context, payload) {
      context.commit("SET_LOADING", true);
      let { ProductId, quantity } = payload;
      return hitAPI.post(
        "/carts",
        {
          ProductId,
          quantity
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );
    },
    editCart(context, payload) {
      context.commit("SET_LOADING", true);
      let { quantity, id } = payload;
      return hitAPI.put(
        `/carts/${id}`,
        {
          quantity
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );
    },
    deleteCart(context, payload) {
      context.commit("SET_LOADING", true);
      let { id } = payload;
      return hitAPI.delete(`/carts/${id}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
    }
  },
  modules: {}
});
