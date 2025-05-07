<template>
  <div class="lg:px-12 px-4 py-8">
    <div
      class="w-full flex lg:flex-row flex-col shadow rounded-md bg-amber-900 text-white p-2 justify-between items-center"
    >
      <h1 class="font-bold text-2xl">CATEGORIES</h1>
      <div class="lg:max-w-max w-full overflow-x-auto hide-scrollbar py-4">
        <div class="flex flex-row items-center gap-x-4 min-w-max">
          <button class="border rounded-md p-2 w-[100px] cursor-pointer">All</button>
          <button
            v-for="category in categories"
            :key="category.id"
            class="border rounded-md p-2 w-[150px] cursor-pointer"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const store = useCategoriesStore()
const isLoading = ref(false)
const { categories } = storeToRefs(store)

const handlerGetCategoryAll = async () => {
  try {
    isLoading.value = !isLoading.value
    await store.getAllCategories()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  handlerGetCategoryAll()
})
</script>
