import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
import VueRouter from 'vue-router'
import VueProgressBar from 'vue-progressbar'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'
import axios from 'axios'

const options = {
  color: '#00b33c',
  failedColor: '#ff3300',
  thickness: '100%',
  transition: {
    speed: '0.001s',
    opacity: '0.2s',
    termination: 800
  },
  autoRevert: true,
  location: 'right',
  position: 'absolute',
  inverse: true
}

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use(config => {
  this.$Progress.start() // for every request start the progress
  return config
})

instance.interceptors.response.use(response => {
  this.$Progress.finish() // finish when a response is received
  return response
})

Vue.use(axios)
Vue.use(Vuex)
Vue.use(VueProgressBar, options)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(Toasted, {
  position: 'bottom-left',
  duration: 3000,
  theme: 'bubble'
})

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
