<template>
  <section class="lg:px-12 px-4 lg:py-4">
    <div class="w-full flex lg:flex-row flex-col lg:rounded-md p-2 justify-between items-center">
      <h1 class="font-medium lg:text-3xl md:text-2xl text-xl font-secondary tracking-wide mb-2">
        Finding the best coffee for you.
      </h1>

      <CategorySection @select-category-id="handleSelectCategory" />
    </div>

    <Search @handle-search="handleSearch" />

    <div v-if="products.length == 0 && !isLoading">
      <p class="text-center text-sm p-4">Sorry, products not available</p>
    </div>

    <div class="py-4 grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4" v-else>
      <ProductSkeleton v-if="isLoading" v-for="i in 6" :key="i" />
      <ProductCard v-for="product in filterdProducts" :key="product.id" :product="product" v-else />
    </div>
  </section>
</template>

<script setup>
import CategorySection from '@/components/landing/CategorySection.vue'
import ProductCard from '@/components/card/ProductCard.vue'
import ProductSkeleton from '@/components/skeleton/ProductSkeleton.vue'
import Search from './Search.vue'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
const productsStore = useProductStore()
const { products } = storeToRefs(productsStore)

const selectCategoryId = ref(null)
const keyword = ref('')
const handleSelectCategory = (id) => {
  return (selectCategoryId.value = id)
}

const handleSearch = (value) => {
  keyword.value = value
}

const filterdProducts = computed(() => {
  if (!keyword.value.trim()) {
    return products.value
  }

  return products.value.filter((product) => product.name.includes(keyword.value.toLowerCase()))
})

const isLoading = ref(false)

const getProducts = async () => {
  isLoading.value = true
  try {
    await productsStore.getAllProducts({ category: selectCategoryId.value })
  } catch (error) {
    return error.message
  } finally {
    isLoading.value = false
  }
}

watch(selectCategoryId, () => {
  getProducts()
})

onMounted(() => {
  getProducts()
})
</script>
