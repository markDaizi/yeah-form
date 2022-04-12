import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "@/base-components";
import "@/options";
import "element-ui/lib/theme-chalk/index.css";
import DragContainer from "@/components/editor/drag-container.vue";

Vue.component("drag-container", DragContainer);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
