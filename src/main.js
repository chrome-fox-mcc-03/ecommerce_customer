import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UIkit from 'uikit'
import 'uikit/dist/css/uikit.css'
import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'
import Icons from 'uikit/dist/js/uikit-icons.js'
import 'uikit/dist/js/uikit-icons.min.js'

Vue.config.productionTip = false

UIkit.use(Icons)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
