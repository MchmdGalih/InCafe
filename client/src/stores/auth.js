import { api } from '@/services/api'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const router = useRouter()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    currentUser: null,
    isAuthenticated: false,
  }),
  persist: true,
  actions: {
    async login(payload) {
      try {
        const response = await api.post('/auth/signin', payload)

        const {
          data: { accessToken, user },
        } = response.data
        this.token = accessToken
        this.currentUser = user
        this.isAuthenticated = true

        return response
      } catch (error) {
        const errorMessage = error?.response?.data?.error
        throw new Error(errorMessage)
      }
    },

    async register(payload) {
      try {
        const response = await api.post('/auth/signup', payload)
        return response.data
      } catch (error) {
        throw new Error(error)
      }
    },

    logout() {
      toast.success('Logout success', {
        onClose: () => router.replace('/sign-in'),
      })
      this.$reset()
    },
  },
})
