import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
  }),

  actions: {
    async getAllProducts(query = {}) {
      const params = {}

      if (query.category) {
        params.category = query.category
      }

      try {
        const response = await api.get('/product', { params })
        const { data } = response.data
        this.products = data.filter((product) => product.stock > 0)
        return response
      } catch (error) {
        throw new Error(error)
      }
    },

    async getProductById(id) {
      try {
        const response = await api.get(`/product/${id}`)
        const { data } = response.data
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
  },
})
