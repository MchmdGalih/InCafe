<template>
  <input
    :class="`border rounded-sm p-2 ${props.classSearch}`"
    type="text"
    placeholder="Searching.."
    v-model="searchValue"
    @input="handleSearchQuery"
  />
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  classSearch: {
    type: String,
    default: 'w-full',
  },
})

const searchValue = ref('')

const emits = defineEmits(['handleSearch'])

const handleSearchQuery = () => {
  if (searchValue.value === '') return
  emits('handleSearch', searchValue.value)
}
</script>
