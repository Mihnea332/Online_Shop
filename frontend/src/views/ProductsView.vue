<template>
  <div class="products-page">
    <div class="search-box">
      <input
        class="text-box"
        type="text"
        v-model="searchQuery"
        placeholder="Cauta un produs..." />

      <select v-model="sortBy" class="sort-select">
        <option value="default">Sortează după preț</option>
        <option value="price-asc">Preț crescător</option>
        <option value="price-desc">Preț descrescător</option>
      </select>
    </div>

    <div v-if="filteredProducts.length > 0" class="productsGrid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card">
        <div class="image-container">
          <img
            :src="
              product.images[0].replace('/upload/', '/upload/f_auto,q_auto/')
            "
            :alt="product.name"
            @click="openGallery(product)"
            class="clickable-img" />
          <span class="category-badge">{{ product.name }}</span>
        </div>

        <div class="product-info">
          <h3 class="product-title">
            {{ product.variants[product.selectedVariantIndex].name }}
          </h3>

          <p class="price">
            {{ product.variants[product.selectedVariantIndex].price }} €
          </p>

          <div v-if="product.variants.length > 1" class="selection-area">
            <label class="select-label">Alege modelul:</label>
            <select
              v-model="product.selectedVariantIndex"
              class="variant-select">
              <option
                v-for="(v, index) in product.variants"
                :key="index"
                :value="index">
                {{ v.name }} - {{ v.price }}€
              </option>
            </select>
          </div>

          <button @click="addToCart(product)" class="btnAdd">
            Adaugă în coș
          </button>
        </div>
      </div>
    </div>

    <div v-else class="no-results">
      <p>Nu am găsit niciun produs care să corespundă căutării. 🌸</p>
    </div>

    <div
      v-if="isModalOpen"
      class="modal-overlay"
      @click.self="isModalOpen = false">
      <div class="modal-card">
        <button class="close-btn" @click="isModalOpen = false">&times;</button>

        <div class="modal-gallery">
          <button class="nav-arrow left" @click="prevImage">&#10094;</button>
          <img
            :src="selectedProduct.images[currentImageIndex]"
            class="modal-img"
            :class="{ 'is-zoomed': isImageZoomed }"
            @click="toggleImageZoom" />
          <button class="nav-arrow right" @click="nextImage">&#10095;</button>


          <div class="counter">
            {{ currentImageIndex + 1 }} / {{ selectedProduct.images.length }}
          </div>
        </div>

        <div class="modal-details">
          <h2>{{ selectedProduct.name }}</h2>
          <p class="zoom-hint">Atinge poza pentru zoom și detalii mai clare.</p>
          <p class="description">
            {{
              selectedProduct.description ||
              "Acest produs este lucrat manual cu atenție la detalii, folosind materiale de cea mai înaltă calitate."
            }}
          </p>
          <button @click="addToCart(selectedProduct)" class="btnModal">
            Adaugă în coș -
            {{
              selectedProduct.variants[selectedProduct.selectedVariantIndex]
                .price
            }}
            €
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { onMounted } from "vue";
import { toast } from "../utils/toast";

const cartStore = useCartStore();
const isModalOpen = ref(false);
const selectedProduct = ref(null);
const currentImageIndex = ref(0);
const isImageZoomed = ref(false);
const searchQuery = ref("");
const sortBy = ref("default");
const products = ref([]);
const loading = ref(true);

const fetchProducts = async () => {
  try {
    const response = await fetch(`/api/products`);
    if (response.ok) {
      const data = await response.json();

      products.value = data.map((product) => ({
        ...product,
        selectedVariantIndex: 0, // Fiecare produs pornește cu prima variantă selectată
      }));
    }
  } catch (error) {
    console.error("Eroare la preluarea produselor:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);

const openGallery = (product) => {
  selectedProduct.value = product;
  currentImageIndex.value = 0;
  isImageZoomed.value = false;
  isModalOpen.value = true;
};

const nextImage = () => {
  if (currentImageIndex.value < selectedProduct.value.images.length - 1) {
    currentImageIndex.value++;
  } else {
    currentImageIndex.value = 0;
  }

  isImageZoomed.value = false;
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  } else {
    currentImageIndex.value = selectedProduct.value.images.length - 1;
  }

  isImageZoomed.value = false;
};

const toggleImageZoom = () => {
  isImageZoomed.value = !isImageZoomed.value;
};

const getProductPrice = (product) => {
  const variant =
    product.variants?.[product.selectedVariantIndex] ?? product.variants?.[0];

  return Number(variant?.price ?? 0);
};

const filteredProducts = computed(() => {
  let result = [...products.value];

  if (searchQuery.value.trim() !== "") {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((product) =>
      product.name.toLowerCase().includes(query),
    );
  }

  if (sortBy.value === "price-asc") {
    result.sort((a, b) => getProductPrice(a) - getProductPrice(b));
  } else if (sortBy.value === "price-desc") {
    result.sort((a, b) => getProductPrice(b) - getProductPrice(a));
  }

  return result;
});

const addToCart = (product) => {
  cartStore.addToCart(product, product.selectedVariantIndex);
  toast.success(
    `Ai adaugat in cos: ${product.variants[product.selectedVariantIndex].name}`,
  );
};
</script>

<style scoped>
.products-page {
  min-height: 80vh;
  animation: fadeIn 0.6s ease-out;
}

/* Search Box */
.search-box {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  padding: var(--spacing-xl) var(--spacing-lg);
  background: linear-gradient(
    135deg,
    rgba(255, 182, 193, 0.3),
    rgba(255, 240, 245, 0.5)
  );
  border-bottom: 2px solid var(--light-pink);
}

.text-box {
  width: 100%;
  max-width: 500px;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--light-pink);
  border-radius: 50px;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  transition: var(--transition);
  background: var(--white);
  color: var(--text-dark);
}

.text-box:focus {
  border-color: var(--primary-pink);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
}

.text-box::placeholder {
  color: var(--text-light);
}

.sort-select {
  min-width: 220px;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--light-pink);
  border-radius: 50px;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  transition: var(--transition);
  background: var(--white);
  color: var(--text-dark);
  cursor: pointer;
}

.sort-select:focus {
  border-color: var(--primary-pink);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
}

/* Grid Layout */
.productsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 1400px;
  margin: 0 auto;
}

/* Card Produs */
.product-card {
  background: var(--white);
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  transition: var(--transition);
  box-shadow: var(--shadow);
  border: 2px solid transparent;
  overflow: hidden;
  animation: slideInUp 0.6s ease-out;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--light-pink);
  background: linear-gradient(
    135deg,
    rgba(255, 240, 245, 0.3),
    rgba(255, 255, 255, 0.8)
  );
}

.image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.image-container img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  cursor: pointer;
  transition: var(--transition);
  display: block;
}

.product-card:hover .image-container img {
  transform: scale(1.08);
}

.category-badge {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-sm);
}

.product-info {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-bottom: var(--spacing-sm);
  min-height: 2.5rem;
  font-weight: 600;
}

.price {
  font-weight: 700;
  color: var(--primary-pink);
  font-size: 1.5rem;
  margin: var(--spacing-sm) 0;
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.selection-area {
  margin: var(--spacing-md) 0;
  text-align: left;
  flex: 1;
}

.select-label {
  font-size: 0.85rem;
  color: var(--text-light);
  font-weight: 600;
  display: block;
  margin-bottom: var(--spacing-xs);
}

.variant-select {
  width: 100%;
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  border: 2px solid var(--light-pink);
  outline: none;
  background: var(--white);
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--text-dark);
  cursor: pointer;
  transition: var(--transition);
}

.variant-select:hover,
.variant-select:focus {
  border-color: var(--primary-pink);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
}

.btnAdd,
.btnModal {
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  border: none;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  font-size: 1rem;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  margin-top: auto;
}

.btnAdd:hover,
.btnModal:hover {
  background: linear-gradient(135deg, var(--dark-pink), var(--primary-pink));
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.btnAdd:active,
.btnModal:active {
  transform: translateY(0);
}

/* No Results */
.no-results {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-lg);
  color: var(--text-light);
  font-size: 1.2rem;
  animation: fadeIn 0.6s ease-out;
}

.no-results p {
  margin: 0;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease-out;
}

.modal-card {
  background: var(--white);
  width: 90%;
  max-width: 600px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  animation: slideInUp 0.4s ease-out;
}

.modal-gallery {
  position: relative;
  height: 400px;
  background: linear-gradient(135deg, var(--very-light-pink), var(--white));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.modal-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  animation: fadeIn 0.4s ease-out;
  cursor: zoom-in;
  transition: transform 0.28s ease, opacity 0.28s ease;
  touch-action: manipulation;
}

.modal-img.is-zoomed {
  transform: scale(1.8);
  cursor: zoom-out;
}

.modal-details {
  padding: var(--spacing-xl);
  text-align: center;
}

.modal-details h2 {
  color: var(--text-dark);
  margin-bottom: var(--spacing-md);
}

.description {
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.6;
  margin: var(--spacing-lg) 0;
}

.zoom-hint {
  color: var(--text-light);
  font-size: 0.85rem;
  margin: 0 0 var(--spacing-sm);
}

.counter {
  position: absolute;
  bottom: var(--spacing-md);
  right: var(--spacing-md);
  background: rgba(255, 105, 180, 0.9);
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: var(--transition);
  box-shadow: var(--shadow);
}

.nav-arrow:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: var(--shadow-lg);
}

.zoom-btn {
  position: absolute;
  bottom: var(--spacing-md);
  left: var(--spacing-md);
  background: rgba(255, 255, 255, 0.95);
  color: var(--primary-pink);
  border: none;
  border-radius: 50px;
  padding: 0.55rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  z-index: 11;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.zoom-btn:hover {
  background: var(--white);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.left {
  left: var(--spacing-md);
}

.right {
  right: var(--spacing-md);
}

.close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.95);
  color: var(--primary-pink);
  border: none;
  cursor: pointer;
  z-index: 100;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.close-btn:hover {
  background: var(--white);
  transform: scale(1.1);
  color: var(--dark-pink);
}

/* Responsive */
@media (max-width: 1024px) {
  .productsGrid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
  }

  .image-container img {
    height: 240px;
  }
}

@media (max-width: 768px) {
  .products-page {
    min-height: 60vh;
  }

  .search-box {
    padding: var(--spacing-lg) var(--spacing-md);
    background: linear-gradient(
      135deg,
      rgba(255, 182, 193, 0.2),
      rgba(255, 240, 245, 0.3)
    );
  }

  .text-box {
    max-width: 100%;
    width: 100%;
    padding: var(--spacing-md);
    font-size: 1rem;
  }

  .sort-select {
    width: 100%;
    min-width: 100%;
    padding: var(--spacing-md);
    font-size: 1rem;
  }

  .productsGrid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--spacing-md);
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .product-card {
    padding: var(--spacing-sm);
  }

  .image-container {
    margin-bottom: var(--spacing-md);
  }

  .image-container img {
    height: 180px;
  }

  .product-title {
    font-size: 1rem;
    min-height: 2rem;
  }

  .price {
    font-size: 1.2rem;
  }

  .modal-card {
    width: 95%;
    max-width: 95%;
    margin: 0 auto;
  }

  .modal-gallery {
    height: min(58vh, 320px);
  }

  .modal-img {
    max-width: 100%;
    max-height: 100%;
  }

  .modal-img.is-zoomed {
    transform: scale(1.45);
  }

  .nav-arrow {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .counter {
    bottom: var(--spacing-md);
    right: var(--spacing-md);
    font-size: 0.75rem;
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .zoom-btn {
    left: var(--spacing-md);
    bottom: var(--spacing-md);
    font-size: 0.75rem;
    padding: 0.45rem 0.75rem;
  }

  .modal-details {
    padding: var(--spacing-lg);
  }

  .modal-details h2 {
    font-size: 1.3rem;
  }

  .description {
    font-size: 0.9rem;
  }

  .zoom-hint {
    font-size: 0.8rem;
  }

  .btnModal {
    padding: var(--spacing-md);
    font-size: 0.9rem;
  }

  .no-results {
    padding: var(--spacing-lg) var(--spacing-md);
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .search-box {
    padding: var(--spacing-md);
  }

  .text-box {
    max-width: 100%;
    width: 100%;
    padding: var(--spacing-md);
    font-size: 0.95rem;
  }

  .sort-select {
    width: 100%;
    min-width: 100%;
    padding: var(--spacing-md);
    font-size: 0.95rem;
  }

  .productsGrid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    max-width: 100%;
  }

  .product-card {
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);
  }

  .image-container img {
    height: 150px;
  }

  .product-title {
    font-size: 0.9rem;
    min-height: auto;
    margin-bottom: var(--spacing-xs);
  }

  .price {
    font-size: 1rem;
    margin: var(--spacing-xs) 0;
  }

  .category-badge {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.65rem;
  }

  .variant-select {
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }

  .select-label {
    font-size: 0.8rem;
  }

  .btnAdd {
    padding: var(--spacing-sm);
    font-size: 0.85rem;
    margin-top: auto;
  }

  .modal-card {
    width: 98%;
    max-width: 98%;
  }

  .modal-gallery {
    height: min(52vh, 270px);
  }

  .modal-details {
    padding: var(--spacing-md);
  }

  .modal-details h2 {
    font-size: 1.1rem;
  }

  .description {
    font-size: 0.85rem;
    margin: var(--spacing-md) 0;
  }

  .zoom-hint {
    font-size: 0.75rem;
    margin-bottom: var(--spacing-xs);
  }

  .btnModal {
    padding: var(--spacing-sm);
    font-size: 0.8rem;
  }

  .nav-arrow {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }

  .left {
    left: var(--spacing-sm);
  }

  .right {
    right: var(--spacing-sm);
  }

  .counter {
    bottom: var(--spacing-sm);
    right: var(--spacing-sm);
    font-size: 0.7rem;
    padding: 4px 8px;
  }

  .close-btn {
    width: 36px;
    height: 36px;
    font-size: 1.5rem;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
  }

  .no-results {
    padding: var(--spacing-md);
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .products-page {
    min-height: 50vh;
  }

  .search-box {
    padding: var(--spacing-sm);
  }

  .text-box {
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }

  .sort-select {
    width: 100%;
    min-width: 100%;
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }

  .productsGrid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 6px;
    padding: var(--spacing-sm);
  }

  .product-card {
    padding: 6px;
  }

  .image-container img {
    height: 130px;
  }

  .product-title {
    font-size: 0.8rem;
  }

  .price {
    font-size: 0.9rem;
  }

  .btnAdd {
    padding: 6px;
    font-size: 0.75rem;
  }

  .modal-card {
    width: 100%;
    max-width: 100%;
    border-radius: var(--radius-md);
  }

  .modal-gallery {
    height: min(48vh, 230px);
  }

  .modal-details {
    padding: var(--spacing-md);
  }

  .modal-details h2 {
    font-size: 1rem;
  }

  .description {
    font-size: 0.8rem;
    margin: var(--spacing-sm) 0;
  }

  .zoom-hint {
    font-size: 0.72rem;
  }

  .btnModal {
    padding: var(--spacing-sm);
    font-size: 0.75rem;
    width: 100%;
  }

  .zoom-btn {
    left: var(--spacing-sm);
    bottom: var(--spacing-sm);
    font-size: 0.7rem;
    padding: 0.4rem 0.65rem;
  }

  .nav-arrow {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }

  .close-btn {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
  }
}
</style>
