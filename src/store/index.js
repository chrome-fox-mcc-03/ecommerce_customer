import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../config/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
  },
  mutations: {
    SET_CATEGORIES(state, payload) {
      this.state.categories = payload;
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
  },
  modules: {
  },
  getters: {
    categoryName(state) {
      const name = [];
      state.categories.forEach((el) => {
        name.push(el.name);
      });
      return name;
    },
  },
});
