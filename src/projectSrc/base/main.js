// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from 'comm/router/index'
import DeployPramas from 'comm/mixin/constant/DeployPramas'
// import

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import 'comm/assets/css/index.css';
import './assets/css/index.css';

Vue.config.productionTip = false;

document.title = DeployPramas[process.env.BRANCH_ENV].ProgramName + '后台管理系统';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
