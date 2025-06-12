<template>
  <div class="py-4 px-4 text-white">
    <h1 class="font-primary text-2xl py-2">Incafe Dashboard</h1>

    <nav class="mt-4">
      <ul class="flex flex-col gap-y-2">
        <li v-for="(menu, index) in menus" :key="index">
          <RouterLink
            :to="menu.routes"
            class="flex items-center text-white p-4 rounded-md hover:bg-neutral hover:text-orioles-linen transition-colors duration-300 gap-x-4"
          >
            <font-awesome-icon :icon="menu.icon" size="xl" />
            {{ menu.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const menus = [
  {
    name: 'Dashboard',
    icon: 'fa-solid fa-globe',
    routes: '/dashboard',
  },
  {
    name: 'Users',
    icon: 'fa-solid fa-people-group',
    routes: '/dashboard/users',
  },
  {
    name: 'Roles',
    icon: 'fa-solid fa-arrows-spin',
    routes: '/dashboard/roles',
  },
  {
    name: 'Categories',
    icon: 'fa-solid fa-arrows-to-circle',
    routes: '/dashboard/categories',
  },
  {
    name: 'Products',
    icon: 'fa-solid fa-shop',
    routes: '/dashboard/product',
  },
  {
    name: 'Orders',
    icon: 'fa-solid fa-receipt',
    routes: '/dashboard/order',
  },
]
</script>
