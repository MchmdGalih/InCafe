<template>
  <div class="flex flex-col gap-y-2">
    <section class="p-4 flex gap-2 justify-between items-center">
      <Search classSearch="w-[400px]" @handle-search="handleSearch" />
      <button type="button" id="btnAdd" class="btn btn-primary w-24">Add</button>
    </section>

    <section>
      <EasyDataTable :headers="headers" :items="categoriesData" table-class-name="customize-table">
        <template #item-name="{ name }">
          <span class="capitalize">{{ name }}</span>
        </template>
        <template #item-action="items">
          <div class="gap-x-2 inline-flex">
            <button type="button" class="btn btn-circle btn-warning btn-sm">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </button>
            <button type="button" class="btn btn-circle btn-error btn-sm">
              <font-awesome-icon icon="fa-solid fa-trash " />
            </button>
          </div> </template
      ></EasyDataTable>
    </section>
  </div>
</template>

<script setup>
import Search from '@/components/landing/Search.vue'
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const categoryStore = useCategoriesStore()
const { categories } = storeToRefs(categoryStore)

const keyword = ref('')

const handleSearch = (value) => {
  keyword.value = value
}

const headers = [
  {
    text: 'Name',
    value: 'name',
  },
  {
    text: 'ID',
    value: 'id',
  },
  {
    text: 'Action',
    value: 'action',
  },
]

const categoriesData = computed(() => {
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(keyword.value.toLowerCase()),
  )
})
</script>
