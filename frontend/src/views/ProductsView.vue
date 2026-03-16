<template>
  <div class="products-page">
    <div class="search-box">
      <input
        class="text-box"
        type="text"
        v-model="searchQuery"
        placeholder="Cauta un produs..."
      />
    </div>

    <div v-if="filteredProducts.length > 0" class="productsGrid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <div class="image-container">
          <img
            :src="product.images[0]"
            :alt="product.name"
            @click="openGallery(product)"
            class="clickable-img"
          />
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
              class="variant-select"
            >
              <option
                v-for="(v, index) in product.variants"
                :key="index"
                :value="index"
              >
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
      @click.self="isModalOpen = false"
    >
      <div class="modal-card">
        <button class="close-btn" @click="isModalOpen = false">&times;</button>

        <div class="modal-gallery">
          <button class="nav-arrow left" @click="prevImage">&#10094;</button>
          <img
            :src="selectedProduct.images[currentImageIndex]"
            class="modal-img"
          />
          <button class="nav-arrow right" @click="nextImage">&#10095;</button>

          <div class="counter">
            {{ currentImageIndex + 1 }} / {{ selectedProduct.images.length }}
          </div>
        </div>

        <div class="modal-details">
          <h2>{{ selectedProduct.name }}</h2>
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

const cartStore = useCartStore();
const isModalOpen = ref(false);
const selectedProduct = ref(null);
const currentImageIndex = ref(0);
const searchQuery = ref("");

const products = ref([
  {
    id: 1,
    name: "Invitatii botez/nunta",
    selectedVariantIndex: 0,
    description: "La modelul de invitație se pot adăuga contracost plicuri asortate și sigilii de ceară.",
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
    description: "Set personalizat pentru aniversări. Tricoul este din bumbac 100%.",
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
    name: "Set mot personalizat",
    selectedVariantIndex: 0,
    description: "Set complet pentru tăierea moțului, personalizat cu tematica evenimentului.",
      variants: [{ name: "Set mot personalizat", price: 60 }],

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
    name: "Pahare personalizate botez/nunta",
    selectedVariantIndex: 0,
    description: "Pahare pictate manual sau decorate cu vinil premium pentru miri și nași.",
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
    name: "Trusou botez personalizat",
    selectedVariantIndex: 0,
    description: "Trusou de botez complet, brodat cu numele copilului și data evenimentului.",
      variants: [{ name: "Trusou botez personalizat", price: 145 }],

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
    name: "Marturii nunta/botez",
    selectedVariantIndex: 0,
    description: "Mărturii deosebite pentru a le mulțumi invitaților într-un mod dulce sau util.",
    variants: [

      { name: "Marturie botez/nunta magnet", price: 2 },

      { name: "Marturie botez/nunta sapun", price: 2 },

      { name: "Marturie botez/nunta bombonele", price: 2 },

      { name: "Marturie botez/nunta miere", price: 2 },

      { name: "Marturie botez/nunta Nutella", price: 2 },

      { name: "Marturie botez/nunta rasina", price: 2 },

      { name: "Marturie botez/nunta lumanare", price: 2 },

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
    name: "Seturi personalizate cadou",
    selectedVariantIndex: 0,
    description: "Cutii cadou elegante pregătite pentru a fi oferite nașilor sau părinților.",
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
    name: "Lumanari botez/nunta",
    selectedVariantIndex: 0,
    description: "Lumânări de ceară naturală sau sculptate, decorate manual.",
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
    currentImageIndex.value = 0;
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
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const addToCart = (product) => {
  cartStore.addToCart(product, product.selectedVariantIndex);
  alert(`Ai adaugat in cos: ${product.variants[product.selectedVariantIndex].name}`);
};
</script>

<style scoped>
/* Grid Layout */
.productsGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 40px 20px;
}

/* Card Produs */
.product-card {
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 15px;
  width: 260px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(255, 182, 193, 0.3);
}

.image-container {
  position: relative;
  width: 100%;
}

.product-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
}

.category-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #ffb6c1;
  text-transform: uppercase;
}

.product-info {
  text-align: center;
  padding-top: 15px;
}

.product-title {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 5px;
  min-height: 2.8rem;
}

.price {
  font-weight: bold;
  color: #ff69b4;
  font-size: 1.2rem;
  margin: 5px 0;
}

.selection-area {
  margin-bottom: 15px;
  text-align: left;
}

.select-label {
  font-size: 0.75rem;
  color: #999;
  font-weight: bold;
}

.variant-select {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ffb6c1;
  outline: none;
  background: #fffafa;
}

.btnAdd, .btnModal {
  background: #333;
  color: #ffb6c1;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  transition: 0.3s;
}

.btnAdd:hover, .btnModal:hover {
  background: #000;
  color: white;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-card {
  background: white;
  width: 90%;
  max-width: 450px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal-gallery {
  position: relative;
  height: 300px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-details {
  padding: 25px;
  text-align: center;
}

.description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 15px 0;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.7);
  border: none;
  width: 40px; height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
}

.left { left: 10px; }
.right { right: 10px; }

.close-btn {
  position: absolute;
  top: 10px; right: 15px;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 100;
}

.search-box {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.text-box {
  width: 300px;
  padding: 12px 25px;
  border: 2px solid #ffb6c1;
  border-radius: 50px;
  outline: none;
}
</style>