import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  actions: {

    async addUser(payload) {
      try {
        const response = await api.post('/user/add', payload)
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async getAllUsers() {
      try {
        const response = await api.get('/user')
        this.users = response.data.data
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async getUserById(id) {
      try {
        const response = await api.get(`/user/${id}`)
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async updateUser(id, payload) {
      try {
        const response = await api.put(`/user/edit/${id}`, payload)
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteUser(id) {
      try {
        const response = await api.delete(`/user/delete/${id}`)
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },
  },
})
