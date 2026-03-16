import { defineStore } from "pinia";
import CryptoJS from "crypto-js";
const KEY="banane123"
export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  actions: {
    persistData() {
      const rawData=JSON.stringify(this.items);
      const encryptedData=CryptoJS.AES.encrypt(rawData,KEY).toString()
      localStorage.setItem("cart_items",encryptedData);
    },
    loadData(){
      const encryptedData=localStorage.getItem("cart_items")
      if(encryptedData)
      {
        try {
          const bytes=CryptoJS.AES.decrypt(encryptedData,KEY)
          const decryptedData=bytes.toString(CryptoJS.enc.Utf8)
          if(decryptedData)
          this.items=JSON.parse(decryptedData)
        } catch (error) {
          console.error("Corrupted data")
          this.items=[]
          localStorage.removeItem("cart_items")
        }
      }
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
      this.persistData();
    },
    removeFromCart(index) {
      this.items.splice(index, 1);
      this.persistData();
    },
    incrementProduct(index) {
      this.items[index].quantity++;
      this.persistData();
    },
    decrementProduct(index) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity--;
        this.persistData();
      } else {
        this.removeFromCart(index);
      }
    },
    emptyCart() {
      this.items = [];
      this.persistData();
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
