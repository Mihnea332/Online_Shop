<template>
  <div class="cart-page">
    <div class="divCos">
      <h1 class="titlu-principal">Coșul tău!</h1>
    </div>
    <div v-if="cartStore.totalItems > 0" class="cart-content-wrapper">
      <div class="cart-container">
        <div class="cart-list">
          <div
            v-for="(item, index) in cartStore.items"
            :key="index"
            class="cart-item">
            <img :src="item.image" class="item-img" :alt="item.name" />

            <div class="item-details">
              <h4>{{ item.name }}</h4>
              <p class="variant">{{ item.variantName }}</p>
              <p class="price-qty">{{ item.price }} € x {{ item.quantity }}</p>
            </div>
            <div class="bttns">
              <button
                @click="cartStore.removeFromCart(index)"
                class="btn-remove"
                title="Șterge produs">
                🗑️
              </button>
              <button
                @click="cartStore.incrementProduct(index)"
                class="btn-increment"
                title="+1">
                +
              </button>
              <button
                @click="cartStore.decrementProduct(index)"
                class="btn-decrement"
                title="-1">
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-box">
          <p>
            Produse în total: <strong>{{ cartStore.totalItems }}</strong>
          </p>
          <p class="total">
            Total de plată <span>{{ cartStore.totalPrice }} €</span>
          </p>
          <div class="butoane">
            <router-link to="/checkout" class="btn-checkout"
              >Finalizează comanda</router-link
            >

            <button @click="cartStore.emptyCart()" class="btnEmpty">
              Goleste Cosul
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Coșul tău este gol. 🌸</p>
      <router-link to="/products" class="btn-back">Vezi produsele</router-link>
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from "../stores/cart";
const cartStore = useCartStore();
</script>
<style scoped>
.bttns {
  display: flex;
}
.divCos {
  display: flex;
  text-decoration: underline;
  justify-content: center;
  font-weight: bold;
}
.cart {
  font-size: 25px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.titlu-cos {
  text-align: center;
  color: #333;
  margin-bottom: 40px;
}

.cart-container {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.cart-list {
  flex: 2;
  min-width: 300px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #ffb6c1;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.item-img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  margin: 0;
  color: #333;
}
.variant {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}
.price-qty {
  font-weight: bold;
  color: #ffb6c1;
  margin-top: 5px;
}

.btn-remove,
.btn-increment,
.btn-decrement {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-remove:hover,
.btn-increment:hover,
.btn-decrement:hover {
  transform: scale(1.2);
}

.cart-summary {
  flex: 1;
  min-width: 250px;
}

.summary-box {
  background: #fff5f7;
  padding: 30px;
  border-radius: 20px;
  border: 2px dashed #ffb6c1;
  position: sticky;
  top: 20px;
  margin-bottom: 10px;
}

.total {
  font-size: 1.3rem;
  margin: 20px 0;
  border-top: 1px solid #ffb6c1;
  padding-top: 15px;
}

.total span {
  font-weight: bold;
  color: #333;
}

.btn-checkout,
.btnEmpty {
  flex: 1; /* Le face să aibă aceeași lățime */
  max-width: 48%; /* Previne atingerea lor în centru */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: #ffb6c1;
  padding: 15px 5px; /* Padding vertical și orizontal */
  border: none;
  border-radius: 50px;
  font-weight: bold;
  text-decoration: none; /* Important pentru router-link */
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem; /* Ajustează mărimea fontului dacă textul e prea lung */
  text-align: center;
}

/* Efect de hover comun */
.btn-checkout:hover,
.btnEmpty:hover {
  background-color: #000;
  transform: translateY(-2px);
  color: white;
}
.keep-shopping {
  display: block;
  text-align: center;
  margin-top: 15px;
  font-size: 0.9rem;
  color: #666;
  text-decoration: none;
}

/* Stil pentru Coș Gol */
.empty-cart {
  text-align: center;
  padding: 100px 20px;
}

.btn-back {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 30px;
  background-color: #ffb6c1;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
}
.butoane {
  display: flex;
  justify-content: space-between; /* Împinge butoanele la capete */
  align-items: center;
  gap: 10px; /* Spațiu minim între ele pe ecrane mici */
  width: 100%;
  margin-top: 20px;
}
</style>
