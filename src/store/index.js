import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../config/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    carts: [],
    history: [],
    access_token: '',
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
    SET_ACCESS_TOKEN(state, payload) {
      state.access_token = payload;
    },
  },
  actions: {
    getCategories({ commit }) {
      const loader = Vue.prototype.$loading.show({
        // Optional parameters
        container: null,
        canCancel: true,
        onCancel: this.onCancel,
      });
      axios({
        url: '/category',
        method: 'GET',
      })
        .then((result) => {
          loader.hide();
          commit('SET_CATEGORIES', result.data);
        })
        .catch((err) => {
          loader.hide();
          Vue.prototype.$notify({
            group: 'foo',
            title: 'Error',
            text: err.response.data.errors[0],
            type: 'error',
          });
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
      const loader = Vue.prototype.$loading.show({
        // Optional parameters
        container: null,
        canCancel: true,
        onCancel: this.onCancel,
      });
      axios({
        url: '/product',
        method: 'GET',
      })
        .then((result) => {
          loader.hide();
          commit('SET_PRODUCTS', result.data);
        })
        .catch((err) => {
          loader.hide();
          Vue.prototype.$notify({
            group: 'foo',
            title: 'Error',
            text: err.response.data.errors[0],
            type: 'error',
          });
        });
    },
    getCarts({ commit }) {
      const loader = Vue.prototype.$loading.show({
        // Optional parameters
        container: null,
        canCancel: true,
        onCancel: this.onCancel,
      });
      axios({
        url: '/cart',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          loader.hide();
          commit('SET_CARTS', result.data);
        })
        .catch((err) => {
          Vue.prototype.$notify({
            group: 'foo',
            title: 'Error',
            text: err.response.data.errors[0],
            type: 'error',
          });
          loader.hide();
        });
    },
    getAllProducts() {
      return axios({
        method: 'GET',
        url: '/product',
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
    orderList(state) {
      return state.carts.filter((cart) => cart.status === false)[0];
    },
    orderHistory(state) {
      const orders = [];
      state.carts.forEach((el) => {
        if (el.status) {
          orders.push(el);
        }
      });
    },
  },
});
