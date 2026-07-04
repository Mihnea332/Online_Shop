import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./style.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { setToastApi } from "./utils/toast";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(ToastPlugin);
setToastApi(app.config.globalProperties.$toast);
app.mount("#app");
