import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createPopper } from '@popperjs/core';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import datefilter from '@/filters/dateFilter'
import toastPlugin from '@/utils/toastPlugin'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(toastPlugin)
Vue.filter('datefilter', datefilter)

Vue.config.productionTip = false

var firebaseConfig = {
    apiKey: "AIzaSyB1zA9cNcHokM66WMA80K3VA4iCTpqoTQo",
    authDomain: "todo-36ee3.firebaseapp.com",
    projectId: "todo-36ee3",
    storageBucket: "todo-36ee3.appspot.com",
    messagingSenderId: "985823636813",
    appId: "1:985823636813:web:e55aba5217d6370ca39b04"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  created(){
  	const _self = this
  	firebase.auth().onAuthStateChanged(function(user) {//проверка авторизован в данный момент юзер или нет 
	 	 _self.$store.dispatch('userStateChange', user)
	})
    // this.$store.dispatch('loadBooks')
  },
  render: h => h(App)
}).$mount('#app')
