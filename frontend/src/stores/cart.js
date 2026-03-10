import { defineStore } from "pinia";
export const useCartStore=defineStore('cart',{
    state:()=>({
        items:[]
    }),
    actions:{
addToCart(product,variantIndex=0){
    const variant=product.variants[variantIndex];
    const existingItem = this.items.find(item => 
        item.id === product.id && item.variantName === variant.name
      );
    if(existingItem)existingItem.quantity++
    else this.items.push({
        id:product.id,
        name:product.name,
        variantName:variant.name,
        price:variant.price,
        quantity:1
    })
},

    },
getters: {
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    }
}
})
