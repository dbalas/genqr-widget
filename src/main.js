import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import VueFormulate from '@braid/vue-formulate';
import { es } from '@braid/vue-formulate-i18n';

import './plugins/bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import i18n from './lib/i18n';

Vue.use(VueCompositionAPI);
Vue.use(VueFormulate, {
  plugins: [es],
});

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app');
