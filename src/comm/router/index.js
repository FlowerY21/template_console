import Vue from 'vue'
import Router from 'vue-router'

import Login from 'comm/view/Login'

import Index from 'comm/view/Index'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      hidden: true,
      meta: {
        requireAuth: false
      }
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      hidden: true,
      meta: {
        requireAuth: false
      }
    }, {
      path: '/index',
      name: 'Index',
      component: Index,
    }
  ]
})
