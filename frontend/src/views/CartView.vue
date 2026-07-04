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
.cart-page {
  min-height: 80vh;
  animation: fadeIn 0.6s ease-out;
  padding-bottom: var(--spacing-xl);
}

.divCos {
  display: flex;
  justify-content: center;
  padding: var(--spacing-xl) var(--spacing-lg);
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  font-weight: 700;
}

.divCos h1 {
  font-size: 2.5rem;
  margin: 0;
  color: var(--white);
}

.cart-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
}

.cart-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.cart-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  background: var(--white);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 2px solid transparent;
  box-shadow: var(--shadow);
  transition: var(--transition);
  animation: slideInLeft 0.6s ease-out;
}

.cart-item:hover {
  border-color: var(--light-pink);
  box-shadow: var(--shadow-lg);
  transform: translateX(5px);
}

.item-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: var(--radius-md);
  flex-shrink: 0;
  transition: var(--transition);
}

.cart-item:hover .item-img {
  transform: scale(1.05);
}

.item-details {
  flex: 1;
}

.item-details h4 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-dark);
  font-size: 1.1rem;
}

.variant {
  font-size: 0.9rem;
  color: var(--text-light);
  font-style: italic;
  margin: var(--spacing-xs) 0;
}

.price-qty {
  font-weight: 700;
  color: var(--primary-pink);
  margin: var(--spacing-sm) 0 0 0;
  font-size: 1.1rem;
}

.bttns {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.btn-remove,
.btn-increment,
.btn-decrement {
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-remove:hover,
.btn-increment:hover,
.btn-decrement:hover {
  transform: scale(1.15);
  box-shadow: var(--shadow);
}

.btn-remove {
  background: linear-gradient(135deg, #ff6b6b, #ff8787);
}

.cart-summary {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.summary-box {
  background: linear-gradient(
    135deg,
    var(--very-light-pink),
    rgba(255, 182, 193, 0.3)
  );
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 2px solid var(--light-pink);
  position: sticky;
  top: 100px;
  box-shadow: var(--shadow);
  animation: slideInRight 0.6s ease-out;
}

.summary-box p {
  margin: var(--spacing-md) 0;
  font-size: 1.1rem;
  color: var(--text-dark);
}

.summary-box p strong {
  color: var(--primary-pink);
}

.total {
  font-size: 1.5rem !important;
  margin: var(--spacing-lg) 0 !important;
  border-top: 2px solid var(--light-pink);
  border-bottom: 2px solid var(--light-pink);
  padding: var(--spacing-md) 0 !important;
  text-align: center;
}

.total span {
  font-weight: 700;
  color: var(--primary-pink);
  font-size: 1.8rem;
}

.butoane {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 100%;
  margin-top: var(--spacing-lg);
}

.btn-checkout,
.btnEmpty {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  padding: var(--spacing-md);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1rem;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.btnEmpty {
  background: linear-gradient(
    135deg,
    rgba(255, 105, 180, 0.5),
    rgba(255, 182, 193, 0.5)
  );
  color: var(--primary-pink);
  border: 2px solid var(--primary-pink);
}

.btn-checkout:hover {
  background: linear-gradient(135deg, var(--dark-pink), var(--primary-pink));
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.btnEmpty:hover {
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  transform: translateY(-2px);
}

.empty-cart {
  text-align: center;
  padding: var(--spacing-xl);
  animation: fadeIn 0.6s ease-out;
}

.empty-cart p {
  font-size: 1.5rem;
  color: var(--text-light);
}

.btn-back {
  display: inline-block;
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md) var(--spacing-xl);
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  text-decoration: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.btn-back:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* Responsive */
@media (max-width: 1024px) {
  .cart-container {
    gap: var(--spacing-lg);
  }

  .summary-box {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .divCos {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .divCos h1 {
    font-size: 1.8rem;
  }

  .cart-content-wrapper {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .cart-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .cart-item {
    flex-wrap: wrap;
    padding: var(--spacing-md);
    gap: var(--spacing-md);
  }

  .item-img {
    width: 100px;
    height: 100px;
  }

  .item-details h4 {
    font-size: 1rem;
  }

  .variant {
    font-size: 0.85rem;
  }

  .price-qty {
    font-size: 1rem;
  }

  .summary-box {
    position: static;
    padding: var(--spacing-lg);
  }

  .bttns {
    gap: var(--spacing-md);
    flex-direction: column;
  }

  .btn-remove,
  .btn-increment,
  .btn-decrement {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .btn-checkout,
  .btnEmpty {
    padding: var(--spacing-md);
  }

  .empty-cart {
    padding: var(--spacing-lg) var(--spacing-md);
  }
}

@media (max-width: 600px) {
  .divCos h1 {
    font-size: 1.5rem;
  }

  .cart-content-wrapper {
    padding: var(--spacing-md);
  }

  .cart-item {
    padding: var(--spacing-md);
    gap: var(--spacing-sm);
  }

  .item-img {
    width: 80px;
    height: 80px;
  }

  .item-details h4 {
    font-size: 0.95rem;
  }

  .variant {
    font-size: 0.8rem;
  }

  .price-qty {
    font-size: 0.95rem;
  }

  .bttns {
    gap: var(--spacing-sm);
  }

  .btn-remove,
  .btn-increment,
  .btn-decrement {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }

  .summary-box {
    padding: var(--spacing-md);
  }

  .summary-box p {
    font-size: 0.95rem;
  }

  .total {
    font-size: 1.2rem !important;
  }

  .total span {
    font-size: 1.4rem;
  }

  .btn-checkout,
  .btnEmpty {
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }

  .empty-cart {
    padding: var(--spacing-md);
  }

  .empty-cart p {
    font-size: 1.1rem;
  }

  .btn-back {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .cart-page {
    min-height: 70vh;
  }

  .divCos h1 {
    font-size: 1.3rem;
  }

  .cart-content-wrapper {
    padding: var(--spacing-sm);
  }

  .cart-item {
    padding: var(--spacing-sm);
    gap: var(--spacing-xs);
  }

  .item-img {
    width: 70px;
    height: 70px;
  }

  .item-details h4 {
    font-size: 0.9rem;
  }

  .bttns {
    gap: 4px;
  }

  .btn-remove,
  .btn-increment,
  .btn-decrement {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }

  .summary-box {
    padding: var(--spacing-md);
  }

  .summary-box p {
    font-size: 0.85rem;
  }

  .total {
    font-size: 1rem !important;
  }

  .total span {
    font-size: 1.2rem;
  }

  .btn-checkout,
  .btnEmpty {
    padding: var(--spacing-sm);
    font-size: 0.8rem;
  }

  .btn-back {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.8rem;
  }
}
</style>
