import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],
  }),
  persist: true,
  actions: {
    async getAllCategories() {
      try {
        const response = await api.get('/category')
        const { data } = response.data
        this.categories = data
        return response.data
      } catch (error) {
        throw new error(error)
      }
    },

    async getCategoryById(id) {
      try {
        const response = await api.get(`/category/${id}`)
        console.log(response)
      } catch (error) {
        throw new error(error)
      }
    },
  },
})
