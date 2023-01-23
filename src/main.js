import "animate.css";

import { createApp } from "vue";
import App from "./App.vue";
import "./assets/scss/tailwind.scss";
import router from "./router";
import store from "./store";

// vue use
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
