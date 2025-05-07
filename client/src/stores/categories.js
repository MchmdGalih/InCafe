import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],
  }),

  actions: {
    async getAllCategories() {
      try {
        const response = await api.get('/category')
        const { data } = response.data
        this.categories = data

        return response
      } catch (error) {
        console.log(error)
      }
    },
  },
})
