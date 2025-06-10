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

    async addCategory(payload) {
      try {
        const response = await api.post('/category/add', payload)
        return response.data
      } catch (error) {
        throw new error(error)
      }
    },

    async updateCategory(id, payload) {
      try {
        const response = await api.put(`/category/edit/${id}`, payload)
        response.data
      } catch (error) {
        throw new error(error)
      }
    },

    async deleteCategory(id) {
      try {
        const response = await api.delete(`/category/delete/${id}`)
        return response.data
      } catch (error) {
        throw new error(error)
      }
    },
  },
})
