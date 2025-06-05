<template>
  <div class="flex min-h-screen">
    <!-- Sidebar (Hidden on Mobile) -->
    <aside
      :class="{ '-translate-x-full': !isSidebarOpen }"
      class="w-60 h-full duration-300 ease-in-out fixed lg:translate-x-0 transform transition-transform z-30 bg-amber-800 border-r border-amber-700"
    >
      <Sidebar />
    </aside>

    <!-- Overlay for Mobile (Hidden on Desktop) -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="bg-black/50 fixed inset-0 lg:hidden z-20"
    />

    <div class="flex flex-1 flex-col overflow-hidden lg:ml-60">
      <header class="py-4 px-4 shadow border-b border-amber-700 bg-amber-800">
        <Navbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      </header>

      <!-- Dynamic Content -->
      <main class="flex-1 overflow-y-auto">
        <slot name="content" />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/admin/Sidebar.vue'
import Navbar from '@/components/admin/Navbar.vue'
import { ref } from 'vue'

const isSidebarOpen = ref(false)
</script>
