import { defineStore } from 'pinia'

export const useStoreCart = defineStore('cart', {
  state: () => ({
    carts: [],
  }),

  actions: {
    addItem(product, qty = 1) {
      const existProduct = this.carts.find((item) => item.id === product.id)
      if (existProduct) {
        existProduct.qty += qty
      } else {
        this.carts.push({
          ...product,
          qty: qty,
          selected: false,
        })
      }
    },

    increaseQty(productId) {
      const item = this.carts.find((p) => p.id === productId)
      if (item) {
        item.qty++
      }
    },

    decreaseQty(productId) {
      const item = this.carts.find((p) => p.id === productId)
      if (item && item.qty > 1) {
        item.qty--
      }
    },
    removeCart(id) {
      this.carts = this.carts.filter((item) => item.id !== id)
    },

    clearCarts() {
      this.carts = []
    },
  },
})
