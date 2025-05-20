<template>
  <div>
    <input
      class="w-full border rounded-md p-2"
      type="text"
      placeholder="Searching.."
      v-model="searchValue"
      @input="handleSearchProduct"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchValue = ref('')

const emits = defineEmits(['handleSearch'])

const handleSearchProduct = () => {
  if (searchValue.value === '') return
  emits('handleSearch', searchValue.value)
  console.log('dari anak', searchValue)
}
</script>
