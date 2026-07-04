<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>📞 Contactează-ne</h3>
        <p>Email: contact@handmademom.ro</p>
        <p>WhatsApp: +40 XXX XXX XXX</p>
      </div>

      <div class="footer-section">
        <h3>🔗 Urmărire</h3>
        <div class="social-links">
          <a
            href="https://www.facebook.com/romanahalalaie"
            target="_blank"
            rel="noopener"
            class="social-icon">
            <img src="/fb.png" alt="Facebook" />
          </a>
          <a href="#" target="_blank" rel="noopener" class="social-icon">
            <span>📸</span>
          </a>
          <a href="#" target="_blank" rel="noopener" class="social-icon">
            <span>🎨</span>
          </a>
        </div>
      </div>

      <div class="footer-section">
        <h3>📋 Rapid</h3>
        <router-link to="/legal">Termeni și Condiții</router-link>
        <router-link to="/">Acasă</router-link>
        <router-link to="/products">Produse</router-link>
      </div>
    </div>

    <div class="footer-divider"></div>

    <div class="footer-bottom">
      <p class="footer-copy">
        © 2025 <strong>Handmade Mom</strong> - Cărți și emoții prin fiecare
        creație ❤️
      </p>
      <p class="footer-tagline">Handmade with Love 🎨</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
  color: var(--white);
  padding: var(--spacing-xl) var(--spacing-lg);
  margin-top: var(--spacing-xl);
  border-top: 3px solid var(--primary-pink);
  animation: slideInUp 0.6s ease-out;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer-section h3 {
  color: var(--light-pink);
  font-size: 1.3rem;
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.footer-section p {
  color: rgba(255, 255, 255, 0.8);
  margin: var(--spacing-sm) 0;
  font-size: 0.95rem;
}

.footer-section a {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  margin: var(--spacing-sm) 0;
  transition: var(--transition);
  font-weight: 500;
}

.footer-section a:hover {
  color: var(--light-pink);
  transform: translateX(5px);
}

.social-links {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  border-radius: 50%;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.social-icon:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: var(--shadow);
}

.social-icon img {
  width: 28px;
  height: 28px;
  filter: brightness(0) invert(1);
}

.social-icon span {
  font-size: 1.5rem;
}

.footer-divider {
  max-width: 1200px;
  margin: var(--spacing-lg) auto;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--light-pink),
    transparent
  );
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
}

.footer-copy {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 500;
}

.footer-tagline {
  font-size: 0.85rem;
  color: var(--light-pink);
  margin: var(--spacing-sm) 0 0 0;
  font-style: italic;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer {
    padding: var(--spacing-lg);
  }

  .footer-content {
    gap: var(--spacing-lg);
  }

  .footer-section h3 {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .footer-content {
    gap: var(--spacing-lg);
    grid-template-columns: 1fr;
  }

  .footer-section {
    text-align: center;
  }

  .footer-section h3 {
    font-size: 1.1rem;
    justify-content: center;
  }

  .footer-section p {
    font-size: 0.9rem;
  }

  .footer-section a {
    display: inline-block;
    margin: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.9rem;
  }

  .social-links {
    justify-content: center;
    gap: var(--spacing-md);
  }

  .social-icon {
    width: 45px;
    height: 45px;
  }

  .social-icon img {
    width: 24px;
    height: 24px;
  }

  .footer-divider {
    margin: var(--spacing-lg) auto;
  }

  .footer-bottom {
    padding: 0;
  }

  .footer-copy {
    font-size: 0.9rem;
  }

  .footer-tagline {
    font-size: 0.8rem;
    margin-top: var(--spacing-xs);
  }
}

@media (max-width: 600px) {
  .footer {
    padding: var(--spacing-md);
    margin-top: var(--spacing-lg);
  }

  .footer-content {
    gap: var(--spacing-md);
    grid-template-columns: 1fr;
  }

  .footer-section {
    text-align: center;
  }

  .footer-section h3 {
    font-size: 1rem;
    margin-bottom: var(--spacing-md);
  }

  .footer-section p {
    font-size: 0.8rem;
    margin: 0;
  }

  .footer-section a {
    font-size: 0.8rem;
    margin: 4px var(--spacing-xs);
  }

  .social-links {
    gap: var(--spacing-sm);
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }

  .social-icon img {
    width: 20px;
    height: 20px;
  }

  .social-icon span {
    font-size: 1.2rem;
  }

  .footer-divider {
    margin: var(--spacing-md) auto;
  }

  .footer-copy {
    font-size: 0.8rem;
  }

  .footer-tagline {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: var(--spacing-sm);
    margin-top: var(--spacing-md);
  }

  .footer-content {
    gap: var(--spacing-sm);
    grid-template-columns: 1fr;
  }

  .footer-section h3 {
    font-size: 0.9rem;
    margin-bottom: var(--spacing-sm);
    gap: 2px;
  }

  .footer-section p {
    font-size: 0.75rem;
    margin: 0;
  }

  .footer-section a {
    font-size: 0.75rem;
    margin: 2px 4px;
  }

  .social-links {
    gap: 8px;
  }

  .social-icon {
    width: 36px;
    height: 36px;
  }

  .social-icon img {
    width: 18px;
    height: 18px;
  }

  .social-icon span {
    font-size: 1rem;
  }

  .footer-divider {
    margin: var(--spacing-sm) auto;
  }

  .footer-copy {
    font-size: 0.7rem;
  }

  .footer-tagline {
    font-size: 0.65rem;
  }
}
</style>
