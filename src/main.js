import "animate.css";

import { createApp } from "vue";
import App from "./App.vue";
import "./assets/scss/tailwind.scss";
import router from "./router";
import store from "./store";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// vue use
createApp(App)
  .use(store)
  .use(Toast, {
    toastClassName: "dashcode-toast",
    bodyClassName: "dashcode-toast-body",
  })
  .use(router)
  .mount("#app");
