import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './dao/getters';
import actions from './service/actions';
import mutations from './dao/mutations';
import state from './db/states';    // state 没有s
import CreateLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV != 'production';

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  state,
  strict: debug,
  plugins: debug ? [CreateLogger()] : []
});
