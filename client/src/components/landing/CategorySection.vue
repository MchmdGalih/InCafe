<template>
  <div class="lg:max-w-max w-full overflow-x-auto hide-scrollbar py-4 font-secondary">
    <div class="flex flex-row items-center gap-x-4 min-w-max">
      <button
        @click="selectCategory(null)"
        class="border-2 border-gray-400 hover:border-amber-900 transition-all duration-500 ease-in-out rounded-xl p-2 w-[100px] font-bold cursor-pointer"
      >
        All
      </button>
      <button
        @click="selectCategory(category.id)"
        v-for="category in categories"
        :key="category.id"
        class="border-2 border-gray-400 hover:border-amber-900 transition-all duration-500 ease-in-out rounded-xl p-2 w-[150px] font-bold cursor-pointer"
      >
        {{ category.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const categoryStore = useCategoriesStore()
const { categories } = storeToRefs(categoryStore)

const emits = defineEmits(['selectCategoryId'])

const selectCategory = (id) => {
  return emits('selectCategoryId', id)
}

onMounted(async () => {
  await categoryStore.getAllCategories()
})
</script>
