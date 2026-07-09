<template>
  <div class="failed-container">
    <div class="failed-card">
      <div class="icon">❌</div>
      <h1>Plata a fost anulată!</h1>
      <p>
        Procesul de plată nu a fost finalizat, așa că am anulat și șters comanda
        din sistem pentru siguranța ta.
      </p>
      <p>
        Produsele tale se află încă în coșul de cumpărături dacă dorești să
        încerci din nou.
      </p>

      <router-link to="/cart" class="btn-back-cart">
        Înapoi la Coș
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";

const route = useRoute();
const toast = useToast();

onMounted(async () => {
  sessionStorage.removeItem("orderInProgress");
  const orderId = route.query.order_id;

  if (orderId) {
    try {
      await fetch(`http://localhost:5000/api/orders/delete/${orderId}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (error) {
      console.error("Eroare la ștergerea comenzii:", error);
    }
  }
});
</script>

<style scoped>
.failed-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  text-align: center;
}
.failed-card {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}
.icon {
  font-size: 50px;
  margin-bottom: 20px;
}
h1 {
  color: #e74c3c;
  margin-bottom: 10px;
}
p {
  color: #555;
  margin-bottom: 20px;
}
.btn-back-cart {
  display: inline-block;
  background-color: #34495e;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
}
</style>
