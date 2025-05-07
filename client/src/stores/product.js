import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
  }),

  actions: {
    async getAllProducts() {
      try {
        const response = await api.get('/product')
        const { data } = response.data
        this.products = data.filter((product) => product.stock !== 0)
      } catch (error) {
        throw new Error(error)
      }
    },
  },
})
