<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>📞 Contactează-ne</h3>
        <p>Email: contact@handmademom.ro</p>
        <p>WhatsApp: +40 XXX XXX XXX</p>
      </div>

      <div class="footer-section">
        <h3>🔗 Urmăreste-ne</h3>
        <div class="social-links">
          <a
            href="https://www.facebook.com/romanahalalaie"
            target="_blank"
            rel="noopener"
            class="social-icon social-icon--facebook"
            aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M18.77 2H5.23A3.23 3.23 0 0 0 2 5.23v13.54A3.23 3.23 0 0 0 5.23 22H11.5v-7.37H9.25V11.7h2.25V9.48c0-2.27 1.36-3.51 3.65-3.51 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.24 0-1.62.77-1.62 1.56v1.5h2.77l-.44 2.93h-2.33V22h4.51A3.23 3.23 0 0 0 22 18.77V5.23A3.23 3.23 0 0 0 18.77 2z"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/r.halalaie/"
            target="_blank"
            rel="noopener"
            class="social-icon social-icon--instagram"
            aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="3.5"
                y="3.5"
                width="17"
                height="17"
                rx="5"
                ry="5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
              <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-section">
        <h3>📋 Rapid</h3>
        <router-link to="/legal">Termeni și Condiții</router-link>
        <router-link to="/">Acasă</router-link>
      </div>
    </div>

    <div class="footer-divider"></div>

    <div class="footer-bottom">
      <p class="footer-copy">
        © 2026 <strong>Handmade Mom</strong>
      </p>
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
  text-decoration: none;
}

.footer-section a:hover {
  color: var(--light-pink);
  transform: translateX(5px);
}

/* --- ZONA SOCIAL MEDIA CURĂȚATĂ --- */

.social-links {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  justify-content: flex-start;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  padding: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  text-decoration: none;
  position: relative;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.social-icon--facebook {
  color: #1877f2;
}

.social-icon--instagram {
  color: #ffb6c1;
}

.social-icon:hover {
  transform: translateY(-2px) scale(1.08);
  opacity: 0.92;
}

.social-icon svg {
  display: block;
  width: 34px;
  height: 34px;
  fill: currentColor;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.social-icon--instagram svg {
  fill: none;
}

.footer-divider {
  max-width: 1200px;
  margin: var(--spacing-lg) auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--light-pink), transparent);
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

/* --- RESPONSIVE --- */
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
    gap: var(--spacing-sm);
    justify-content: center;
  }
  .social-icon {
    width: auto;
    height: auto;
  }
  .social-icon svg {
    width: 30px;
    height: 30px;
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
  }
  .footer-section h3 {
    font-size: 1rem;
    margin-bottom: var(--spacing-md);
  }
  .footer-section p {
    font-size: 0.8rem;
  }
  .footer-section a {
    font-size: 0.8rem;
    margin: 4px var(--spacing-xs);
  }
  .social-links {
    gap: 6px;
    justify-content: center;
  }
  .social-icon {
    width: auto;
    height: auto;
  }
  .social-icon svg {
    width: 28px;
    height: 28px;
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
  }
  .footer-section h3 {
    font-size: 0.9rem;
    margin-bottom: var(--spacing-sm);
    gap: 2px;
  }
  .footer-section p {
    font-size: 0.75rem;
  }
  .footer-section a {
    font-size: 0.75rem;
    margin: 2px 4px;
  }
  .social-links {
    gap: 8px;
    justify-content: center;
  }
  .social-icon {
    width: auto;
    height: auto;
  }
  .social-icon svg {
    width: 26px;
    height: 26px;
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
