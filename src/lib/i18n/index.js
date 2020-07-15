import Vue from 'vue';
import VueI18n from 'vue-i18n';
import es from './es';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es,
  },
});
