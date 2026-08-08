<script setup>
import { ref } from "vue";

const features = ref([
  {
    icon: "🎁",
    title: "Seturi Cadou Personalizate",
    description: "Sticle, pahare, licheni și plexiglas cu mesaje speciale",
  },
  {
    icon: "👕",
    title: "Tricouri Personalizate",
    description: "Pentru cei mici și cei mari, modele unice și creative",
  },
  {
    icon: "💍",
    title: "Mărturii și Seturi de Mot",
    description: "Pentru botez, nuntă sau alte evenimente speciale",
  },
  {
    icon: "📧",
    title: "Invitații Personalizate",
    description: "Pe hârtie sau electronic, pentru orice temă și stil",
  },
]);

const stats = ref([
  { number: "7+", label: "Ani de experiență" },
  { number: "4", label: "Copii inspirati" },
  { number: "∞", label: "Zâmbete create" },
]);
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content slide-up">
        <h1 class="hero-title">
          👋 Bine ai venit în universul nostru handmade!
        </h1>
        <p class="hero-subtitle">
          Cu sediul în Germania, livrăm cu drag în toată Europa.
        </p>
        <div class="hero-buttons">
          <router-link to="/products" class="btn btn-primary">
            🛍️ Exploreaza Produse
          </router-link>
          <a href="#story" class="btn btn-secondary">
            📖 Citeste Povestea Noastră
          </a>
        </div>
      </div>
      <div class="hero-image slide-right">
        <img src="/HomePage/homepage2.jpg" alt="Handmade showcase" />
      </div>
    </section>

    <!-- Story Section -->
    <section id="story" class="story-section">
      <div class="container">
        <div class="story-content">
          <div class="story-text slide-left">
            <h2>📖 Povestea Noastră</h2>
            <p>
              Eu sunt Romana, mama a patru copii minunați ❤️, și împreună cu
              echipa mea creativă aducem la viață produse personalizate care fac
              momentele speciale și mai memorabile.
            </p>
            <p>
              <strong>🌟 De ce am început handmade?</strong><br />
              Totul a început acum 7 ani și jumătate, din dorința de a-i face
              băiețelului nostru tricouri personalizate unice. Susținută de cel
              mai mare ajutor și critic al meu – soțul meu – am transformat
              această pasiune într-o mică afacere care aduce bucurie oamenilor
              de toate vârstele.
            </p>
            <p>
              <strong>✨ Misiunea noastră:</strong><br />
              Nu căutăm perfecțiunea – căutăm să fim pe placul vostru și să
              aducem zâmbete și emoții prin fiecare creație. Portofoliul nostru
              este diversificat și continuăm să adăugăm produse noi, creative și
              personalizate.
            </p>
          </div>
          <div class="story-image slide-right">
            <img src="/HomePage/homepage1.jpg" alt="Handmade creations" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">🎨 Ce Oferim</h2>
        <div class="features-grid">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="stat-card slide-up"
            :style="{ animationDelay: `${index * 0.15}s` }">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2>Gata să creezi ceva magic? 🌸</h2>
        <p>Descoperă colecția completă de produse personalizate</p>
        <router-link to="/products" class="btn btn-primary">
          Vino și Vezi Produsele
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  animation: fadeIn 0.6s ease-out;
}

/* Hero Section */
.hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

.hero-content {
  color: var(--text-dark);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-pink), var(--dark-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-md);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: var(--spacing-lg);
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.btn-primary {
  background: linear-gradient(
    135deg,
    var(--primary-pink),
    var(--light-pink)
  ) !important;
  color: var(--white);
  padding: var(--spacing-md) var(--spacing-xl) !important;
  border-radius: var(--radius-lg);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
  background: linear-gradient(
    135deg,
    var(--dark-pink),
    var(--primary-pink)
  ) !important;
}

.btn-secondary {
  background: var(--white) !important;
  color: var(--primary-pink);
  padding: var(--spacing-md) var(--spacing-xl) !important;
  border-radius: var(--radius-lg);
  border: 2px solid var(--primary-pink);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  transition: var(--transition);
}

.btn-secondary:hover {
  background: var(--very-light-pink) !important;
  transform: translateY(-3px);
  border-color: var(--dark-pink);
  color: var(--dark-pink);
}

.hero-image {
  display: flex;
  justify-content: center;
}

.hero-image img {
  width: min(100%, 420px);
  aspect-ratio: 1 / 1;
  height: auto;
  object-fit: cover;
  border-radius: 50%;
  background: transparent;
  box-shadow: var(--shadow-lg);
  transition: var(--transition);
}

.hero-image:hover img {
  transform: scale(1.03);
}

/* Story Section */
.story-section {
  background: linear-gradient(
    135deg,
    rgba(255, 182, 193, 0.3),
    rgba(255, 240, 245, 0.5)
  );
  padding: var(--spacing-xl) var(--spacing-lg);
  border-top: 2px solid var(--light-pink);
  border-bottom: 2px solid var(--light-pink);
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

.story-text h2 {
  font-size: 2.5rem;
  color: var(--primary-pink);
  margin-bottom: var(--spacing-lg);
}

.story-text p {
  margin-bottom: var(--spacing-md);
  line-height: 1.8;
  color: var(--text-dark);
}

.story-image img {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  background: transparent;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

/* Features Section */
.features-section {
  padding: var(--spacing-xl) var(--spacing-lg);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: var(--primary-pink);
  margin-bottom: var(--spacing-xl);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.feature-card {
  background: var(--white);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow);
  transition: var(--transition);
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--light-pink);
  background: linear-gradient(
    135deg,
    rgba(255, 240, 245, 0.5),
    rgba(255, 182, 193, 0.2)
  );
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.feature-card h3 {
  color: var(--primary-pink);
  margin-bottom: var(--spacing-md);
}

.feature-card p {
  color: var(--text-light);
  margin: 0;
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  padding: var(--spacing-xl) var(--spacing-lg);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  backdrop-filter: blur(10px);
  transition: var(--transition);
}

.stat-card:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-pink), var(--dark-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-light);
  margin-top: var(--spacing-sm);
}

/* CTA Section */
.cta-section {
  background: linear-gradient(
    135deg,
    rgba(255, 182, 193, 0.5),
    rgba(255, 240, 245, 0.8)
  );
  padding: var(--spacing-xl) var(--spacing-lg);
  text-align: center;
  border-top: 2px solid var(--light-pink);
}

.cta-section h2 {
  font-size: 2.5rem;
  color: var(--primary-pink);
  margin-bottom: var(--spacing-md);
}

.cta-section p {
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero {
    gap: var(--spacing-lg);
    padding: var(--spacing-lg) var(--spacing-lg);
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .feature-card p {
    font-size: 0.9rem;
  }

  .cta-section h2 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
    padding: var(--spacing-md) var(--spacing-lg) !important;
  }

  .hero-image {
    max-width: 100%;
  }

  .hero-image img {
    max-width: 100%;
    height: auto;
  }

  .story-section {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .story-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .story-text h2 {
    font-size: 1.6rem;
  }

  .story-image img {
    max-width: 100%;
    height: auto;
  }

  .features-section {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .section-title {
    font-size: 1.6rem;
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-md);
  }

  .feature-card h3 {
    font-size: 1.1rem;
  }

  .stats-section {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--spacing-md);
  }

  .stat-card {
    padding: var(--spacing-lg);
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 0.9rem;
  }

  .cta-section {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .cta-section h2 {
    font-size: 1.6rem;
  }

  .cta-section p {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .hero {
    gap: var(--spacing-md);
    padding: var(--spacing-md);
  }

  .hero-title {
    font-size: 1.4rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .hero-buttons {
    gap: var(--spacing-sm);
  }

  .btn-primary,
  .btn-secondary {
    padding: var(--spacing-sm) var(--spacing-md) !important;
    font-size: 0.9rem;
  }

  .story-section {
    padding: var(--spacing-md);
  }

  .story-text h2 {
    font-size: 1.3rem;
  }

  .story-text p {
    font-size: 0.9rem;
  }

  .features-section {
    padding: var(--spacing-md);
  }

  .section-title {
    font-size: 1.3rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .feature-icon {
    font-size: 2rem;
  }

  .feature-card {
    padding: var(--spacing-md);
  }

  .feature-card h3 {
    font-size: 1rem;
  }

  .feature-card p {
    font-size: 0.85rem;
  }

  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-sm);
  }

  .stat-card {
    padding: var(--spacing-md);
  }

  .stat-number {
    font-size: 1.6rem;
  }

  .stat-label {
    font-size: 0.8rem;
  }

  .cta-section h2 {
    font-size: 1.3rem;
  }

  .cta-section p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: var(--spacing-sm);
    gap: var(--spacing-md);
  }

  .hero-title {
    font-size: 1.2rem;
  }

  .hero-buttons {
    gap: var(--spacing-xs);
  }

  .btn-primary,
  .btn-secondary {
    padding: var(--spacing-xs) var(--spacing-md) !important;
    font-size: 0.85rem;
  }

  .features-grid {
    gap: var(--spacing-sm);
  }

  .stats-grid {
    gap: var(--spacing-xs);
  }

  .stat-card {
    padding: var(--spacing-sm);
  }

  .stat-number {
    font-size: 1.3rem;
  }

  .stat-label {
    font-size: 0.7rem;
  }

  .cta-section {
    padding: var(--spacing-sm);
  }
}
</style>
