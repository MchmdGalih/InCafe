import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeViews.vue'),
    },

    {
      path: '/product/:id',
      name: 'detail-product',
      component: () => import('@/views/product/DetailProductView.vue'),
    },

    {
      path: '/sign-in',
      name: 'login',
      component: () => import('@/views/auth/SigninViews.vue'),
    },
    {
      path: '/sign-up',
      name: 'register',
      component: () => import('@/views/auth/SignupViews.vue'),
    },

    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/user/ProfileView.vue'),
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/admin/DashboardView.vue'),
    },
  ],
})

export default router
