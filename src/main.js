import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createPopper } from '@popperjs/core';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import datefilter from '@/filters/dateFilter'
import toastPlugin from '@/utils/toastPlugin'
import deadlinePlugin from '@/utils/deadlinePlugin'

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(toastPlugin)
Vue.use(deadlinePlugin)
Vue.filter('datefilter', datefilter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
