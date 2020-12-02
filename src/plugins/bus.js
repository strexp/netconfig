import Vue from "vue";

var eventBus = {
  install(Vue) {
    Vue.prototype.$bus = new Vue();
  },
};

Vue.use(eventBus);

export default eventBus;
