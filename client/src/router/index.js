import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeViews.vue'),
    },
    {
      path: '/sign-in',
      name: 'login',
      component: () => import('../views/auth/SigninViews.vue'),
    },
  ],
})

export default router
