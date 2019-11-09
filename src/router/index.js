import Vue from 'vue'
import Router from 'vue-router'
import index from './../page/index/index'
import login from './../page/login/login'
import register from './../page/register/register'
import active from './../page/active/active'
import addr from './../page/addr/addr'
import addaddr from '../page/addaddr/addaddr'
import edit from './../page/edit/addr'
import cart from './../page/cart/cart'
import detail from './../page/detail/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/active',
      name: 'active',
      component: active
    },
    {
      path: '/addr',
      name: 'addr',
      component: addr
    },
    {
      path: '/addaddr',
      name: 'addaddr',
      component: addaddr
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
  ]
})
