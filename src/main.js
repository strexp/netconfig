import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import bus from './plugins/bus'

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  bus,
  render: h => h(App)
}).$mount("#app");
