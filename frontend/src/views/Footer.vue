<template>
  <footer>
    <div class="footer-links">
      <router-link to="/legal">LEGAL</router-link>
      <a href="https://www.facebook.com/romanahalalaie" target="_blank"
        ><img class="ico" src="/fb.png" alt=""
      /></a>
    </div>
    <div class="footer-copy">© 2025 Handmade Mom.</div>
  </footer>
</template>
<style scoped>
footer {
  font-size: larger;
  background-color: #333;
  padding: 30px 0;
  color: #fff;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.footer-links a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.footer-links a:hover {
  text-decoration: underline;
}

.ico {
  width: 40px;
  height: 40px;
  transition: transform 0.3s;
}

.ico:hover {
  transform: scale(1.1);
}

.footer-copy {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
