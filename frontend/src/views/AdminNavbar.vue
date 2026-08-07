<template>
  <nav class="admin-navbar">
    <div class="navbar-inner">
      <router-link to="/admin" class="navbar-brand">🌸 Admin</router-link>
      <div class="navbar-links">
        <router-link to="/admin" class="nav-link" active-class="active">
          Admin
        </router-link>
        <router-link to="/dashboard" class="nav-link" active-class="active">
          Dashboard
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.admin-navbar {
  width: 100%;
  background: white;
  border-bottom: 1px solid #ffe4e8;
  box-shadow: 0 2px 10px rgba(255, 192, 203, 0.15);
  font-family: "Poppins", sans-serif;
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  font-size: 1.2rem;
  font-weight: 700;
  color: #4a4a4a;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 10px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 10px;
  text-decoration: none;
  color: #555;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #fffafb;
  color: #ff8da1;
}

.nav-link.active {
  background: linear-gradient(135deg, #ff69b4, #ffb6c1);
  color: white;
}

@media (max-width: 480px) {
  .navbar-inner {
    flex-direction: column;
    gap: 8px;
    align-items: center;
    padding: 12px 14px;
  }

  .navbar-links {
    width: 100%;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 8px;
  }

  .navbar-brand {
    font-size: 1rem;
    text-align: center;
  }

  .nav-link {
    flex: 1;
    text-align: center;
    padding: 8px 10px;
    font-size: 0.85rem;
  }
}

@media (max-width: 360px) {
  .navbar-inner {
    padding: 10px 12px;
    gap: 6px;
  }

  .navbar-links {
    gap: 6px;
  }

  .navbar-brand {
    font-size: 0.95rem;
  }

  .nav-link {
    padding: 7px 8px;
    font-size: 0.8rem;
    border-radius: 8px;
  }
}
</style>