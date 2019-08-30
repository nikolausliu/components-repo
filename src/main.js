import Vue from 'vue';
import App from './App';
import { router } from './router';
import store from './store';

import './plugins/index';

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
