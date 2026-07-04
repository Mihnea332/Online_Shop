<template>
  <section class="legal-page">
    <div class="legal-header">
      <h1>📋 Informații Legale</h1>
    </div>

    <div class="legal-content">
      <div class="legal-card">
        <div class="company-info">
          <h2>Compania</h2>
          <p>
            <strong>Romana Halalaie</strong><br />
            <em>Handmade Mom</em><br />
            Huuskoppel 4<br />
            22885 Barsbüttel<br />
            Deutschland
          </p>
        </div>

        <div class="contact-info">
          <h2>📞 Contact</h2>
          <p>
            <strong>Telefon:</strong> 01731523980<br />
            <strong>Email:</strong>
            <a href="mailto:rhalalaie@gmail.com">rhalalaie@gmail.com</a>
          </p>
        </div>

        <div class="documents-section">
          <h2>📄 Documente Legale</h2>
          <div class="documents-grid">
            <a
              href="https://itrk.legal/Xsm.2Y.RxW-iframe.html"
              target="_blank"
              class="doc-link">
              <span class="doc-icon">📋</span>
              <span class="doc-title">Termeni și Condiții (AGB)</span>
              <span class="doc-arrow">→</span>
            </a>
            <a
              href="https://itrk.legal/Xsm.8U.RxW-iframe.html"
              target="_blank"
              class="doc-link">
              <span class="doc-icon">🔒</span>
              <span class="doc-title">Politica Confidențialității</span>
              <span class="doc-arrow">→</span>
            </a>
          </div>
        </div>

        <div class="disclaimer">
          <p>
            <strong>⚖️ Notă Legală:</strong><br />
            Suntem în conformitate cu normele de protecție a consumatorului în
            conform legislației germanei și europene.
          </p>
        </div>

        <div class="footer-legal">
          <p>Stand: 24.11.2025</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legal-page {
  animation: fadeIn 0.6s ease-out;
  min-height: 80vh;
}

.legal-header {
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  padding: var(--spacing-xl) var(--spacing-lg);
  text-align: center;
}

.legal-header h1 {
  font-size: 2.5rem;
  margin: 0;
  color: var(--white);
}

.legal-content {
  max-width: 900px;
  margin: var(--spacing-xl) auto;
  padding: 0 var(--spacing-lg);
}

.legal-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  padding: var(--spacing-xl);
  animation: slideInUp 0.6s ease-out;
}

.legal-card > div {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 2px solid var(--light-pink);
}

.legal-card > div:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.company-info h2,
.contact-info h2,
.documents-section h2 {
  color: var(--primary-pink);
  font-size: 1.5rem;
  margin-top: 0;
}

.company-info p,
.contact-info p {
  line-height: 1.8;
  color: var(--text-dark);
  margin: 0;
}

.contact-info a {
  color: var(--primary-pink);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.contact-info a:hover {
  color: var(--dark-pink);
  text-decoration: underline;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-md);
}

.doc-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  background: linear-gradient(
    135deg,
    rgba(255, 240, 245, 0.5),
    rgba(255, 182, 193, 0.2)
  );
  border: 2px solid var(--light-pink);
  border-radius: var(--radius-md);
  color: var(--text-dark);
  text-decoration: none;
  transition: var(--transition);
  gap: var(--spacing-sm);
  text-align: center;
}

.doc-link:hover {
  border-color: var(--primary-pink);
  background: linear-gradient(
    135deg,
    rgba(255, 182, 193, 0.3),
    rgba(255, 240, 245, 0.6)
  );
  box-shadow: var(--shadow);
  transform: translateY(-3px);
}

.doc-icon {
  font-size: 2rem;
}

.doc-title {
  font-weight: 600;
  color: var(--primary-pink);
  font-size: 0.95rem;
}

.doc-arrow {
  color: var(--text-light);
  font-size: 1.2rem;
  transition: var(--transition);
}

.doc-link:hover .doc-arrow {
  color: var(--primary-pink);
  transform: translateX(5px);
}

.disclaimer {
  background: linear-gradient(
    135deg,
    rgba(255, 182, 193, 0.2),
    rgba(255, 240, 245, 0.4)
  );
  border-left: 4px solid var(--primary-pink);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  color: var(--text-dark);
}

.disclaimer p {
  margin: 0;
  line-height: 1.6;
}

.footer-legal {
  text-align: center;
  color: var(--text-light);
  font-size: 0.9rem;
  margin: 0;
  padding: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .legal-page {
    padding: var(--spacing-lg);
  }

  .legal-header h1 {
    font-size: 2.2rem;
  }

  .legal-content {
    gap: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .legal-page {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .legal-header {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .legal-header h1 {
    font-size: 1.8rem;
  }

  .legal-header p {
    font-size: 0.95rem;
  }

  .legal-content {
    gap: var(--spacing-lg);
    padding: 0 var(--spacing-md);
  }

  .legal-card {
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
  }

  .legal-card h2 {
    font-size: 1.3rem;
  }

  .legal-card p,
  .legal-card li {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .legal-card ul {
    padding-left: var(--spacing-lg);
  }

  .documents-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    max-width: 100%;
  }

  .doc-link {
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
  }

  .doc-link:hover {
    background: rgba(255, 182, 193, 0.1);
    border-color: var(--primary-pink);
  }

  .doc-icon {
    font-size: 2rem;
  }

  .doc-title {
    font-size: 1.1rem;
  }

  .doc-arrow {
    font-size: 1.2rem;
  }

  .disclaimer {
    padding: var(--spacing-lg);
    margin: var(--spacing-lg) 0;
  }

  .disclaimer p {
    font-size: 0.9rem;
  }

  .footer-legal {
    font-size: 0.85rem;
  }
}

@media (max-width: 600px) {
  .legal-page {
    padding: var(--spacing-md);
  }

  .legal-header {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .legal-header h1 {
    font-size: 1.5rem;
  }

  .legal-header p {
    font-size: 0.9rem;
  }

  .legal-content {
    gap: var(--spacing-md);
    padding: 0;
  }

  .legal-card {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .legal-card h2 {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-md);
  }

  .legal-card p,
  .legal-card li {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .legal-card ul {
    padding-left: var(--spacing-lg);
  }

  .documents-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }

  .doc-link {
    padding: var(--spacing-md);
    border-radius: var(--radius-sm);
  }

  .doc-icon {
    font-size: 1.6rem;
    margin-bottom: var(--spacing-sm);
  }

  .doc-title {
    font-size: 1rem;
  }

  .doc-arrow {
    font-size: 1rem;
  }

  .disclaimer {
    padding: var(--spacing-md);
    margin: var(--spacing-md) 0;
    font-size: 0.85rem;
  }

  .footer-legal {
    font-size: 0.8rem;
    margin-top: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .legal-page {
    padding: var(--spacing-sm);
    min-height: 60vh;
  }

  .legal-header {
    padding: var(--spacing-md);
  }

  .legal-header h1 {
    font-size: 1.2rem;
    margin-bottom: 4px;
  }

  .legal-header p {
    font-size: 0.85rem;
  }

  .legal-content {
    gap: var(--spacing-sm);
    padding: 0;
  }

  .legal-card {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
  }

  .legal-card h2 {
    font-size: 1rem;
    margin-bottom: var(--spacing-sm);
  }

  .legal-card p,
  .legal-card li {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .legal-card ul {
    padding-left: var(--spacing-md);
    margin: var(--spacing-sm) 0;
  }

  .documents-grid {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .doc-link {
    padding: var(--spacing-md);
    border-radius: var(--radius-sm);
  }

  .doc-icon {
    font-size: 1.4rem;
    margin-bottom: 6px;
  }

  .doc-title {
    font-size: 0.9rem;
  }

  .doc-arrow {
    font-size: 0.9rem;
  }

  .disclaimer {
    padding: var(--spacing-sm);
    margin: var(--spacing-md) 0;
    font-size: 0.75rem;
  }

  .footer-legal {
    font-size: 0.75rem;
    margin-top: var(--spacing-md);
  }
}
</style>
