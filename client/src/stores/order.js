import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
  }),

  actions: {
    async fetchAllOrder() {
      try {
        const response = await api.get('/order')
        console.log('response store', response.data)
      } catch (error) {
        console.log('test', error)
      }
    },

    async createOrder(payload) {
      try {
        const response = await api.post('/order', payload)
        return response.data.data
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteOrder(id) {
      try {
        const response = await api.delete(`/order/delete/${id}`)
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },
  },
})
