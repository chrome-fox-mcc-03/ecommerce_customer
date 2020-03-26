import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Toasted, {
  position: 'bottom-left',
  duration: 3000
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
