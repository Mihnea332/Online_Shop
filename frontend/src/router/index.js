import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import ProductsView from "../views/ProductsView.vue";
import CartView from "../views/CartView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import LegalView from "../views/LegalView.vue";
import Dashboard from "../views/Dashboard.vue";
import { toast } from "../utils/toast";
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
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { title: "Dashboard", requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from) => {
  const token =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("user_token") ||
    localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return "/login";
  }
});
router.beforeEach((to) => {
  document.title = to.meta.title || "Magazinul Meu";
});
router.beforeEach((to, from, next) => {
  const isAdminAuthenticated = !!(
    localStorage.getItem("adminToken") ||
    localStorage.getItem("user_token") ||
    localStorage.getItem("token")
  );

  if (to.meta.requiresAuth && !isAdminAuthenticated) {
    toast.warning(
      "Acces restricționat! Te rog să te loghezi ca Administrator. ❌",
    );
    next("/login");
    return;
  }

  next();
});
export default router;
