import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../config/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    carts: [],
  },
  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_CARTS(state, payload) {
      state.carts = payload;
    },
  },
  actions: {
    getCategories({ commit }) {
      axios({
        url: '/category',
        method: 'GET',
      })
        .then((result) => {
          commit('SET_CATEGORIES', result.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    login(context, userData) {
      return axios({
        url: '/user/login',
        method: 'POST',
        data: {
          email: userData.email,
          password: userData.password,
        },
      });
    },
    register(context, userData) {
      return axios({
        url: '/user/register',
        method: 'POST',
        data: {
          email: userData.email,
          password: userData.password,
          role: 'client',
        },
      });
    },
    getProducts({ commit }) {
      axios({
        url: '/product',
        method: 'GET',
      })
        .then((result) => {
          commit('SET_PRODUCTS', result.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getCarts({ commit }) {
      axios({
        url: '/cart',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          commit('SET_CARTS', result.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  modules: {
  },
  getters: {
    categoryName(state) {
      const name = [];
      state.categories.forEach((el) => {
        name.push({ name: el.name, id: el.id });
      });
      return name;
    },
  },
});
