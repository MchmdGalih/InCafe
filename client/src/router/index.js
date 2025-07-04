import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAuthStore } from '@/stores/auth'
import CategoriesView from '@/views/admin/category/Categories/CategoriesView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import OrderView from '@/views/admin/order/OrderView.vue'
import ProductView from '@/views/admin/product/ProductView.vue'
import RolesView from '@/views/admin/roles/RolesView.vue'
import DetailUser from '@/views/admin/users/DetailUser.vue'
import UsersView from '@/views/admin/users/UsersView.vue'
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
      meta: { isGuest: true },
    },
    {
      path: '/sign-up',
      name: 'register',
      component: () => import('@/views/auth/SignupViews.vue'),
      meta: { isGuest: true },
    },

    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/user/ProfileView.vue'),
      meta: { requiredAuth: true },
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: AdminLayout,
      meta: { requiredAuth: true, role: 'admin' },
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: DashboardView,
        },
        {
          path: 'users',
          name: 'dashboard-users',
          component: UsersView,
        },
        {
          path: 'user/:id',
          name: 'dashboard-user-detail',
          component: DetailUser,
        },
        {
          path: 'categories',
          name: 'dashboard-categories',
          component: CategoriesView,
        },
        {
          path: 'roles',
          name: 'dashboard-roles',
          component: RolesView,
        },
        {
          path: 'order',
          name: 'dashboard-order',
          component: OrderView,
        },
        {
          path: 'product',
          name: 'dashboard-product',
          component: ProductView,
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiredAuth && !auth.isAuthenticated) {
    next({ path: '/sign-in' })
  } else if (to.meta.isGuest && auth.isAuthenticated) {
    next({ path: '/' })
  } else if (to.meta.role === 'admin' && auth.currentUser.role !== 'admin') next({ path: '/' })
  else {
    next()
  }
})
export default router
