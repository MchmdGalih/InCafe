<template>
  <header class="sticky inset-0 z-10">
    <div class="navbar bg-amber-900 py-4 text-white">
      <div class="flex-1">
        <a class="btn btn-ghost text-2xl font-primary">InCafe</a>
      </div>
      <div class="flex gap-x-4">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle"
          @click="$emit('toggle-cart')"
        >
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item">0</span>
          </div>
        </div>

        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black font-secondary"
          >
            <li>
              <RouterLink to="/" class="justify-between">
                <span>Profile</span>
                <p v-if="isAuthenticated">{{ store.currentUser.username }}</p>
              </RouterLink>
            </li>
            <li v-if="isAuthenticated && store?.currentUser?.role === 'admin'">
              <RouterLink to="/">Dashboard</RouterLink>
            </li>
            <li v-if="isAuthenticated">
              <button @click="handlerLogout" class="text-red-500 hover:underline">Logout</button>
            </li>
            <li v-else><RouterLink to="/sign-in">Login</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const store = useAuthStore()
const { isAuthenticated } = storeToRefs(store)

defineEmits(['toggle-cart'])

const handlerLogout = () => {
  return store.logout()
}
</script>
