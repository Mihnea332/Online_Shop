<template>
  <div class="success-container">
    <div class="success-card">
      <template v-if="!paymentFailed">
        <div class="icon">✨🎉✨</div>
        <h1>Plata a fost realizată cu succes!</h1>
        <p>
          Îți mulțumim pentru comandă. Detaliile au fost înregistrate și ne
          apucăm imediat de pregătirea ei.
        </p>
      </template>
      <template v-else>
        <div class="icon">⚠️</div>
        <h1>Nu am putut confirma plata</h1>
        <p>
          Comanda a fost înregistrată, dar confirmarea plății a eșuat. Te rugăm
          să ne contactezi dacă suma a fost reținută din cont.
        </p>
      </template>

      <router-link to="/" class="btn-home">
        Întoarce-te la Magazin
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCartStore } from "../stores/cart";
import { useRoute } from "vue-router";
import { toast } from "../utils/toast";

const cartStore = useCartStore();
const route = useRoute();
const paymentFailed = ref(false); // <-- pentru afisaj corect in template

onMounted(async () => {
  sessionStorage.removeItem("orderInProgress");
  const sessionId = route.query.session_id;
  const paypalOrderId = route.query.token;

  if (paypalOrderId) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/paypal/capture`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paypalOrderId }),
        },
      );

      if (res.ok) {
        cartStore.items = [];
      } else {
        const data = await res.json();
        console.error("Eroare la confirmarea platii PayPal:", data.message);
        paymentFailed.value = true;
        toast.error(data.message || "Plata PayPal nu a putut fi confirmata.");
      }
    } catch (error) {
      console.error("Eroare de retea la verificare PayPal:", error);
      paymentFailed.value = true;
      toast.error("Eroare de conexiune la confirmarea platii.");
    }
  } else if (sessionId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/verify-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        },
      );

      if (response.ok) {
        console.log("Status actualizat cu succes în baza de date la: Platita");
        cartStore.items = [];
      } else {
        console.error("Eroare la confirmarea comenzii în baza de date.");
        paymentFailed.value = true;
      }
    } catch (error) {
      console.error("Eroare de rețea la verificare:", error);
      paymentFailed.value = true;
    }
  }
});
</script>

<style>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  text-align: center;
  padding: 20px;
}

.success-card {
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  max-width: 500px;
}

.success-card .icon {
  font-size: 50px;
  margin-bottom: 20px;
}

.success-card h1 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 24px;
}

.success-card p {
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.btn-home {
  display: inline-block;
  background-color: #2c3e50; /* Schimbă cu culoarea butoanelor tale */
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

.btn-home:hover {
  opacity: 0.9;
}
</style>
