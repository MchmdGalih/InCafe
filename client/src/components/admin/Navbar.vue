<template>
  <div class="flex justify-between items-center">
    <button class="lg:hidden text-white cursor-pointer" @click="toggleSidebar">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
    </button>

    <h2 class="text-xl font-secondary font-semibold text-white">
      Welcome Back <span>{{ profile.firstName }} </span>
    </h2>
    <div class="flex items-center space-x-8">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-lg btn-circle avatar">
          <div class="w-20 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              :src="
                profile?.image ||
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              "
            />
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <RouterLink to="/profile" class="justify-between"> Profile </RouterLink>
          </li>
          <li>
            <button @click="handlerLogout" class="text-red-500 hover:underline">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const profileStore = useProfileStore()

const { profile } = storeToRefs(profileStore)

const emits = defineEmits('toggle-sidebar')

const toggleSidebar = () => {
  emits('toggle-sidebar')
}

const handlerLogout = () => {
  return authStore.logout()
}
</script>
