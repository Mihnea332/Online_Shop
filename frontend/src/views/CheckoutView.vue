<script setup>
import { ref } from "vue";
import { useCartStore } from "../stores/cart";
import { useRouter } from "vue-router";
const cartStore = useCartStore();
const router = useRouter();
const orderData = ref({
  customerName: "",
  phoneNumber: "",
  country: "",
  city: "",
  street: "",
  block: "",
  number: "",
  description: "",
});
const submitOrder = async () => {
  if (cartStore.items.length === 0) {
    alert("Cosul este gol!");
    return;
  }
  const order = {
    customer: orderData.value,
    items: cartStore.items,
    total: cartStore.totalPrice,
  };
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (response.ok) {
      alert("Comanda a fost plasata!");
      cartStore.items = [];
      localStorage.removeItem("cart_items");
      router.push("/");
    }
  } catch (error) {
    console.error("Eroare:", error);
    alert("A aparut o eroare la plasarea comenzii");
  }
};
</script>
<template>
  <div class="content">
    <form class="order-form" @submit.prevent="submitOrder">
      <label for="name">Nume: </label>
      <input
        type="text"
        id="customerName"
        v-model="orderData.customerName"
        required />
      <label for="phoneNumber">Numar de telefon: </label>
      <input
        type="text"
        id="phoneNumber"
        v-model="orderData.phoneNumber"
        required />
      <label for=" country">Tara: </label>
      <input type="text" id="country" v-model="orderData.country" required />
      <label for="city">Oras: </label>
      <input type="text" id="city" v-model="orderData.city" required />
      <label for="street">Strada: </label>
      <input type="text" id="street" v-model="orderData.street" required />
      <label for="block">Bloc: </label>
      <input type="text" id="block" v-model="orderData.block" />
      <label for="number">Numar: </label>
      <input type="text" id="number" v-model="orderData.number" required />
      <label for="description">Descriere: </label>
      <textarea
        id="description"
        v-model="orderData.description"
        required
        placeholder="Introduceți aici toate detaliile necesare pentru personalizarea comenzii dumneavoastră."></textarea>
      <div class="buttons">
        <input type="reset" class="submitButton" value="Resetează" />
        <button type="submit" class="submitButton">Trimite</button>
      </div>
      <p>
        !!! Pentru plata si intrebari va rog sa ma contactati pe pagina de
        Facebook !!!
      </p>
    </form>
  </div>
</template>
<style scoped>
.order-form {
  font-size: 30px;
  font-weight: bolder;
  border: solid;
  border-radius: 20px;
  margin: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.buttons {
  display: flex;
  gap: 15px;
}
#description {
  width: 100%;
  min-height: 150px;
}
.submitButton {
  height: 35px;
  width: 150px;
  background-color: #ffb6c1;
  font-family: "Pacifico", cursive;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
}
.submitButton:hover {
  background-color: #f1b6c1;
  transform: scale(1.2);
}
</style>
