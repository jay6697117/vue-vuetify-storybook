import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import i18n from './i18n';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import Layout from '../src/components/Layout.vue';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  // components: {
  //   layout: Layout
  // },
  render: h => h(App)
}).$mount('#app')
