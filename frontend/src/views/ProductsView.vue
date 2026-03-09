<template>
  <div class="products-page">
    <div class="text">
      <h2>Produsele noastre!</h2>
    </div>
    <div class="search-box">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Cauta un produs..." />
    </div>
    <div v-if="filteredProducts.length > 0" class="productsGrid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p class="price">{{ product.price }} €</p>
        <button @click="addToCart(product)" class="btnAdd">
          Adauga in cos
        </button>
      </div>
    </div>
    <div v-else class="no-result">
      <p>Nu am gasit niciun produs care sa contina {{ searchQuery }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
const products = ref([
  {
    id: 1,
    name: "Invitatie nunta",
    price: 12,
    image: "/Invitatii/invitatii0.jpg",
  },
  {
    id: 2,
    name: "Marturie",
    price: 7,
    image: "/Marturii botez/marturii_botez0.jpg",
  },
  {
    id: 2,
    name: "Marturie",
    price: 7,
    image: "/Marturii botez/marturii_botez0.jpg",
  },
  {
    id: 2,
    name: "Marturie",
    price: 7,
    image: "/Marturii botez/marturii_botez0.jpg",
  },
  {
    id: 2,
    name: "Marturie",
    price: 7,
    image: "/Marturii botez/marturii_botez0.jpg",
  },
  {
    id: 2,
    name: "Marturie",
    price: 7,
    image: "/Marturii botez/marturii_botez0.jpg",
  },
  {
    id: 2,
    name: "Marturie",
    price: 7,
    image: "/Marturii botez/marturii_botez0.jpg",
  },
  {
    id: 2,
    name: "Marturie",
    price: 7,
    image: "/Marturii botez/marturii_botez0.jpg",
  },
]);
const searchQuery = ref("");
const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});
const addToCart = (product) => {
  alert(`Ai adaugat in cos ${product.name}`);
};
</script>
<style scoped>
.productsGrid {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  border: solid red;
  border-radius: 20px;
  padding: 10px;
}
.product-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 2px solid red;
  border-radius: 10px;
  padding-bottom: 10px;
}
.product-card img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
}
.search-box input {
  border-radius: 10px;
  width: 200px;
  height: 30px;
}
.btnAdd {
  background-color: #333;
  border-radius: 10px;
  color: pink;
  cursor: pointer;
}
.btnAdd:hover {
  transform: scale(1.1);
}
.text {
  display: flex;
  justify-content: center;
  font-weight: bold;
}
</style>
