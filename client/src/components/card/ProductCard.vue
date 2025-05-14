<template>
  <div>
    <RouterLink :to="`/product/${product.id}`">
      <div
        class="w-full shadow-md flex flex-col gap-2 cursor-pointer border-1 border-gray-400 rounded-md px-2 py-2 hover:scale-95 font-secondary hover:border-amber-900 transition-all duration-500 ease-in-out"
      >
        <div class="border-1 border-gray-300 rounded-md w-full h-36">
          <img :src="product.image_cover" :alt="product.name" class="w-full h-full object-cover" />
        </div>

        <div class="flex flex-col gap-1 mt-2">
          <h1 class="font-medium">{{ product.name }}</h1>
          <p class="font-medium">{{ formatToIdr(product.price) }}</p>
        </div>

        <div class="flex justify-between items-center gap-2">
          <span :class="classCategory" class="text-center py-2 text-sm font-bold">
            {{ product.Category.name }}
          </span>
          <p class="font-light text-sm" :class="product.stock <= 10 ? 'text-red-500' : ''">
            Stock: {{ product.stock }}
          </p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { formatToIdr } from '@/services/formatRp'
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
  },
})

const categoryColors = {
  coffee: 'text-amber-900 ',
  snacks: 'text-amber-400',
  foods: 'text-green-800',
}

const classCategory = computed(() => {
  const key = props.product.Category.name.toLowerCase() || ''
  return categoryColors[key] || 'text-blue-500'
})
</script>
