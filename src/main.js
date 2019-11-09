// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import './../static/css/reset.css'
import './assets/css/base.css'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Vuex);
Vue.use(ElementUI);
const store = new Vuex.Store({
  state: {
    num: 0,
    arrId : [],
    addressId : -1
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
