import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import ProductsView from "../views/ProductsView.vue";
import CartView from "../views/CartView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
