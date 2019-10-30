import Vue from 'vue'
import Router from 'vue-router'

import Login from 'comm/view/Login'

import Index from 'comm/view/Index'

import Welcome from 'comm/view/Welcome'

import UserManage from 'comm/view/pages/UserManage/UserManage'

Vue.use(Router);

// 解决vue-router报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
};


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
      name: 'Login',
      component: Login,
      hidden: true,
      meta: {
        requireAuth: false
      }
    }, {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: '/index/welcome',
      children:[
        {
          path:'welcome',
          name:'welcome',
          component:Welcome,
        },{
          path:'usermanage',
          name:'usermanage',
          component:UserManage,
        },
      ]
    }
  ]
})
