import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const state = {
  temp: ''
};

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: debug ? [createLogger()] : []
});
