import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: {},
  }),
  persist: true,
  actions: {
    async getProfile(id) {
      try {
        const response = await api.get(`/profile/${id}`)
        this.profile = response.data.data
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async createOrUpdate(id, payload) {
      try {
        const response = await api.put(`/profile/${id}`, payload)
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },
  },
})
