import AdminLayout from '@/layouts/AdminLayout.vue'
import CategoriesView from '@/views/admin/category/Categories/CategoriesView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
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
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: DashboardView,
        },
        {
          path: 'users',
          name: 'dashboard-users',
          component: DashboardView,
        },
        {
          path: 'categories',
          name: 'dashboard-categories',
          component: CategoriesView,
        },
      ],
    },
  ],
})

export default router
