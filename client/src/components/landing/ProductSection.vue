<template>
  <section class="lg:px-12 px-4 lg:py-4">
    <div class="w-full flex lg:flex-row flex-col lg:rounded-md p-2 justify-between items-center">
      <h1 class="font-medium lg:text-3xl md:text-2xl text-xl font-secondary tracking-wide mb-2">
        Finding the best coffee for you.
      </h1>

      <CategorySection @select-category-id="handleSelectCategory" />
    </div>

    <div class="py-4 grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
      <ProductSkeleton v-if="isLoading" v-for="i in 6" :key="i" />
      <ProductCard v-for="product in products" :key="product.id" :product="product" v-else />
    </div>
  </section>
</template>

<script setup>
import CategorySection from '@/components/landing/CategorySection.vue'
import ProductCard from '@/components/card/ProductCard.vue'
import ProductSkeleton from '@/components/skeleton/ProductSkeleton.vue'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const selectCategoryId = ref(null)
const handleSelectCategory = (id) => {
  return (selectCategoryId.value = id)
}

const isLoading = ref(false)
const productsStore = useProductStore()
const { products } = storeToRefs(productsStore)

const getProducts = async () => {
  isLoading.value = !isLoading.value
  try {
    await productsStore.getAllProducts()
  } catch (error) {
    return error.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getProducts()
})
</script>
