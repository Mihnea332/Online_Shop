<script setup>
import { ref, onMounted } from "vue";
const orders = ref([]);
const loading = ref(true);
const fetchOrders = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Eroare:", error);
  } finally {
    loading.value = false;
  }
};
const deleteOrder = async (id) => {
  if (!confirm("Esti sigur ca vrei sa stergi comanda?")) return;
  try {
    const reposnse = await fetch(
      `http://localhost:5000/api/orders/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (response.ok) {
      orders.value = orders.value.filter((o) => o._id == id);
      alert("Comanda stearsa!");
    }
  } catch (error) {
    alert("Eroare la stergere!");
  }
};
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("ro-RO", options);
};
onMounted(fetchOrders);
</script>

<template>
  <div class="admin-dashboard">
    <h1>Panou Administrare - Comenzi</h1>

    <div class="table-wrapper">
      <table v-if="!loading">
        <thead>
          <tr>
            <th>Client & Telefon</th>
            <th>Produse</th>
            <th>Total</th>
            <th>Data</th>
            <th>Status</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td>
              <strong>{{ order.customer.customerName }}</strong
              ><br />
              <small>{{ order.customer.phoneNumber }}</small>
            </td>
            <td class="products-cell">
              <ul>
                <li v-for="item in order.items" :key="item.id">
                  {{ item.quantity }}x {{ item.name }} ({{ item.variantName }})
                </li>
              </ul>
              <div v-if="order.customer.description" class="order-desc">
                📝 {{ order.customer.description }}
              </div>
            </td>
            <td class="total-price">{{ order.total }} €</td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td>
              <span
                :class="[
                  'status-badge',
                  order.status.toLowerCase().replace(' ', '-'),
                ]">
                {{ order.status }}
              </span>
            </td>
            <td>
              <button @click="deleteOrder(order._id)" class="btn-delete">
                Șterge
              </button>
            </td>
          </tr>
          <tr v-if="orders.length === 0">
            <td colspan="6" style="text-align: center; padding: 50px">
              Nu există comenzi momentan. 📦
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="loader">Se încarcă comenzile...</div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.table-wrapper {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #ffb6c1;
  color: white;
  padding: 15px;
  text-align: left;
}

td {
  padding: 15px;
  border-bottom: 1px solid #eee;
  vertical-align: top;
}

.products-cell ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
}

.order-desc {
  margin-top: 8px;
  font-style: italic;
  font-size: 0.85rem;
  color: #666;
  background: #fff5f7;
  padding: 5px;
  border-radius: 5px;
}

.total-price {
  font-weight: bold;
  color: #ff69b4;
}

/* Status Badges */
.status-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}
.status-badge.noua {
  background: #ffe4e1;
  color: #cd5c5c;
}
.status-badge.in-curs {
  background: #fffacd;
  color: #8b8000;
}
.status-badge.finalizata {
  background: #e0ffe0;
  color: #2e8b57;
}

.btn-delete {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-delete:hover {
  background: #cc0000;
}

.loader {
  text-align: center;
  padding: 50px;
  font-weight: bold;
}
</style>
