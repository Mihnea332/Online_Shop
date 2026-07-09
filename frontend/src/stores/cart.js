import { defineStore } from "pinia";
import CryptoJS from "crypto-js";

// Sfat: Într-un proiect real, folosește o variabilă de mediu pentru cheie
const KEY = "banane123";
const STORAGE_KEY = "cart_items";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),

  actions: {
    loadData() {
      const encryptedData = localStorage.getItem(STORAGE_KEY);
      if (encryptedData) {
        try {
          const bytes = CryptoJS.AES.decrypt(encryptedData, KEY);
          const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          if (decryptedData) {
            this.items = JSON.parse(decryptedData);
          }
        } catch (error) {
          console.error("Date corupte în localStorage, resetăm coșul.");
          this.emptyCart();
        }
      }
    },

    // Funcție internă de criptare
    persistData() {
      const rawData = JSON.stringify(this.items);
      const encryptedData = CryptoJS.AES.encrypt(rawData, KEY).toString();
      localStorage.setItem(STORAGE_KEY, encryptedData);
    },

    addToCart(product, variantIndex = 0) {
      const variant = product.variants[variantIndex];
      const existingItem = this.items.find(
        (item) => item.id === product.id && item.variantName === variant.name,
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          variantName: variant.name,
          price: variant.price,
          image: product.images[0],
          quantity: 1,
        });
      }
    },

    removeFromCart(index) {
      this.items.splice(index, 1);
    },

    incrementProduct(index) {
      this.items[index].quantity++;
    },

    decrementProduct(index) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity--;
      } else {
        this.removeFromCart(index);
      }
    },

    emptyCart() {
      this.items = [];
    },
  },

  getters: {
    totalPrice: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),
  },
});
