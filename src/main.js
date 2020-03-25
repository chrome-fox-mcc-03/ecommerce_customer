import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'uikit'
import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit-icons.min.js'
import 'uikit/dist/js/uikit-icons'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
