<template>
  <router-link to="/">
    <img src="/logo.jpg" />
  </router-link>
  <nav>
    <router-link to="/" class="nav-item">Acasa</router-link> |
    <router-link to="/products" class="nav-item">Produse</router-link> |
    <router-link to="/cart" class="nav-item">Cart</router-link>
  </nav>
</template>
<style scoped>
img {
  padding: 0;
  width: 100%;
  height: 100%;
}
nav {
  border: solid rgb(201, 100, 100);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: pink;
  padding: 20px;
}
.nav-item {
  text-decoration: none;
  color: #333;
  padding: 10px 20px;
  border: 2px solid blue;
  border-radius: 25px;
  font-weight: bold;
  background-color: white;
}
.nav-item:hover {
  transform: scale(1.1);
}
</style>
