<template>
  <div class="products-page">
    <div class="search-box">
      <input
        class="text-box"
        type="text"
        v-model="searchQuery"
        placeholder="Cauta un produs..." />
    </div>

    <div v-if="filteredProducts.length > 0" class="productsGrid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card">
        <img
          :src="product.images[0]"
          :alt="product.name"
          @click="openGallery(product)"
          class="clickable-img" />

        <h3>{{ product.variants[product.selectedVariantIndex].name }}</h3>
        <p class="price">
          {{ product.variants[product.selectedVariantIndex].price }} €
        </p>

        <select
          v-if="product.variants.length > 1"
          v-model="product.selectedVariantIndex"
          class="variant-select">
          <option
            v-for="(v, index) in product.variants"
            :key="index"
            :value="index">
            {{ v.name }} - {{ v.price }}€
          </option>
        </select>

        <button @click="addToCart(product)" class="btnAdd">
          Adauga in cos
        </button>
      </div>
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
            class="modal-img" />
          <button class="nav-arrow right" @click="nextImage">&#10095;</button>

          <div class="counter">
            {{ currentImageIndex + 1 }} / {{ selectedProduct.images.length }}
          </div>
        </div>

        <div class="modal-details">
          <h2>{{ selectedProduct.name }}</h2>
          <p class="description">
            {{ selectedProduct.description }}
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
const cartStore = useCartStore();
const isModalOpen = ref(false);
const selectedProduct = ref(null);
const currentImageIndex = ref(0);
const searchQuery = ref("");

const products = ref([
  {
    id: 1,
    name: "Invitatii",
    selectedVariantIndex: 0,
    variants: [
      { name: "Invitatie nunta", price: 2 },

      { name: "Invitație botez", price: 2 },
      { name: "Invitație aniversare", price: 2 },
    ],
    images: [
      "/Invitatii/invitatii0.jpg",
      "/Invitatii/invitatii1.jpg",
      "/Invitatii/invitatii2.jpg",
      "/Invitatii/invitatii3.jpg",
      "/Invitatii/invitatii4.jpg",
      "/Invitatii/invitatii5.jpg",
      "/Invitatii/invitatii6.jpg",
    ],
    description: "La model de invitatie se pot adauga contracost plicuri.",
  },
  {
    id: 2,
    name: "Tricou/Fusta",
    selectedVariantIndex: 0,
    variants: [
      { name: "Tricou Personalizat", price: 11 },
      { name: "Fustita", price: 20 },
    ],
    images: [
      "/Tricouri/tricouri0.jpg",
      "/Tricouri/tricouri1.jpg",
      "/Tricouri/tricouri2.jpg",
      "/Tricouri/tricouri3.jpg",
      "/Tricouri/tricouri4.jpg",
      "/Tricouri/tricouri5.jpg",
    ],
  },
  {
    id: 3,
    name: "Set mot",
    selectedVariantIndex: 0,
    variants: [{ name: "Set mot", price: 60 }],
    images: [
      "/Seturi mot/set_mot0.jpg",
      "/Seturi mot/set_mot1.jpg",
      "/Seturi mot/set_mot2.jpg",
      "/Seturi mot/set_mot3.jpg",
      "/Seturi mot/set_mot4.jpg",
      "/Seturi mot/set_mot5.jpg",
      "/Seturi mot/set_mot6.jpg",
    ],
  },
  {
    id: 4,
    name: "Pahare",
    selectedVariantIndex: 0,
    variants: [
      { name: "Pahar nunta", price: 10 },
      { name: "Pahar botez", price: 10 },
    ],
    images: [
      "/Pahare/pahare0.jpg",
      "/Pahare/pahare1.jpg",
      "/Pahare/pahare2.jpg",
      "/Pahare/pahare3.jpg",
      "/Pahare/pahare4.jpg",
      "/Pahare/pahare5.jpg",
      "/Pahare/pahare6.jpg",
      "/Pahare/pahare7.jpg",
    ],
  },
  {
    id: 5,
    name: "Trusou",
    selectedVariantIndex: 0,
    variants: [{ name: "Trusou", price: 145 }],
    images: [
      "/Trusouri/trusouri0.jpg",
      "/Trusouri/trusouri1.jpg",
      "/Trusouri/trusouri2.jpg",
      "/Trusouri/trusouri3.jpg",
      "/Trusouri/trusouri4.jpg",
      "/Trusouri/trusouri5.jpg",
      "/Trusouri/trusouri6.jpg",
      "/Trusouri/trusouri7.jpg",
      "/Trusouri/trusouri8.jpg",
      "/Trusouri/trusouri9.jpg",
      "/Trusouri/trusouri10.jpg",
      "/Trusouri/trusouri11.jpg",
      "/Trusouri/trusouri12.jpg",
      "/Trusouri/trusouri13.jpg",
      "/Trusouri/trusouri14.jpg",
    ],
  },
  {
    id: 6,
    name: "Marturii",
    selectedVariantIndex: 0,
    variants: [
      { name: "Marturie magnet", price: 2 },
      { name: "Marturie sapun", price: 2 },
      { name: "Marturie bombonele", price: 2 },
      { name: "Marturie miere", price: 2 },
      { name: "Marturie Nutella", price: 2 },
      { name: "Marturie rasina", price: 2 },
      { name: "Marturie lumanare", price: 2 },
    ],
    images: [
      "/Marturii/marturii0.jpg",
      "/Marturii/marturii1.jpg",
      "/Marturii/marturii2.jpg",
      "/Marturii/marturii3.jpg",
      "/Marturii/marturii4.jpg",
      "/Marturii/marturii5.jpg",
      "/Marturii/marturii6.jpg",
      "/Marturii/marturii7.jpg",
      "/Marturii/marturii8.jpg",
      "/Marturii/marturii9.jpg",
      "/Marturii/marturii10.jpg",
      "/Marturii/marturii11.jpg",
    ],
  },
  {
    id: 7,
    name: "Seturi cadou",
    selectedVariantIndex: 0,
    variants: [
      { name: "Set cani", price: 55 },
      { name: "Set Sharidan's, pahare", price: 70 },
      { name: "Set licheni si plexiglas", price: 55 },
      { name: "Set Jack, Sharidan's,pahare", price: 85 },
      { name: "Set licheni, Jack, plexiglas", price: 100 },
      { name: "Set Jack, pahare si tricou", price: 80 },
      { name: "Set rama foto, papucei, licheni", price: 40 },
    ],
    images: [
      "/Seturi/seturi0.jpg",
      "/Seturi/seturi2.jpg",
      "/Seturi/seturi3.jpg",
      "/Seturi/seturi1.jpg",
      "/Seturi/seturi4.jpg",
      "/Seturi/seturi5.jpg",
      "/Seturi/seturi6.jpg",
      "/Seturi/seturi7.jpg",
      "/Seturi/seturi8.jpg",
      "/Seturi/seturi9.jpg",
      "/Seturi/seturi10.jpg",
      "/Seturi/seturi11.jpg",
      "/Seturi/seturi12.jpg",
      "/Seturi/seturi13.jpg",
      "/Seturi/seturi14.jpg",
      "/Seturi/seturi15.jpg",
      "/Seturi/seturi16.jpg",
    ],
  },
  {
    id: 8,
    name: "Lumanari",
    selectedVariantIndex: 0,
    variants: [
      { name: "Lumanare nunta", price: 45 },

      { name: "Lumanare Botez", price: 45 },
    ],
    images: [
      "/Lumanari/lumanari0.jpg",
      "/Lumanari/lumanari1.jpg",
      "/Lumanari/lumanari2.jpg",
      "/Lumanari/lumanari3.jpg",
      "/Lumanari/lumanari4.jpg",
      "/Lumanari/lumanari5.jpg",
      "/Lumanari/lumanari6.jpg",
      "/Lumanari/lumanari7.jpg",
      "/Lumanari/lumanari8.jpg",
      "/Lumanari/lumanari9.jpg",
      "/Lumanari/lumanari10.jpg",
      "/Lumanari/lumanari11.jpg",
    ],
  },
]);

const openGallery = (product) => {
  selectedProduct.value = product;
  currentImageIndex.value = 0;
  isModalOpen.value = true;
};

const nextImage = () => {
  if (currentImageIndex.value < selectedProduct.value.images.length - 1) {
    currentImageIndex.value++;
  } else {
    currentImageIndex.value = 0; // REPARAT: Adaugat .value
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  } else {
    currentImageIndex.value = selectedProduct.value.images.length - 1;
  }
};

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const addToCart = (product) => {
  cartStore.addToCart(product, product.selectedVariantIndex);
  alert(
    `Ai adaugat in cos: ${product.variants[product.selectedVariantIndex].name}`,
  );
};
</script>

<style scoped>
.modal-details {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
}
.btnModal {
  background: #333;
  color: pink;
  border: none;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.text-box {
  width: 30%;
  padding: 12px 45px; /* Spațiu pentru lupă în stânga și X în dreapta */
  font-size: 1rem;
  border: 2px solid #ffb6c1; /* Rozul tău specific */
  border-radius: 50px; /* Formă de pastilă */
  outline: none;
  background-color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(255, 182, 193, 0.1);
}
.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
.variant-select {
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ffb6c1;
  width: 80%;
  cursor: pointer;
}

.productsGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}
.product-card {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 250px;
}
.product-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
}
.price {
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}
.btnAdd {
  background: #333;
  color: pink;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.btnAdd:hover {
  transform: scale(1.05);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  position: relative;
}
.modal-img {
  max-width: 80vw;
  max-height: 80vh;
}
.nav-arrow {
  position: absolute;
  top: 50%;
  color: white;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}
.left {
  left: -50px;
}
.right {
  right: -50px;
}
.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}
</style>
