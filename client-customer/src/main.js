import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import VueCurrencyFilter from 'vue-currency-filter'
import 'bulma/css/bulma.css'

Vue.use(Notifications)
Vue.use(VueCurrencyFilter,
  {
    symbol: 'Rp',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
  })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
