<template>
  <header class="header">
    <div class="header-top">
      <nav class="nav-main">
        <router-link to="/" class="nav-link">
          <span class="icon">🏠</span>
          Acasă
        </router-link>
        <router-link to="/products" class="nav-link">
          <span class="icon">🛍️</span>
          Produse
        </router-link>
        <router-link to="/cart" class="nav-link cart-link">
          <span class="icon">🛒</span>
          Coș
          <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useCartStore } from "../stores/cart";

const router = useRouter();
const cartStore = useCartStore();

const cartCount = computed(() => {
  return (
    cartStore.items?.reduce((total, item) => total + (item.quantity || 1), 0) ||
    0
  );
});
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, var(--white), var(--very-light-pink));
  border-bottom: 2px solid var(--light-pink);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
}

.header-top {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

.logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  animation: fadeIn 0.5s ease-out;
}

.logo img {
  height: 60px;
  width: auto;
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.logo:hover img {
  transform: scale(1.05);
  box-shadow: var(--shadow);
}

.nav-main {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-dark);
  font-weight: 600;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  position: relative;
  transition: var(--transition);
  white-space: nowrap;
}

.nav-link .icon {
  font-size: 1.3rem;
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--primary-pink);
  background-color: var(--very-light-pink);
  transform: translateY(-2px);
}

.nav-link:hover .icon {
  transform: scale(1.2);
}

.nav-link.router-link-active {
  color: var(--primary-pink);
  background: linear-gradient(
    135deg,
    rgba(255, 105, 180, 0.1),
    rgba(255, 182, 193, 0.1)
  );
  border-bottom: 2px solid var(--primary-pink);
}

.cart-link {
  position: relative;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--dark-pink);
  color: var(--white);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  animation: bounce 0.6s ease-out;
}

.auth-actions {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.btn-login {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
  background: linear-gradient(135deg, var(--dark-pink), var(--primary-pink));
}

.btn-login .icon {
  font-size: 1.2rem;
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .header-top {
    padding: var(--spacing-md);
    gap: var(--spacing-md);
  }

  .nav-link {
    padding: var(--spacing-sm);
    font-size: 0.95rem;
  }

  .nav-link .icon {
    font-size: 1.1rem;
  }

  .btn-login {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .header-top {
    padding: var(--spacing-md);
    gap: var(--spacing-md);
  }

  .logo img {
    height: 50px;
  }

  .nav-main {
    gap: var(--spacing-md);
  }

  .nav-link {
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }

  .nav-link .icon {
    font-size: 1.1rem;
  }

  .btn-login {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: 0.9rem;
  }

  .badge {
    width: 24px;
    height: 24px;
    font-size: 0.7rem;
  }
}

@media (max-width: 600px) {
  .header-top {
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .logo img {
    height: 45px;
  }

  .nav-main {
    order: 3;
    flex-basis: 100%;
    justify-content: space-around;
    gap: var(--spacing-sm);
  }

  .nav-link span:not(.icon) {
    display: none;
  }

  .nav-link {
    padding: var(--spacing-xs);
    gap: 0;
  }

  .nav-link .icon {
    font-size: 1.5rem;
  }

  .btn-login {
    padding: var(--spacing-xs);
  }

  .btn-login span:not(.icon) {
    display: none;
  }

  .btn-login .icon {
    font-size: 1.2rem;
  }

  .auth-actions {
    gap: var(--spacing-xs);
  }

  .badge {
    width: 22px;
    height: 22px;
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .header {
    border-bottom: 2px solid var(--light-pink);
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .header-top {
    padding: var(--spacing-sm);
    gap: var(--spacing-xs);
  }

  .logo {
    flex-shrink: 0;
    min-width: 40px;
  }

  .logo img {
    height: 40px;
  }

  .nav-main {
    gap: 0;
    order: 3;
    flex-basis: 100%;
    justify-content: space-around;
  }

  .nav-link {
    padding: var(--spacing-xs) 0;
    font-size: 0.8rem;
  }

  .nav-link .icon {
    font-size: 1.3rem;
  }

  .btn-login {
    padding: 4px;
    gap: 2px;
  }

  .btn-login .icon {
    font-size: 1rem;
  }

  .auth-actions {
    gap: 4px;
  }

  .badge {
    width: 20px;
    height: 20px;
    font-size: 0.6rem;
  }
}
</style>
<style>
.btn-login {
  font-size: 0.8rem;
}

.badge {
  width: 20px;
  height: 20px;
  font-size: 0.65rem;
}
</style>
