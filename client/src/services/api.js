import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use(
  function (config) {
    const token = useAuthStore()?.token
    const alwaysAuthEndpoints = ['/profile', '/role']

    const restrictedEndpoints = ['/category', '/user', '/order']

    let requiresAuth = alwaysAuthEndpoints.some((endpoint) => config.url.startsWith(endpoint))

    if (!requiresAuth) {
      requiresAuth = restrictedEndpoints.some(
        (endpoint) => config.url.startsWith(endpoint) && config.method.toLowerCase() !== 'get',
      )
    }

    if (requiresAuth && token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)
