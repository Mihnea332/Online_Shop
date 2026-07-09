import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./style.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { setToastApi } from "./utils/toast";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useCartStore } from "./stores/cart.js";

const app = createApp(App);
app.use(router);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
const cartStore = useCartStore();
cartStore.loadData();
cartStore.$subscribe((mutation, state) => {
  cartStore.persistData();
});
app.use(ToastPlugin);
setToastApi(app.config.globalProperties.$toast);

app.mount("#app");
