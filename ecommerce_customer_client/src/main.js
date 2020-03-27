import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Notifications)
Vue.config.productionTip = false
Vue.use(VueCurrencyFilter, {
  symbol: 'Rp',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
