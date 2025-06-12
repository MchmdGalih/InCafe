import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useRoleStore = defineStore('roles', {
  state: () => ({
    roles: [],
  }),

  actions: {
    async getAllRole() {
      try {
        const response = await api.get('/role')
        this.roles = response.data.data

        return response.data
      } catch (error) {
        throw new error(error)
      }
    },

    async getRoleById(id) {
      try {
        const response = await api.get(`/role/${id}`)
        return response.data
      } catch (error) {
        throw new error(error)
      }
    },

    async addRole(payload) {
      try {
        const response = await api.post('/role/add', payload)
        return response.data
      } catch (error) {
        throw new error(error)
      }
    },

    async deleteRole(id) {
      try {
        const response = await api.delete(`/role/delete/${id}`)
        return response.data
      } catch (error) {
        throw new error(error)
      }
    },
  },
})
