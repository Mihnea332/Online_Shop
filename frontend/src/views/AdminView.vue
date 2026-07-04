<script setup>
import { ref, onMounted } from "vue";
import { toast } from "../utils/toast";

const orders = ref([]);
const loading = ref(true);
const savingOrderId = ref(null);

const getStatusClass = (status) => {
  if (status === "Noua") return "status-new";
  if (status === "In curs") return "status-processing";
  if (status === "Finalizata") return "status-finished";
  return "";
};

const updateStatus = async (orderId, newStatus) => {
  savingOrderId.value = orderId;

  try {
    const res = await fetch(
      `http://localhost:5000/api/orders/${orderId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken") || localStorage.getItem("user_token") || localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      },
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Status actualizat cu succes!", {
        position: "top-right",
      });
      await fetchOrders();
    } else {
      toast.error(data.message || "Nu s-a putut actualiza statusul.");
      await fetchOrders();
    }
  } catch (error) {
    console.error("Eroare la schimbarea statusului:", error);
    toast.error("Nu s-a putut conecta la server.");
  } finally {
    savingOrderId.value = null;
  }
};

const fetchOrders = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken") || localStorage.getItem("user_token") || localStorage.getItem("token")}`,
      },
    });

    // REPARAȚIA 1: Extragem datele și le salvăm în starea componentei
    if (response.ok) {
      const data = await response.json();
      orders.value = data;
    } else {
      console.error("Acces refuzat sau eroare server:", response.status);
    }
  } catch (error) {
    console.error("Eroare la preluarea comenzilor:", error);
  } finally {
    loading.value = false;
  }
};

const deleteOrder = async (id) => {
  if (!confirm("Esti sigur ca vrei sa stergi comanda?")) return;

  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.ok) {
      orders.value = orders.value.filter((o) => o._id !== id);
      toast.success("Comanda stearsa!");
    } else {
      toast.error("Eroare la stergere din partea serverului!");
    }
  } catch (error) {
    console.error(error);
    toast.error("Eroare la stergere!");
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

    <div class="admin-actions">
      <router-link to="/dashboard" class="btn-dashboard">
        Modifica produse
      </router-link>
    </div>

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
              <div class="status-control">
                <select
                  v-model="order.status"
                  :class="['status-select', getStatusClass(order.status)]">
                  <option value="Noua">Nouă</option>
                  <option value="In curs">În curs</option>
                  <option value="Finalizata">Finalizată</option>
                </select>

                <button
                  type="button"
                  class="btn-status-update"
                  :disabled="savingOrderId === order._id"
                  @click="updateStatus(order._id, order.status)">
                  {{
                    savingOrderId === order._id
                      ? "Se salvează..."
                      : "Actualizează status"
                  }}
                </button>
              </div>
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
  padding: var(--spacing-xl) var(--spacing-lg);
  background: linear-gradient(
    135deg,
    var(--very-light-pink),
    rgba(255, 240, 245, 0.5)
  );
  min-height: 100vh;
  animation: fadeIn 0.6s ease-out;
}

h1 {
  text-align: center;
  color: var(--primary-pink);
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}

.admin-actions {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.btn-dashboard {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: 50px;
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  text-decoration: none;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.btn-dashboard:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
  background: linear-gradient(135deg, var(--dark-pink), var(--primary-pink));
}

.table-wrapper {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  max-width: 1400px;
  margin: 0 auto;
  animation: slideInUp 0.6s ease-out;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  padding: var(--spacing-lg);
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
}

td {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--light-pink);
  vertical-align: top;
  color: var(--text-dark);
}

tbody tr {
  transition: var(--transition);
}

tbody tr:hover {
  background-color: rgba(255, 182, 193, 0.1);
}

tbody tr:last-child td {
  border-bottom: none;
}

.products-cell ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
}

.products-cell li {
  padding: var(--spacing-xs) 0;
  color: var(--text-dark);
}

.products-cell li:not(:last-child) {
  border-bottom: 1px solid var(--light-pink);
  margin-bottom: var(--spacing-xs);
  padding-bottom: var(--spacing-xs);
}

.order-desc {
  margin-top: var(--spacing-md);
  font-style: italic;
  font-size: 0.85rem;
  color: var(--text-light);
  background: linear-gradient(
    135deg,
    rgba(255, 240, 245, 0.6),
    rgba(255, 182, 193, 0.2)
  );
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--primary-pink);
}

.total-price {
  font-weight: 700;
  color: var(--primary-pink);
  font-size: 1.1rem;
}

/* Status Badges */
.status-badge {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.status-badge:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow);
}

.status-badge.noua {
  background: linear-gradient(135deg, #ffe4e1, #ffc0cb);
  color: #8b0000;
}

.status-badge.in-curs {
  background: linear-gradient(135deg, #fffacd, #ffd700);
  color: #8b7500;
}

.status-badge.finalizata {
  background: linear-gradient(135deg, #e0ffe0, #90ee90);
  color: #2e6e2e;
}

.status-control {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 190px;
}

.status-select {
  appearance: none;
  width: 100%;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  border: 2px solid var(--light-pink);
  background: #fff;
  color: var(--text-dark);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.status-select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.12);
  border-color: var(--primary-pink);
}

.status-select.status-new {
  background: linear-gradient(135deg, #fff0f4, #ffffff);
}

.status-select.status-processing {
  background: linear-gradient(135deg, #fffbe6, #ffffff);
}

.status-select.status-finished {
  background: linear-gradient(135deg, #effff2, #ffffff);
}

.btn-status-update {
  border: none;
  border-radius: var(--radius-md);
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 700;
  color: var(--white);
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.btn-status-update:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
  background: linear-gradient(135deg, var(--dark-pink), var(--primary-pink));
}

.btn-status-update:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}

.btn-delete {
  background: linear-gradient(135deg, #ff6b6b, #ff8787);
  color: var(--white);
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition);
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: var(--shadow-sm);
}

.btn-delete:hover {
  background: linear-gradient(135deg, #ff4444, #ff6666);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.btn-delete:active {
  transform: translateY(0);
}

.loader {
  text-align: center;
  padding: var(--spacing-xl);
  font-weight: 600;
  color: var(--text-light);
  font-size: 1.1rem;
  animation: pulse 1.5s ease-in-out infinite;
}

/* Responsive */
@media (max-width: 1024px) {
  .table-wrapper {
    overflow-x: auto;
  }

  table {
    min-width: 800px;
  }

  th,
  td {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: var(--spacing-lg) var(--spacing-md);
    min-height: calc(100vh - 100px);
  }

  h1 {
    font-size: 1.5rem;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .admin-actions {
    margin-bottom: var(--spacing-lg);
  }

  .btn-dashboard {
    width: 100%;
    max-width: 320px;
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: 0.95rem;
  }

  .table-wrapper {
    overflow-x: auto;
    border-radius: var(--radius-md);
  }

  table {
    min-width: 700px;
    border-collapse: collapse;
  }

  th {
    padding: var(--spacing-md);
    font-size: 0.85rem;
  }

  td {
    padding: var(--spacing-md);
    font-size: 0.9rem;
  }

  .order-description {
    font-size: 0.85rem;
  }

  .products-list {
    margin: 0;
    padding: 0;
  }

  .products-list li {
    padding: var(--spacing-xs);
    font-size: 0.85rem;
  }

  .btn-delete {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.8rem;
  }

  .status-control {
    min-width: 170px;
  }

  .btn-status-update,
  .status-select {
    font-size: 0.8rem;
    padding: 9px 12px;
  }

  .status-badge {
    padding: var(--spacing-xs);
    font-size: 0.7rem;
  }
}

@media (max-width: 600px) {
  .admin-dashboard {
    padding: var(--spacing-md);
    min-height: calc(100vh - 100px);
  }

  h1 {
    font-size: 1.3rem;
  }

  .btn-dashboard {
    max-width: 100%;
    width: 100%;
    font-size: 0.9rem;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  table {
    min-width: 600px;
    font-size: 0.85rem;
  }

  th {
    padding: var(--spacing-sm);
    font-size: 0.8rem;
  }

  td {
    padding: var(--spacing-sm);
    font-size: 0.8rem;
  }

  .order-description {
    padding: var(--spacing-xs);
    font-size: 0.75rem;
    border-radius: var(--radius-sm);
  }

  .products-list {
    padding: 0;
    margin: 0;
  }

  .products-list li {
    padding: 4px;
    font-size: 0.75rem;
    border-bottom: 1px solid rgba(255, 182, 193, 0.5);
  }

  .products-list li:last-child {
    border-bottom: none;
  }

  .btn-delete {
    padding: 4px 8px;
    font-size: 0.7rem;
  }

  .status-control {
    min-width: 150px;
  }

  .btn-status-update,
  .status-select {
    font-size: 0.75rem;
    padding: 8px 10px;
  }

  .status-badge {
    padding: 4px 8px;
    font-size: 0.65rem;
    border-radius: 20px;
  }

  .loader {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .admin-dashboard {
    padding: var(--spacing-sm);
    min-height: 60vh;
  }

  h1 {
    font-size: 1.1rem;
  }

  .btn-dashboard {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.85rem;
  }

  .table-wrapper {
    overflow-x: auto;
    max-width: 100%;
  }

  table {
    min-width: 500px;
    font-size: 0.75rem;
  }

  th {
    padding: 8px;
    font-size: 0.7rem;
  }

  td {
    padding: 8px;
    font-size: 0.7rem;
  }

  th:nth-child(n + 3),
  td:nth-child(n + 3) {
    max-width: 100px;
    word-wrap: break-word;
  }

  .order-description {
    padding: 4px;
    font-size: 0.65rem;
    border-radius: 4px;
  }

  .products-list {
    padding: 0;
    margin: 0;
  }

  .products-list li {
    padding: 2px 4px;
    font-size: 0.65rem;
    border-bottom: 1px solid rgba(255, 182, 193, 0.3);
  }

  .btn-delete {
    padding: 4px 6px;
    font-size: 0.6rem;
    white-space: nowrap;
  }

  .status-control {
    min-width: 130px;
  }

  .btn-status-update,
  .status-select {
    font-size: 0.7rem;
    padding: 7px 8px;
  }

  .status-badge {
    padding: 2px 6px;
    font-size: 0.6rem;
    border-radius: 15px;
  }

  .loader {
    font-size: 0.85rem;
  }
}
</style>
