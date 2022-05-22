import Vue from "vue";
import App from "./App";
import { router } from "./router";
import store from "./store";

import HomePlugin from "./plugins/home-plugin";
import GlobalPlugin from "./plugins/global-components.js";
import "vue-notifyjs/themes/default.css";
import vuetify from './plugins/vuetify'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMask from 'v-mask';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueMask);
Vue.use(HomePlugin);
Vue.use(GlobalPlugin);


new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
