<script setup>
import { ref } from "vue";
import { useCartStore } from "../stores/cart";
import { useRouter } from "vue-router";
import { toast } from "../utils/toast";

const cartStore = useCartStore();
const router = useRouter();

// Variabila care rezolvă eroarea din consolă și previne dubla-apăsare a butoanelor
const isProcessingPayment = ref(false);

const orderData = ref({
  customerName: "",
  email: "",
  phoneNumber: "",
  country: "", // Acum țara și orașul se vor salva corect aici!
  city: "",
  street: "",
  block: "",
  number: "",
  description: "",
});

// Lista sigură și stabilă a țărilor din Europa (fără erori de CORS de la API-uri gratuite)
const countries = ref([
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
  "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg",
  "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania",
  "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "United Kingdom"
]);

const cities = ref([]);
const isLoadingCities = ref(false);

const fetchCities = async () => {
  // Resetăm starea orașului când se schimbă țara
  orderData.value.city = '';
  cities.value = [];

  if (!orderData.value.country) return;

  isLoadingCities.value = true;

  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: orderData.value.country }),
    });

    const data = await response.json();

    if (!data.error && data.data) {
      cities.value = data.data;
    } else {
      cities.value = [];
    }
  } catch (error) {
    console.error("Eroare la preluarea orașelor:", error);
    cities.value = [];
  } finally {
    isLoadingCities.value = false;
  }
};

const submitOrder = async () => {
  if (cartStore.items.length === 0) return toast.warning("Coșul este gol!");

  const order = {
    customer: orderData.value,
    items: cartStore.items,
    total: cartStore.totalPrice,
  };

  isProcessingPayment.value = true;
  toast.info("Te redirecționăm către plată...");

  try {
    const response = await fetch(apiUrl("/api/orders"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    if (response.ok && data.url) {
      sessionStorage.setItem("orderInProgress", "true");
      window.location.href = data.url;
    } else {
      toast.error(`Eroare: ${data.message}`);
      isProcessingPayment.value = false;
    }
  } catch (error) {
    toast.error("Eroare de conexiune.");
    isProcessingPayment.value = false;
  }
};

const payWithPayPal = async () => {
  if (cartStore.items.length === 0) return toast.warning("Coșul este gol!");

  const requiredFields = [
    "customerName",
    "email",
    "phoneNumber",
    "country",
    "city",
    "street",
    "number",
    "description",
  ];

  const missingField = requiredFields.find(
    (field) => !orderData.value[field]?.trim()
  );

  if (missingField) {
    return toast.warning("Te rog completează toate câmpurile obligatorii! 📝");
  }

  const order = {
    customer: orderData.value,
    items: cartStore.items,
    total: cartStore.totalPrice,
  };

  isProcessingPayment.value = true;
  toast.info("Te redirecționăm către PayPal...");

  try {
    const response = await fetch("http://localhost:5000/api/orders/paypal/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    if (response.ok && data.url) {
      sessionStorage.setItem("orderInProgress", "true");
      window.location.href = data.url;
    } else {
      toast.error(data.message || "Eroare la initierea platii PayPal");
      isProcessingPayment.value = false;
    }
  } catch (err) {
    toast.error("Eroare de conexiune.");
    isProcessingPayment.value = false;
  }
};
</script>

<template>
  <div class="checkout-page">
    <div class="checkout-header">
      <h1>📋 Finalizează Comanda</h1>
      <p>Completează datele tale pentru a plasa comanda</p>
    </div>

    <div class="checkout-content">
      <form class="order-form" @submit.prevent="submitOrder">
        <div class="form-section">
          <h2>👤 Informații Personale</h2>
          <div class="form-group">
            <label for="customerName">Nume Complet *</label>
            <input type="text" id="customerName" v-model="orderData.customerName"
              placeholder="Introduceți numele dumneavoastră" required />
          </div>

          <div class="form-group">
            <label>Email *</label>
            <input v-model="orderData.email" type="email" placeholder="Adresa de email" required class="admin-input" />
          </div>

          <div class="form-group">
            <label for="phoneNumber">Număr de Telefon *</label>
            <input type="text" id="phoneNumber" v-model="orderData.phoneNumber" placeholder="Ex: +40 7XX XXX XXX"
              required />
          </div>
        </div>

        <div class="form-section">
          <h2>📍 Adresa de Livrare</h2>
          <div class="form-group">
            <label for="country">Țara *</label>
            <!-- Conectat corect la orderData.country și corectat :value="country" -->
            <select id="country" v-model="orderData.country" @change="fetchCities" required>
              <option value="" disabled>Selectează țara</option>
              <option :value="country" :key="country" v-for="country in countries">{{ country }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="city">Orașul / Localitatea *</label>
            <!-- Conectat corect la orderData.city -->
            <select id="city" v-model="orderData.city" :disabled="!orderData.country || isLoadingCities">
              <option value="" disabled>
                {{ isLoadingCities ? 'Se caută orașele...' : 'Selectează orașul' }}
              </option>
              <option v-if="cities.length > 0" v-for="city in cities" :key="city" :value="city">
                {{ city }}
              </option>
              <option v-else-if="orderData.country && !isLoadingCities && cities.length === 0" value="manual">
                Orașul nu a fost găsit (Tastează mai jos)
              </option>
            </select>

            <input v-if="orderData.country && !isLoadingCities && cities.length === 0" type="text"
              v-model="orderData.city" placeholder="Introdu orașul manual" class="mt-2" required />
          </div>

          <div class="form-group">
            <label for="street">Strada *</label>
            <input type="text" id="street" v-model="orderData.street" placeholder="Ex: Strada Principală" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="block">Bloc</label>
              <input type="text" id="block" v-model="orderData.block" placeholder="Ex: A" />
            </div>

            <div class="form-group">
              <label for="number">Număr *</label>
              <input type="text" id="number" v-model="orderData.number" placeholder="Ex: 15" required />
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>💬 Detalii Personalizare</h2>
          <div class="form-group">
            <label for="description">Descriere comenzii *</label>
            <textarea id="description" v-model="orderData.description"
              placeholder="Introduceți aici toate detaliile necesare pentru personalizarea comenzii. (Design, culori, mesaje speciale, etc.)"
              required></textarea>
          </div>
        </div>

        <div class="info-box">
          <p>
            <strong>Pozele pentru customizare se trimit pe email sau Whatsapp. In
              mesaj sau email se mentioneaza numele de pe care s-a facut
              comanda. Va multumesc!</strong>
          </p>
        </div>

        <div class="buttons">
          <button type="submit" class="submitButton submit" :disabled="isProcessingPayment">
            💳 {{ isProcessingPayment ? 'Se procesează...' : 'Plătește cu Cardul' }}
          </button>
          <button type="button" @click="payWithPayPal" class="btn-paypal" :disabled="isProcessingPayment">
            <svg class="paypal-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4h6.5c2.5 0 4.2 1.4 3.8 3.8-.5 3-2.8 4.7-5.8 4.7h-2.3l-.9 5.5H6L8 4z" fill="#ffffff"
                opacity="0.55" />
              <path d="M9.5 6.5h6c2.2 0 3.7 1.3 3.3 3.4-.4 2.6-2.5 4.1-5.1 4.1h-2l-.8 4.9H8.2l1.3-12.4z"
                fill="#ffffff" />
            </svg>
            <span>{{ isProcessingPayment ? "Se procesează..." : "Plătește cu PayPal" }}</span>
          </button>
          <input type="reset" class="submitButton reset" value="⟲ Resetează" :disabled="isProcessingPayment" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-group input,
.form-group textarea {
  box-sizing: border-box;
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--light-pink);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
  background: var(--white);
  color: var(--text-dark);
}

.btn-paypal {
  flex: 1;
  min-width: 150px;
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #0070ba, #003087);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 48, 135, 0.25);
}

.btn-paypal:hover:not(:disabled) {
  background: linear-gradient(135deg, #005ea6, #002569);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 48, 135, 0.35);
}

.btn-paypal:active:not(:disabled) {
  transform: translateY(0);
}

.btn-paypal:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.paypal-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.checkout-page {
  min-height: 80vh;
  animation: fadeIn 0.6s ease-out;
  padding-bottom: var(--spacing-xl);
}

.checkout-header {
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  padding: var(--spacing-xl) var(--spacing-lg);
  text-align: center;
}

.checkout-header h1 {
  font-size: 2.5rem;
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--white);
}

.checkout-header p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.checkout-content {
  max-width: 600px;
  margin: var(--spacing-xl) auto;
  padding: 0 var(--spacing-lg);
}

.order-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  animation: slideInUp 0.6s ease-out;
}

.form-section {
  background: var(--white);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 2px solid var(--light-pink);
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.form-section:hover {
  border-color: var(--primary-pink);
  box-shadow: var(--shadow-lg);
}

.form-section h2 {
  color: var(--primary-pink);
  font-size: 1.3rem;
  margin-top: 0;
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

/* --- Stilul de bază pentru Input, Textarea și Select --- */
.form-group input,
.form-group textarea,
.form-group select {
  box-sizing: border-box;
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--light-pink);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
  background: var(--white);
  color: var(--text-dark);
}

/* --- Design specific PENTRU DROPDOWN (Săgeata custom) --- */
.form-group select {
  /* Ascunde săgeata urâtă default din Windows/Mac */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* Pune o săgeată roz, finuță, făcută din SVG */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23ff69b4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
  padding-right: 40px;
  /* Face loc săgeții ca să nu scrii peste ea */
  cursor: pointer;
}

/* --- Cum arată când dai click pe ele (Focus) --- */
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-pink);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
  background-color: rgba(255, 240, 245, 0.5);
}

/* --- Cum arată când un Dropdown e blocat (Disabled) --- */
.form-group select:disabled {
  background-color: #f9f9f9;
  color: #a0a0a0;
  border-color: #e6e6e6;
  cursor: not-allowed;
  /* Ascunde săgeata când e blocat ca să fie evident că nu poți da click */
  background-image: none;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.info-box {
  background: linear-gradient(135deg,
      rgba(255, 240, 245, 0.7),
      rgba(255, 182, 193, 0.2));
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--primary-pink);
  color: var(--text-dark);
}

.info-box p {
  margin: 0;
  line-height: 1.6;
}

.info-box a {
  color: var(--primary-pink);
  font-weight: 600;
  transition: var(--transition);
}

.info-box a:hover {
  color: var(--dark-pink);
}

.buttons {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.submitButton {
  flex: 1;
  min-width: 150px;
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.submit {
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
}

.submit:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--dark-pink), var(--primary-pink));
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset {
  background: linear-gradient(135deg,
      rgba(255, 105, 180, 0.3),
      rgba(255, 182, 193, 0.3));
  color: var(--primary-pink);
  border: 2px solid var(--primary-pink);
}

.reset:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  transform: translateY(-2px);
}

.reset:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 1024px) {
  .checkout-header h1 {
    font-size: 2rem;
  }

  .checkout-content {
    padding: 0 var(--spacing-lg);
    max-width: 700px;
  }

  .form-section {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .checkout-page {
    padding-bottom: var(--spacing-lg);
  }

  .checkout-header h1 {
    font-size: 1.6rem;
  }

  .checkout-header p {
    font-size: 0.95rem;
  }

  .checkout-content {
    padding: 0 var(--spacing-md);
    max-width: 100%;
    margin: var(--spacing-lg) auto;
  }

  .order-form {
    gap: var(--spacing-md);
  }

  .form-section {
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
  }

  .form-section h2 {
    font-size: 1.2rem;
    margin-bottom: var(--spacing-md);
  }

  .form-group {
    margin-bottom: var(--spacing-md);
  }

  .form-group label {
    font-size: 0.9rem;
  }

  .form-group input,
  .form-group textarea {
    padding: var(--spacing-md);
    font-size: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .info-box {
    padding: var(--spacing-md);
    font-size: 0.9rem;
  }

  .buttons {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .submitButton {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: 0.95rem;
  }
}

@media (max-width: 600px) {
  .checkout-header h1 {
    font-size: 1.4rem;
  }

  .checkout-header p {
    font-size: 0.9rem;
  }

  .checkout-content {
    padding: 0 var(--spacing-sm);
    margin: var(--spacing-md) auto;
  }

  .form-section {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .form-section h2 {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-md);
  }

  .form-group label {
    font-size: 0.85rem;
  }

  .form-group input,
  .form-group textarea {
    padding: var(--spacing-sm);
    font-size: 0.95rem;
  }

  .info-box {
    padding: var(--spacing-md);
    font-size: 0.8rem;
  }

  .info-box p {
    margin: 0;
  }

  .submitButton {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .checkout-page {
    min-height: 70vh;
    padding-bottom: var(--spacing-md);
  }

  .checkout-header {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .checkout-header h1 {
    font-size: 1.2rem;
    margin-bottom: 4px;
  }

  .checkout-header p {
    font-size: 0.85rem;
  }

  .checkout-content {
    padding: 0 var(--spacing-sm);
    margin: var(--spacing-md) auto;
  }

  .order-form {
    gap: var(--spacing-sm);
  }

  .form-section {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
  }

  .form-section h2 {
    font-size: 1rem;
    margin-bottom: var(--spacing-sm);
  }

  .form-group {
    margin-bottom: var(--spacing-sm);
  }

  .form-group label {
    font-size: 0.8rem;
    margin-bottom: 4px;
  }

  .form-group input,
  .form-group textarea {
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }

  .form-group textarea {
    min-height: 100px;
  }

  .info-box {
    padding: var(--spacing-sm);
    font-size: 0.75rem;
  }

  .buttons {
    gap: var(--spacing-sm);
  }

  .submitButton {
    padding: var(--spacing-sm);
    font-size: 0.8rem;
    flex: 1;
  }
}
</style>