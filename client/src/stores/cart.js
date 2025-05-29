import { defineStore } from 'pinia'

export const useStoreCart = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  actions: {
    addItem(product, qty = 1) {
      const existProduct = this.items.find((item) => item.id === product.id)
      if (existProduct) {
        existProduct.qty += qty
      } else {
        this.items.push({
          ...product,
          qty: qty,
        })
      }
    },
  },
})
