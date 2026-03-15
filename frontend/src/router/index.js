import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import ProductsView from "../views/ProductsView.vue";
import CartView from "../views/CartView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import LegalView from "../views/LegalView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Pagina principala" },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { title: "Login" },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { title: "Panou comenzi", requiresAuth: true },
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
    meta: { title: "Produse" },
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
    meta: { title: "Cos de cumparaturi" },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
    meta: { title: "Comanda" },
  },
  {
    path: "/legal",
    name: "legal",
    component: LegalView,
    meta: { title: "Informatii legale" },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem("adminToken");
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    next("/admin");
  } else next();
});
export default router;
